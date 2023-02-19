---
share: true
title: "Remove Distractions From Websites"
date: 2023-02-19 06:00:00 -0400
filename: "guide/_posts/2023-02-19-remove-distractions-from-websites"
tags: [productivity-hack]
excerpt: "Apply arbitrary CSS to remove websites sections."
---

Some friends use Instagram as primary chat app. Whenever I open it, I'm sucked into a swirl of content. Some times it pulls me for several, several minutes until my mind steps back and realizes what's going on.

The solution I found was using Instagram on my Mac and inserting arbitrary CSS into its page to strip out everything that is not chat. This is what Instagram looks like to me now:

![Screenshot blur.png](/images/obsidian/Screenshot%20blur.png)

I use Safari and there's a cheap app called Cascadea that enables you to insert CSS into webpages. There are way more options if you're using Chrome or Firefox.

This is the first CSS version I used to get it working:

```css
div.xh8yej3.x1iyjqo2,
div.x1cy8zhl.x9f619.x78zum5.xdt5ytf.x1gvbg2u.x1y1aw1k.xn6708d.xx6bls6.x1ye3gou.xvbhtw8.x1xgvd2v.x1o5hw5a.xaeubzz,
a[href='/explore/'],
a[href='/reels/videos/']
{ 
	display: none; 
}
```

Instagram HTML has a lot of gibberish CSS classes. I suspect they're going to keep changing over time to break this type of script. Anyway, I added a rule to check for `href` and that seems to be enough.