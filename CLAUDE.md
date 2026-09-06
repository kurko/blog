alexoliveira.cc

## Rules

- The content is meant to stay human-authored. You are allowed to contribute
  edits by fixing typos, formatting issues, fixing and adding references, fixing
  images and code snippets, and bootstrapping new article skeletons. You are not
  allowed to write/edit new content that is not already present in the article.
  If you want to write new content, propose to the user. You are encouraged to
  propose prose improvements, in the style of _Word Painting by Rebecca McClanahan_.
  Ultimately, Alex wants to be able to say that he wrote the content, and that it
  is human-authored.
- Never commit images without running `bin/sanitize-images` first. See
  "Images" below.
- The website should feel polished, minimal, intentional, pleasant to the eyes.
  The reader should feel the website author has good taste.

### Architecture

- Some articles have a pt-br version. Check their frontmatter (`translations.pt-br`)

### Developing

- `bin/setup`
- `bin/serve`, then localhost:4000.

### Images

Before committing any new or changed image, run:

```
bin/sanitize-images
```

The script walks `images/posts` and `images/pages` and downsizes anything wider
than the limit for its type. It picks the limit from the filename:

- `mobile` in the name: 1400px
- `cover`, `hero`, `large`, `big`, or `wide` in the name: 2880px
- everything else: 2000px

Originals are backed up to `tmp/<date>/` (gitignored). Use `--dry-run` to see
what would change without touching files. Requires ImageMagick and the
`mini_magick` gem (installed by `bin/setup`).

Checklist when adding images:

1. Drop the files into `images/posts/<slug>/` or `images/pages/`.
2. Run `bin/sanitize-images` and check the summary.
3. `git status` should show only the resized images, never anything under
   `tmp/`.
4. Commit.
