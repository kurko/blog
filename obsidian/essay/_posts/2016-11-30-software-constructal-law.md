---

layout: post
title: "Constructal Law And Software"
date: 2016-11-30 15:02:54 -0200
tags: [software]
# front_page_image: '/images/posts/black-boxes/cover.png'
excerpt: ""

---

> Look! Look! Look deep into nature and you will understand everything.
>
> Albert Einstein

Complexity is underrated. The higher it is, the higher the developers' unrest. The higher the cognitive load, the unhappier we are. The real challenge is on structuring our systems in a way that keeps it orderly and engineers productive. For that, a simple physics law can help us: the Constructal Law.

When all we have is bloated components and classes, each with their own endless responsibilities, we're failing at systems thinking. Instead, we're just having clusters of fatty classes and no messages. Looking from the outside, you can't figure out what the system is doing, the business requirements or the user cases. What the app does is hidden.

Neil Johnson, a big proponent of Complexity Science, when defining many key aspects of complex systems, tells us that

> The [complex] system shows a complicated mix of ordered and disordered behavior.

In software, this organization clearly doesn't happen by accident, it's the result of human decisions. It's engineers' duty to build components and systems in an ordered and sustainable way.

The smartest people in computer science have studied and shown since the 60's what are some of the best practices for achieving that. However, that's not enough. We as a society have looked for patterns in nature that'd inspire us to design solutions to our hardest problems, such as neural nets, energy generation and hydraulics. Surprisingly, when it comes to complexity, nature has sophisticated ways for dealing with it too, balancing order and disorder.

## Order and disorder

> Software designers win by separating things that can be considered separately, lose by separating things that must be considered together. - Kent Beck

When we decide to break our bloated components in small and isolated parts, we're faced with one great paradox in programming. At first, everything's rainbows and unicorns. Later, not so much.

![small objects, everything's rainbows and unicorns](../images/posts/software-complexity-constructal-law/many-small-objects-1.png) 

Initially, after our first efforts to isolate concerns, we're happy with it. Everything looks tight and beautiful. However, soon things start falling apart and we end up with something way worse than our initial bloated components.

![system grows out of control](../images/posts/software-complexity-constructal-law/many-small-objects-2.png)

What's the natural thing to do? Give up and get back to our pet, bloated classes. We feel better about it, but in reality we're moving backwards. Your components are not the issue. The problem is that complexity is a living beast that will do everything possible to grow and you'll have to learn to tame it. Quoting Neil Johnson,

> The [complex] system appears to be "alive". The system evolves in a highly non-trivial and often complicated way, driven by an ecology of agents who interact and adapt under the influence of feedback.

## Complexity Wants to Grow

Let's say we defined the complexity of a system as the number of interactions between its components. In the presence of 2 components, complexity would be 1.

![2 components, complexity 1](../images/posts/software-complexity-constructal-law/complexity-evolution-1.png)

What would happen if you added 1 extra component? Complexity would grow from 1 to 3!

![3 components, complexity 3](../images/posts/software-complexity-constructal-law/complexity-evolution-2.png)

This exponential growth is staggering. The moment we reach 6 components, complexity hits 15!

![6 components, complexity 15!](../images/posts/software-complexity-constructal-law/complexity-evolution-3.png)

Obviously, this topology is an extreme, but is fair enough to show that complexity needs to be tamed. And to be honest, this extreme example is not uncommon; this is precisely the thing that people do that allow me to have a job as a consultant!

We came from bloated components to many small components talking to each other. However, things didn't work out very well. Complexity infected everything. What did go wrong?

## Constructal Law

It's not unknown to nature how malicious complexity is. To cope with that, it makes use of a phenomena described as the Constructal Law, the only known physical law that guides design in nature. Its definition is:

> For a finite-size system to persist in time (to live), it must evolve in such a way that it provides easier access to the imposed currents that flow through it.

In practice, whenever something needs to flow from point A to point B, the shape of a tree will arise. This is present everywhere.

![Constructal Law shape](../images/posts/software-complexity-constructal-law/complexity-in-the-wild.jpg)

The designs that happen spontaneously in nature reflect this tendency: they allow entities or things to flow more easily – to measurably move more current farther and faster per unit of useful energy consumed. Even streets and roads, which are artificially built, tend to have to sort of pattern to provide maximum mobility.

## Orderly systems with the Constructal Law

Going back to our complex system and applying the Constructal Law, we could add a 7th object and magically decrease complexity from 15 down to 8!

![7 objects, complexity 8](../images/posts/software-complexity-constructal-law/order-with-constructal-law-1.png)

To be able to develop in such fashion, you need to perceive your objects not as isolated entities, but as part of a bigger concept. For example, one concept could be your favorite webservice client, composed by objects such as the connection, the credentials, the XML text, the response, the request. Another concept could be your database component, composed of Active Record classes, validation classes, connection classes, relationship classes, and so on.

![](../images/posts/software-complexity-constructal-law/order-with-constructal-law-2.png)

Figuring out your system will be much simpler if you separate these concerns in meaningful modules, composed by meaningful objects.

## Living with the Constructal Law

When developing, don't let your instinct fool you into sloppy code. Don't allow one part of a module to talk to an inner part of another module.

Consider the following picture.

![breaking encapsulation as shown in the 2nd article of the series](../images/posts/software-complexity-constructal-law/order-with-constructal-law-breaking-encapsulation.png)

Here, the modules' encapsulation is broken, as we mention in part 2 of our series on complexity. Whenever you have to change B, you'll be forced to change A as well. Whenever you need to do something, you're forced to do more than you should.

We could state a law such as:

> For every interaction between component A and x amount of components, a change in A will require a total of 1+x changes.

The less interactions we have between components, the better. By moving away from the flat, initial architecture into one where encapsulation happens at a modular level, we guarantee our systems to grow without being overwhelmed by this monstrous creature called complexity