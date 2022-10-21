---
share: true
title: "Jekyll Blogging with Obsidian"
date: 2022-10-15 06:00:00 -0400
filename: "guide/_posts/2022-10-15-jekyll-with-obsidian"
tags: [obsidian]
# front_page_image: '/images/posts/black-boxes/cover.png'
excerpt: "Follow this step-by-step guide to setup Obsidian so you can post to Jekyll seamlessly."
render_with_liquid: false
---

I wrote about what would be [ideal blogging process]({% link obsidian/essay/_posts/2022-10-16-blogging-manifesto.md %}). I've always been dissatisfied with blogging due to how hard it is to post. When it is easy to post, then you generally lack freedom in some other fundamental area. I recommend reading that for context.

This post is about using [Obsidian](https://obsidian.md) to send file to Github. It should work with any blogging framework, but given I use [Jekyll](https://jekyllrb.com), that's what I'll use here.

### Ok, so how can I configure Jekyll and Obsidian together?

These are the instructions I'd need if I had to setup everything from scratch.

**Step 0:** have Jekyll in a repository. It's outside the scope of this text teaching how to use it. It's fairly simple if you know how to use it, but getting started can be tricky for non-developers. You can find tons of tutorials online, it's a very basic blogging framework.

If you don't use Jekyll, you can still publish to a directory in Github.

**Step 1:** write your notes in Obsidian.

The frontmatter of each file should look like the following. Frontmatter is really just a header for the file, and the `---` indicate where it begins and ends.

```yaml
---
share: true
title: "Jekyll Blogging with Obsidian"
date: 2022-10-15 06:00:00 -0400
filename: "guide/_posts/2022-10-15-jekyll-with-obsidian"
tags: [obsidian]
---

The actual article goes here.
```

where,

- `share`: when `true`, it will push to Github (it is configured below in the plugin's Settings screen)
- `filename`: this is the place where your file will be saved in Github.
- `title`, `date`, `tags`: these are standard Jekyll configurations and not critical here.

When you create a *wikilink* in Obsidian (an internal link), the publishing plugin will figure out the `filename` frontmatter value and replace links with those paths, translating to what Jekyll expects.

**Step 2:** install the [obsidian-github-publisher](https://github.com/ObsidianPublisher/obsidian-github-publisher) plugin. This is a community plugin, so you'll have to enable non-core plugins.

What it does is it sends files to a Github repository. For that to work, you need to configure a user, Github token, and the final file structure. These are described in the next step.

**Step 3:** time to configure the plugin. Go the plugin Settings (`Cmd+comma` on MacOS, then Community Plugins, then Github Publisher), you will find a list of properties to set.

The following are details about those properties.

| **Property** | **Comment** |
|---|---|
| **Repository** | The plugin's `README` has instructions on that. You'll need a Github username, repo and token. |
| **Folder Behavior** | I set as `Fixed`. [More details here](https://github.com/ObsidianPublisher/obsidian-github-publisher#folder-reception-settings). |
| **Default Folder** | I'm using `obsidian`. This puts all files published into the [obsidian/ directory](https://github.com/kurko/blog/tree/642bf6816c50b7b666726163a9a8b3aeba73d2e0/obsidian) in Github. |
| **Title Frontmatter** | I've set mine to `filename`. This determines where the file will be sent to. For example, this post's `filename: guide/_posts/2022-10-15-jekyll-with-obsidian` at the top, so the plugin will use it to figure out that it should move it to `obsidian/guide/_posts/2022-10-15-jekyll-with-obsidian.md` |
| **Links** | I turn on both `Internal Links` and `Wikilinks`. I want them to be processed. |
| **Embed** | `Transfer Attachment` should be on. For images, I set the Default Attachment Folder, I set `images/obsidian` (my Jekyll config expects `images/`). |
| **Auto Clean** | I think it makes sense to turn on `Auto Clean`. |

**Step 3b:** the *Text Replacer* field is a bit more complicated. In short, it allows you to set some `regex` rules to rewrite some of the text during publishing.

Why would we want to rewrite the text? First, links need to match what Jekyll expects, so I set it to transform a *wikilink* like this

<pre>
&#91;&#91;my-page&#124;My Pages&#93;&#93;
</pre>

to become the following in markdown,

<pre>
[My Page]&#40;my-page&#41;
</pre>

However, Jekyll expects 

<pre>
[My Page]&#40;&#123;% link my-page.md %&#125;&#41;
</pre>

Second, it appends `obsidian` to links, which the plugin wasn't doing automatically (bug?).

In the *Text Replacer* section, each line has two fields. Let's call the first `entry` and the second `replacer`. Here's my configuration entries:

**Rule 1, transform links ./**: set entry to <span class="code">&#40;&#63;&#60;&#33;&#92;&#92;&#96;&#41;&#92;&#92;&#91;&#40;&#46;&#42;&#63;&#41;&#92;&#92;&#93;&#92;&#92;&#40;&#40;&#63;&#33;&#40;&#104;&#116;&#116;&#112;&#124;&#92;&#92;&#47;&#42;&#105;&#109;&#97;&#103;&#101;&#124;&#111;&#98;&#115;&#105;&#100;&#105;&#97;&#110;&#92;&#92;&#47;&#105;&#109;&#97;&#103;&#101;&#41;&#41;&#40;&#92;&#92;&#46;&#92;&#92;&#47;&#41;&#42;&#40;&#46;&#43;&#63;&#41;&#40;&#92;&#92;&#46;&#109;&#100;&#41;&#42;&#92;&#92;&#41;</span> and *replacer* to <span class="code">&#91;&#36;&#49;&#93;&#40;&#123;&#37;&#32;&#108;&#105;&#110;&#107;&#32;&#111;&#98;&#115;&#105;&#100;&#105;&#97;&#110;&#47;&#36;&#52;&#46;&#109;&#100;&#32;&#37;&#125;&#41;</span>.

Why: this makes so wikilinks include the link function that Jekyll expects. If you are a little more technical and wants more details, [here's a commit I did with a nice `ascii` explanation](https://github.com/ObsidianPublisher/obsidian-github-publisher/pull/36/files#diff-c49cb89b66bc4961c47c867b709bcb7956c00bff469ff5ad622be0a0e73c5dd2R94-R123).

**Rule 2, adjusts image paths**: set entry to <span class="code">&#40;&#63;&#60;&#33;&#92;&#92;&#96;&#41;&#92;&#92;&#91;&#40;&#46;&#42;&#63;&#41;&#92;&#92;&#93;&#92;&#92;&#40;&#40;&#40;&#111;&#98;&#115;&#105;&#100;&#105;&#97;&#110;&#92;&#92;&#47;&#41;&#63;&#105;&#109;&#97;&#103;&#101;&#41;&#40;&#46;&#43;&#41;&#92;&#92;&#41;</span> and *replacer* to <span class="code">&#91;&#36;&#49;&#93;&#40;&#47;&#105;&#109;&#97;&#103;&#101;&#36;&#52;&#41;</span>. 

Why: image paths in Jekyll start at `/images`, but the plugin is converting it to `/obsidian/images`. This rule set removes `/obsidian` in those cases.

Finally, if you need to debug the conversion, search for the `findAndReplaceText()` function in Chrome's dev console and add breakpoints to it.

**Step 4:** set a nice keyboard shortcut for publishing. I configured `Cmd+Shift+Option+D` for publishing only the open file, and `Cmd+Shift+D` for everything.


### Is there `data.json` file I can copy?

Sure. Below is a copy of mine. If you want, paste into the plugin's data file which lives in `.obsidian/obsidian-mkdocs-publisher/data.json` (in your Obsidian Vault directory). You have to replace the github keys and `GhToken` (as of version [4.4.0](https://github.com/ObsidianPublisher/obsidian-github-publisher/commit/c8d75bd16d29a37b07b4761b5f624be90a92f596)).

<pre>
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
      "entry": "&#40;&#63;&#60;&#33;&#92;&#92;&#96;&#41;&#92;&#92;&#91;&#40;&#46;&#42;&#63;&#41;&#92;&#92;&#93;&#92;&#92;&#40;&#40;&#63;&#33;&#40;&#104;&#116;&#116;&#112;&#124;&#92;&#92;&#47;&#42;&#105;&#109;&#97;&#103;&#101;&#124;&#111;&#98;&#115;&#105;&#100;&#105;&#97;&#110;&#92;&#92;&#47;&#105;&#109;&#97;&#103;&#101;&#41;&#41;&#40;&#92;&#92;&#46;&#92;&#92;&#47;&#41;&#42;&#40;&#46;&#43;&#63;&#41;&#40;&#92;&#92;&#46;&#109;&#100;&#41;&#42;&#92;&#92;&#41;",
      "replace": "&#91;&#36;&#49;&#93;&#40;&#123;&#37;&#32;&#108;&#105;&#110;&#107;&#32;&#111;&#98;&#115;&#105;&#100;&#105;&#97;&#110;&#47;&#36;&#52;&#46;&#109;&#100;&#32;&#37;&#125;&#41;"
    },
    {
      "entry": "&#40;&#63;&#60;&#33;&#92;&#92;&#96;&#41;&#92;&#92;&#91;&#40;&#46;&#42;&#63;&#41;&#92;&#92;&#93;&#92;&#92;&#40;&#40;&#40;&#111;&#98;&#115;&#105;&#100;&#105;&#97;&#110;&#92;&#92;&#47;&#41;&#63;&#105;&#109;&#97;&#103;&#101;&#41;&#40;&#46;&#43;&#41;&#92;&#92;&#41;",
      "replace": "&#91;&#36;&#49;&#93;&#40;&#47;&#105;&#109;&#97;&#103;&#101;&#36;&#52;&#41;"
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
</pre>