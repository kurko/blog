---
share: true
title: "Blogging Manifesto"
date: 2022-10-15 06:00:01 -0400
filename: "essay/_posts/2022-10-16-blogging-manifesto"
tags: [obsidian, writing]
# front_page_image: '/images/posts/black-boxes/cover.png'
excerpt: "I've always been dissatisfied with blogging. Now I have an objective measure of what makes it pleasing."
---

I've always been dissatisfied with blogging. The technologies bother the *engineer-slash-idealist* in me. I attribute the tedious publishing process as reason for not posting more often - although laziness is not out of question. In 2021, however, [Obsidian.md](https://obsidian.md) came into my life and changed my perspective on personal notes, subsequently blogs.

### The Ideal Blog

To set the scenario, here are my idealistic goals for a blog.

- **it is just files:** it has to be simple. I don't want to manage databases, adapters, migrations, seed files. Just good ol' files.
- **I have full control:** I want to control the design, the file structure, the domain, everything. With a just-files policy, I can move my site anywhere at any time. I learned a hard lesson with Evernote in the old days: migrating notes isn't fun.
- **I write offline:** writing should depend on internet. I want to go camping, be flying over the ocean, be in another country backpacking, and I want my ideas to come to life unencumbered.
- **writing is pleasing:** what's the point of writing offline but using Notepad? Some solutions feel good, but either require specific backends or internet. [iA Writer](https://ia.net/writer) feels amazing, but publishes to Wordpress, and I want none of that. [Substack](https://substack.com) is ok but requires you to have the browser open and connected.
- **easy to publish:** I should write somewhere offline, on a computer or on my phone, click a button and it goes online later.
- **quick iteration:** I want to publish a not-totally-finished essay and improve over time. If publishing is one click, excellent. Copying/pasting is definitely no-go (looking at you, iA Writer).
- **it is (mostly) free:** the idea of paying too much for hosting a few static files is obnoxious.
- **it is my 2nd-brain:** I can take my tiny little notes, guides, and share with the world, not only essays.

I've gone through various technological iterations through the years, hitting a checkbox in one ideal but compromising another. Generally, solutions either (a) require too much technical knowledge to setup and maintain, like Jekyll requiring us to `git checkout` a directory in a terminal just to write posts, or (b) preclude content ownership, like in Wordpress - how are moving away from it if we change our minds in the future? 

I've experimented through that pendulum more than I'd like to admit. From admin panels with Rails (full control, requires software engineering knowledge), Wordpress/Ghost/Substack (quick publishing, good for laypeople but makes changes difficult), to static pages on Netlify with Ember.js (for offline support), and lately [Jekyll](https://jekyllrb.com) (plain files). But the whole list of ideals was never satisfied. Jekyll is supported by Github for free, but having to open a terminal to `git-commit` my markdown files is far from being a pleasure.

It sounds like splitting hair because, after all, it's just... blogging, and the whole world has done it. However, concurrent to this *analysis-paralysis* in one area, on another I was actually thriving: I was writing a lot in Obsidian on my personal computer, it just happens to stay private. The more fundamental Obsidian became in my process, the more I realized that maybe, *just maybe*, if I could somehow combine blogging and Obsidian, publishing my notes into [Jekyll](https://jekyllrb.com) hosted on [Github](https://github.com/kurko/blog), then maybe I might had solved all - or most of - those problems that bothered in the past.

### Wait, but why Obsidian for note taking?

The concept of *wikilinks* [are as old as 1995](https://wiki.c2.com/?WikiHistory), but creating them had always been cumbersome. I think [Roam Research was the first to introduce a simple User Experience](https://medium.com/age-of-awareness/the-history-of-roam-research-and-the-roamcult-4c1e1897633d) for autocompleting *wikilinks* - in 2017. They enable you to create links between large and small notes in a very simple manner. Every time you type <span class="code">&#91;&#91;some note name&#93;&#93;</span>, it suggests other notes automatically, or creates new ones on demand. You end up with tons of notes connected.

![obsidian-screenshot-for-blogging-manifesto.png](/images/obsidian/obsidian-screenshot-for-blogging-manifesto.png)

Obsidian improved on Roam by making it pure markdown files on your computer. It means you can synchronize them across devices with whatever you want, from iCloud and Dropbox to [rsync](https://en.wikipedia.org/wiki/Rsync) and `git`. You can also create your own code and iterate through your text. It's open for extension, so you can use [one of its hundreds of plugins](https://obsidian.md/plugins).

If you like to take notes about books, for example, the generated visualizations are awe inspiring. To get a sense of how fun it is to have these notes connected, check the following two images. The first one shows a graph with all my notes and their connections (which doesn't mean anything to you, but check the next one):

![Graph of all notes in my Obsidian and their connections](/images/obsidian/obsidian-graph-zoomed-out.png)

The usefulness of it is quickly zooming in and learning how multiple concepts connect together, remembering things I've written but had forgotten. It's super fun and opens up a whole new mental level.

![Highlighting notes for a book, helping spaced-repetition in a fun way](/images/obsidian/obsidian-graph-screenshot-black-swan.png)

Obsidian deserves a post of its own.

***

When I started writing into Obsidian all my tiny little ideas in tiny little paragraphs, I had a sense that _that_ should be my personal site (this text started as a note for organizing my own thoughts, and here it is now, public). However, my personal website was none of that. It's hard to post anything so I will definitely avoid posting a couple paragraphs. The character-to-energy ratio is too low.

But I think I found a sensible way of keeping the simplicity of Jekyll with the offline support I've been looking for, by leveraging Obsidian's plugin support. I now can click a button and post this note to Github in 3 seconds. Here's how the ideal list stands:

- **✅ it is just files:** it's markdown, Obsidian and Jekyll. It's a directory in my computer.
- **✅ I have full control:** the [site is on Github Pages](https://github.com/kurko/blog#readme) and I control the design. It's not Wordpress. Any sign of problem and I move somewhere, even a [Raspberry Pi](https://www.raspberrypi.com) would do.
- **✅ I write offline:** yes, and works on my mobile phone.
- **✅ writing is pleasing:** I created a theme in Obsidian that mimics iA Writer's. It's a joy to write (although I miss Writer's adjective checks).
- **✅ easy to publish:** with the [obsidian-github-publisher](https://github.com/ObsidianPublisher/obsidian-github-publisher), it is.
- **✅ quick iteration:** it's a matter of pressing `Cmd+Shift+D` for deploying.
- **✅ it is (mostly) free:** Github Pages is free.
- **🧪 it is my 2nd-brain:** this is still in a discovery phase, but given I can publish any of my personal notes, I'll say yes for this. I will have to improve my website layout for it to truly encompass all my notes.

The experimentation never ends, and I'll definitely be improving the process as I go.

***

If you're interested in setting up this combination with Jekyll and Obsidian, I've written a [super technical guide on how to setup Obsidian for publishing on Github and Jekyll]({% link obsidian/guide/_posts/2022-10-15-jekyll-with-obsidian.md %}).