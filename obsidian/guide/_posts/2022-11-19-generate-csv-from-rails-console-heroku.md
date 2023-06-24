---
share: true
title: "Generate CSV from Rails console (Heroku)"
date: 2022-11-19 06:00:00 -0400
filename: "guide/_posts/2022-11-19-generate-csv-from-rails-console-heroku"
tags: [software]
excerpt: "Extract data out of Rails console into a CSV."
render_with_liquid: true
---

Config the following file and save it with some name `file.rb`:

```ruby
report = CSV.generate do |csv|
  csv << ["name", "email"]

  users = User.where(
    :created_at => Date.parse("01-11-2020")..Date.parse("30-11-2020")
  )

  users.each do |user|
    csv << [user.name, user.email]
  end
end
```

### Method One: Pipe Into a File

Add the following at the end of the code:

```ruby
STDOUT.puts report
```

Then run the following in the terminal:

```bash
cat file.rb \
  | heroku run --no-tty --app=heroku-app-name -- bin/rails runner - \
  | grep -v "\*\* \[NewRelic\]" -v "DISABLE_DATADOG_AGENT" \
  > results.csv
```

where:

- `cat file.rb`: reads the code for piping into Heroku or some other Rails console process
- `heroku run ...`: the console itself. It could be another console (e.g AWS, GCP or local). `--no-tty` is used for preventing characters used for user interaction. Replace `--app` with the name of the app.
- `grep ... NewRelic`: this removes those annoying booting lines from 3rd-party libs in Rails.
- `> results.csv`: write the results from the Rails console into a CSV file.

### Method Two: With Slack

If you have an array like in the original, you can 

```
Slack::Web::Client.new.
  files_upload(
    channels: '#some-channel',
    content: report,
    filename: "file.csv"
  )
```