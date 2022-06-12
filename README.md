# Alex Oliveira

## Development

1. `bundle install`
2. `jekyll serve`

## Organization

### Posts

To create a new post, you can create a new markdown file inside the `_posts`
directory by following the
[recommended file structure](https://jekyllrb.com/docs/posts/#creating-post-files).

The following is a post file with different configurations you can add as an
example:

```sh
---
layout: post
title: Title of the Post
featured: true
tags: [tag-one, tag-two]
image: '/images/welcome.jpg'
---
```

To keep things more organized, add post images to **/images/posts** directory,
and add page images to **/images/pages** directory.

To create a draft post, create the post file under the `_drafts` directory.

For tags, try to not add space between two words, for example, `Ruby on
Rails`, could be something like (`ruby-on-rails`, `Ruby_on_Rails`, or
`Ruby-on-Rails`).

### Pages

To create a new page, just create a new markdown file inside the `_pages` directory.

The following is the `about.md` file that you can find as an example included in the theme with the configurations you can set.

```sh
---
layout: page
title: About
image: '/images/pages/about.jpeg'
---
```

Things you can change are: `title` and `image` path.


### Navigation

The navigation on the sidebar will automatically include all the links to the pages you have created.

### Icons Links

Social media links included in `_includes/footer.html` are using
[Evil Icons](http://evil-icons.io/), which contains very simple and clean icons.

### Known Problems

Note that tags are not working with GitHub Pages, that's because the used
[jekyll-tagging ](https://github.com/pattex/jekyll-tagging) plugin is not
[whitelisted](https://pages.github.com/versions/) by GitHub.  To make this work,
use [Netlify.com](https://www.netlify.com/) for deployment.
