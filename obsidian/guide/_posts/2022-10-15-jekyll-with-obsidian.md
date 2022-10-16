---
share: true
title: "Jekyll Blogging with Obsidian"
date: 2022-10-15 06:00:00 -0400
filename: "guide/_posts/2022-10-15-jekyll-with-obsidian"
tags: [obsidian]
# front_page_image: '/images/posts/black-boxes/cover.png'
excerpt: "Guide on how to use Jekyll with Obsidian."
render_with_liquid: false
---

I've always been dissatisfied with blogging. The technologies bother the *engineer-slash-idealist* in me. I attribute the tedious publishing process as reason for not posting more often - although laziness is not out of question. In 2021, however, [Obsidian.md](https://obsidian.md) came into my life and it changed things. I use it for personal and work notes (2nd-Brain) on MacOS, iPad and iOS, and realized that maybe, *just maybe*, if I could easily publish from it to [Jekyll](https://jekyllrb.com), I might have solved all those problems that held me back.

To set the foundation, here's my idealistic goals for a blog:

- **it is just files:** it has to be simple. I don't want to manage databases, adapters, migrations, seed files. Just good ol' files.
- **I have full control:** I want to control the design, the file structure, the domain, everything. With a just-files policy, I can move my site anywhere at any time. I learned a hard lesson with Evernote in the old days: migrating notes isn't fun.
- **I write offline:** writing should depend on internet. I want to go camping, be flying over the ocean, be in another country backpacking, and I want my ideas to come to life unencumbered.
- **writing is pleasing:** what's the point of writing offline but using Notepad? Some solutions feel good, but either require specific backends or internet. [iA Writer](https://ia.net/writer) feels amazing, but publishes to Wordpress, and I want none of that. [Substack](https://substack.com) is ok but requires you to have the browser open and connected.
- **easy to publish:** I should write somewhere offline, on a computer or on my phone, click a button and it goes online later.
- **quick iteration:** I want to publish a not-totally-finished essay and improve over time. If publishing is one click, excellent. Copying/pasting is definitely no-go (looking at you, iA Writer).
- **it is (mostly) free:** the idea of paying too much for hosting a few static files is obnoxious.
- **it is my 2nd-brain:** I can take my tiny little notes, guides, and share with the world, not only essays.

