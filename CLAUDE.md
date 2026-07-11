alexoliveira.cc

## Rules

- The content is meant to stay human-authored. You are allowed to contribute
  edits by fixing typos, formatting issues, fixing and adding references, fixing
  images and code snippets, and bootstrapping new article skeletons. You are not
  allowed to write/edit new content that is not already present in the article.
  If you want to write new content, propose to the user. You are encouraged to
  propose prose improvements, in the style of _Word Painting by Rebecca McClanahan_.
  Ultimately, Alex want to be able to say that he wrote the content, and that it
  is human-authored.
- Large images should not be committed without sanitizing them first.
- The website should feel polished, minimal, intentional, pleasant to the eyes.
  The reader should feel the website author has good taste.

### Architecture

- Some articles have a pt-br version. Check their frontmatter (`translations.pt-br`)

### Developing

- `bin/setup`
- `bin/serve`, then localhost:4000.
- Don't commit images without running `bin/sanitize-images` first. This will
  ensure that all images are resized and optimized, and free of sensitive
  information.