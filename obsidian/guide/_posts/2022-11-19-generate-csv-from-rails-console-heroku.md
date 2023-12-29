---
share: true
title: Generate CSV from Rails console (Heroku)
date: 2022-11-19 06:00:00 -0400
filename: guide/_posts/2022-11-19-generate-csv-from-rails-console-heroku
tags:
  - software
excerpt: Extract data out of Rails console into a CSV.
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
ruby
STDOUT.puts report
bash
cat file.rb \
  | heroku run --no-tty --app=heroku-app-name -- bin/rails runner - \
  | grep -v "\*\* \[NewRelic\]" -v "DISABLE_DATADOG_AGENT" \
  > results.csv

Slack::Web::Client.new.
  files_upload(
    channels: '#some-channel',
    content: report,
    filename: "file.csv"
  )
```