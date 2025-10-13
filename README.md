# Alex Oliveira

## Quick recap

- _layouts/default.html is the main layout file.
- index.html is the initial content file.

## Development

1. `bundle install`
2. `jekyll serve`

For testing Obsidian's obsidian-github-publisher's regex,
run `bin/test-obsidian-regex`. See `obsidian_regex_publisher.test.js` for more
details.

## Organization

### Posts

To create a new post, create a new markdown file inside the `_posts` directory by following the [recommended file structure](https://jekyllrb.com/docs/posts/#creating-post-files).

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

To keep things more organized, add post images to **/images/posts** directory, and add page images to **/images/pages** directory.

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

### Image guidelines

**Dimensions**

Consider 2px for retina:

- Full-bleed hero: 2560–2880 px wide; 400-900kb, ideally <700Kb).
    - For mobile: 800-1000px
- In-article (single column ~700–800px): 1400–1600px wide, 12p-300Kb.
- Card/grid items (half width): 1000–1200px wide. 80-200Kb.
- Thumbnails: 400–600px wide, 30-80kb.
- Lightbox/zoom version (optional): 3000–4000px wide.
- Photo-essay page budget: try to stay under 2-3Mb the first screen, lazy-loading the rest.

Use AVIF when possible, then WebP, then JPEG fallback.

**Useful CSS classes**

- crop-vertical-1-5: automatically crops the image into 1/5 (wider than taller).

### Known Problems

Note that tags are not working with GitHub Pages, that's because the used
[jekyll-tagging ](https://github.com/pattex/jekyll-tagging) plugin is not
[whitelisted](https://pages.github.com/versions/) by GitHub. To make this work,
use [Netlify.com](https://www.netlify.com/) for deployment.