---
share: true
layout: post
title: "Physics of Software"
date: 2014-08-19 15:02:54 -0200
tags: [software]
draft: false
# front_page_image: '/images/posts/black-boxes/cover.png'
excerpt: "A look at physics and the Constructal Law as inspiration on how to control complexity in software systems."

---

<div class="c-post__update">
<strong>Update (2015):</strong> A year after publishing this article, Adrian Bejan, who discovered the Constructal Law, invited me to speak at the Constructal Law & Second Law Conference at the University of Parma, Italy. No one had connected it with software yet. Presenting was... interesting. Presentations were the academic precision of a jet engine, whereas I came prepared with memes, like a proper tech talk. It was an honor to present how his physics principle applies to software architecture to an interdisciplinary audience. Scary, but cool.
</div>

> Look! Look! Look deep into nature and you will understand everything.<br/>
> —Albert Einstein

Some time in 2013, I picked up a book that connected several dots in my understanding about reality. I had always wondered why rivers resembled city layouts, or why lungs and snowflakes had similar formats, or trees and lightnings look so alike. I had no idea that _[Design in Nature: How the Constructal Law Governs Evolution in Biology, Physics, Technology, and Social Organization](https://www.amazon.com/Design-Nature-Constructal-Technology-Organization/dp/0385534612)_ would help me reason and design better software.

<img src="../images/posts/software-complexity-constructal-law/constructal-law-what-is-it.jpg" alt="ramifications in leaves of different sizes and types" class="crop-vertical-1-5">

I does feel off reading _nature_ and _design_ in the same sentence without a hint of religion or mythology. After all, everything resulted from random, stochastic processes. Rivers, mountains and vulcanoes had to compete for space, expanding, contracting, flowing, pressuring and many other verbs throughout millennia. How come design played any role?

Well, what [Adrian Bejan](https://en.wikipedia.org/wiki/Adrian_Bejan) figured out is that the processes are as random as we think. The fundamental law underneath the battle of the elements connects disparate manifestations and discovers what drives their shapes,

> For a finite-size system to persist in time (to live), it must evolve in such a way that it provides easier access to the imposed (global) currents that flow through it.

<!-- https://images.wur.nl/digital/collection/coll13/id/891/rec/10 -->

## Constructal law

Putting 2 and 2 together, whenever something needs to flow from point A to point B, the tree-shape arises.

<img src="../images/posts/software-complexity-constructal-law/complexity-in-the-wild.jpg" alt="Constructal Law shape" class="">

The designs that happen spontaneously in nature reflect this tendency: they allow entities or things to flow more easily – to measurably move more current farther and faster per unit of useful energy consumed. Even streets and roads, despite being artificial constructs, tend share this pattern for maximum mobility.

## Order and disorder

> Software designers win by separating things that can be considered separately, lose by separating things that must be considered together. - Kent Beck

In a long enough timeline, software development feels like a semi-random evolution. Real-world concepts _compete_ for space in the codebase by means of classes and names, _expanding_ their meaning, _contracting_ when they get confusing, _flowing_ through polymorphism or pure classes, _pressuring_ when it blocks us from making further changes.

<img src="../images/posts/software-complexity-constructal-law/many-small-objects-1.png" alt="small objects, everything's rainbows and unicorns" class="small">

Every team breaks bloated components into smaller, isolated pieces. It helps them identify those pieces quicker and maintain them. But over time, as the push and pull continues, different teams collaborate and oppressive deadlines force abrupt, unplanned changes, those pieces start to drift and lack cohesion, sometimes being duplicated or just not making sense anymore in the grand scheme of things.

Neil Johnson said it better,

> The [complex] system appears to be "alive". The system evolves in a highly non-trivial and often complicated way, driven by an ecology of agents who interact and adapt under the influence of feedback.

**Complexity must grow**. Thread by thread, it creeps in until the simple is knotted.

<!-- <img src="../images/posts/software-complexity-constructal-law/many-small-objects-2.png" alt="system grows out of control" class="small"> -->

For example, consider complexity as the number of interactions between components. With 2 components, complexity is 1, half its size.

<img src="../images/posts/software-complexity-constructal-law/complexity-evolution-1.png" alt="2 components, complexity 1" class="small">

What happens if we add an extra component? Complexity jumps to 3!

<img src="../images/posts/software-complexity-constructal-law/complexity-evolution-2.png" alt="3 components, complexity 3" class="small">

We hit complexity 15 when reaching mere 6 components, a staggering growth This exponential growth is staggering.

<img src="../images/posts/software-complexity-constructal-law/complexity-evolution-3.png" alt="6 components, complexity 15!" class="small">

This is an extreme case for the sake of the argument, but fair enough topology to express how complexity grows untamed. Such extreme examples are not uncommon, though, as every software team knows well.

## Applying the Constructal Law to tame disorder

Having in mind what we know about Constructal Law, we can redesign the architecture, minimizing the flow pathways to contain complexity.

<img src="../images/posts/software-complexity-constructal-law/order-with-constructal-law-1.png" alt="7 objects, complexity 8" class="small">

Above, we increased the system size by adding a 7th object, while decreasing direct flow from 15 down to 8. In practice, that is achieved by patterns like *Facade* or *Gateway* (single entry to subsystem), a *Mediator*  (central coordinator), Application services (one orchestrator per workflow), or a command or event bus, to name a few. Each replaces a many-to-many mesh with a star (hub) or a pipeline.

Modularization isolates subsystems, as long as the entrypoints are designed intentionally. By moving away from a flat architectures, scarce, well-defined entrypoints will support sustainable growth.

<img src="../images/posts/software-complexity-constructal-law/order-with-constructal-law-2.png" alt="order with constructal law" class="small">

On the other hand, here's how to take the first step to mess up your subsystems.

<img src="../images/posts/software-complexity-constructal-law/order-with-constructal-law-breaking-encapsulation.png" alt="breaking encapsulation as shown in the 2nd article of the series" class="small">

Why is this so bad? Well, whenever we must change B, we're forced to change A too. Every change becomes larger. Second, once you broke a boundary, it's inevitable that these violations will continue into the future.

Overall, ensure less interactions between deeper components, if possible. Create facade objects that delegate the flow further downstream. Although breaking them in smaller pieces is a great first step, but it is preventing whatever components from talking to whatever other components in another subsystem without intentionality that will make sure your overall system remains simple.