I've gone through various technological iterations through the years, hitting a checkbox in one ideal but compromising in another. I've gone from admin panels with Rails (full control), Wordpress (quick publishing), to static pages on Netlify with Ember.js (for offline support), and lately [Jekyll](https://jekyllrb.com) (plain files). But the whole list of ideals was never hit. Jekyll is supported by Github for free, but having to open a terminal to `git-commit` my markdown files is far from being a pleasure.

When I start writing into Obsidian all my tiny little ideas in tiny little paragraphs, I had a sense that _that_ should be my personal site (this text started as a note for organizing my own thoughts, and here it is now, public). However, my personal website is none of that. It's hard to post anything so I will definitely avoid posting a couple paragraphs. The character-to-energy ratio is too low.

But I think I found a sensible way of keeping the simplicity of Jekyll with the offline support I've been looking for, by leveraging Obsidian's plugin support. I now can click a button and post this note to Github in 3 seconds, which posts automatically. Here's how the ideal list stands:

- **✅ it is just files:** it's markdown, Obsidian and Jekyll. It's a directory in my computer.
- **✅ I have full control:** the [site is on Github Pages](https://github.com/kurko/blog#readme) and I control the design. It's not Wordpress. Any sign of problem and I move somewhere, even a [Raspberry Pi](https://www.raspberrypi.com) would do.
- **✅ I write offline:** yes, and works on my mobile phone.
- **✅ writing is pleasing:** I created a theme in Obsidian that mimics iA Writer's. It's a joy to write (although I miss Writer's adjective checks).
- **✅ easy to publish:** with the [obsidian-github-publisher](https://github.com/ObsidianPublisher/obsidian-github-publisher), it is.
- **✅ quick iteration:** it's a matter of pressing `Cmd+Shift+D` for deploying.
- **✅ it is (mostly) free:** Github Pages is free.
- **✅ it is my 2nd-brain:** this is still in a discovery phase, but given I can publish any of my personal notes, I'll say yes for this. I will have to improve my website layout for it to truly encompass all my notes.

If you're intested, from here it gets more technical.

### How can I configure Jekyll and Obsidian together?

This is mostly instructions for myself.

**Step 0:** have Jekyll in a repository. It's outside the scope of this text teaching how to use it. It's fairly simple if you know how to use it, but getting started can be tricky for non-developers.

**Step 1:** write your notes in Obsidian. The frontmatter of each file should look like the following:

```yaml
---
share: true
title: "Jekyll Blogging with Obsidian.md"
date: 2022-10-15 06:00:00 -0400
filename: "guide/_posts/2022-10-15-jekyll-with-obsidian"
tags: [obsidian]
---
```

where,

- `share`: when `true`, it will push to Github (it is configured below in the plugin's Settings screen)
- `filename`: this is the place where your file will be saved in Github.
- `title`, `date`, `tags`: these are standard Jekyll configurations and not critical here.

When you create a *wikilink* in Obsidian (an internal link), the publishing plugin will figure out the `filename` frontmatter value and replace links with those paths, translating to what Jekyll expects.

**Step 2:** install the [obsidian-github-publisher](https://github.com/ObsidianPublisher/obsidian-github-publisher) plugin. This is a community plugin, so you'll have to enable non-core plugins.

**Step 3:** time to configure the plugin. The following are details about its Settings screen (`Cmd+comma` on MacOS, then Community Plugins).

- The *repository* details are self-explanatory. The plugin's `README` has instructions on that. You'll need a Github token.
- *Folder Behavior*: I set as `Fixed`. [More details here](https://github.com/ObsidianPublisher/obsidian-github-publisher#folder-reception-settings).
- *Default Folder*: I'm using `obsidian`. This puts all files published into the [obsidian/ directory](https://github.com/kurko/blog/tree/642bf6816c50b7b666726163a9a8b3aeba73d2e0/obsidian) in Github.
- *Title Frontmatter*: I've set mine to `filename`. This determines where the file will be sent to. For example, this post's `filename: guide/_posts/2022-10-15-jekyll-with-obsidian` at the top, so the plugin will use it to figure out that it should move it to `obsidian/guide/_posts/2022-10-15-jekyll-with-obsidian.md`
- *Links*: I turn on both `Internal Links` and `Wikilinks`. I want them to be processed.
- *Embed*: `Transfer Attachment` should be on. For images, I set the Default Attachment Folder, I set `images/obsidian` (my Jekyll config expects `images/`).
- I think it makes sense to turn on `Auto Clean`.

**Step 3b:** the *Text Replacer* field is a bit more complicated. In short, it allows you to set some `regex` rules to rewrite some of the text during publishing.

First, I want links to match what Jekyll expects, so I set it to transform them. 

A *wikilink*, like this

<pre>
&#91;&#91;my-page&#124;My Pages&#93;&#93;
</pre>

becomes the following in markdown,

<pre>
[My Page]&#40;my-page&#41;
</pre>

However, Jekyll expects 

<pre>
[My Page]&#40;&#123;% link my-page.md %&#125;&#41;
</pre>

Second, it appends `obsidian` to links, which the plugin wasn't doing automatically (bug?).

In the *Text Replacer* section, each line has two fields. Let's call the first `entry` and the second `replacer`. Here's my configuration entries:

**Entry 1, Remove ./**: set entry to `\]\(\.\/` and *replacer* to <span class="code">]&#40;&#123;% link obsidian/</span>.

Why: Some links start with `./`, and we want to remove that. The `regex` rule states that whenever we have a link like,

<span class="code">
[a]&#40;./b&#41;
</span>

it matches <span class="code">]&#40;./</span> and replaces that with the `link` function and appends the path with `obsidian`, removing `./`.

**Entry 2, add link function**: set entry to `\]\((?!(\{|http))` and *replacer* to <span class="code">]&#40;&#123;% link obsidian/$1</span>. Why: whenever we have a link like 

[a]&#40;b&#41;

it makes sure `b` has the <span class="code">&#123;% link b %&#125;</span> format expected by Jekyll.

**Entry 3, add .md extension:** set entry to <span class="code">\(&#123;% link(.*?!(\.md))\)` and *replacer* to, <span class="code">&#40;&#123;% link $1.md %&#125;&#41;</span>. Why: makes sure the links reference a markdown file (note the `$1.md` extension) expected by Jekyll.

If you need to debug the conversion, search for `censorText()` function and add breakpoints to it in Chrome's dev console.

**Step 4:** set a nice keyboard shortcut for publishing. I configured `Cmd+Shift+Option+D` for publishing only the open file, and `Cmd+Shift+D` for everything.


### Is there `data.json` file I can copy?

Sure. Below is a copy of mine. If you want, paste into the plugin's data file which lives in `.obsidian/obsidian-mkdocs-publisher/data.json` (in your Obsidian Vault directory). You have to replace the github keys and `GhToken` (as of version [4.4.0](https://github.com/ObsidianPublisher/obsidian-github-publisher/commit/c8d75bd16d29a37b07b4761b5f624be90a92f596)).

```json
{
  "githubRepo": "blog",
  "githubName": "kurko",
  "GhToken": "ghp_[REDACTED]",
  "githubBranch": "main",
  "shareKey": "share",
  "ExcludedFolder": "",
  "fileMenu": true,
  "editorMenu": true,
  "downloadedFolder": "fixed",
  "folderDefaultName": "obsidian",
  "yamlFolderKey": "",
  "rootFolder": "",
  "workflowName": "",
  "embedImage": true,
  "defaultImageFolder": "images/obsidian",
  "autoCleanUp": true,
  "autoCleanUpExcluded": "",
  "folderNote": false,
  "convertWikiLinks": true,
  "convertForGithub": true,
  "subFolder": "",
  "embedNotes": false,
  "copyLink": false,
  "mainLink": "",
  "linkRemover": "",
  "hardBreak": false,
  "logNotice": false,
  "convertDataview": true,
  "useFrontmatterTitle": true,
  "censorText": [
    {
      "entry": "\\]\\(\\.\\/",
      "replace": "]({% link obsidian/&#123;% link obsidian/"
    },
    {
      "entry": "\\]\\((?!(\\{|http))",
      "replace": "]({% link obsidian/&#123;% link obsidian/$1"
    },
    {
      "entry": "\\(&#123;% link(.*?!(\\.md))\\)",
      "replace": "(&#123;% link $1.md %})"
    }
  ],
  "inlineTags": false,
  "dataviewFields": [],
  "excludeDataviewValue": [],
  "metadataFileFields": [
    "obsidian"
  ],
  "frontmatterTitleKey": "filename",
  "shareExternalModified": false
}
```

