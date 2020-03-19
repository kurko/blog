---

layout: post
title:  "Black Boxes"
date:   2016-11-24 15:02:54 -0200
tags: [software-complexity]
# front_page_image: '/images/posts/black-boxes/cover.png'
excerpt: "There’s beauty when things look simple and are easy to operate despite hiding utmost complexity. Simplicity has levels, and as we dig deeper, each new layer reveals gradual and hierarchical complexity. The progressive compartment of complexity makes maintenance simpler. These _black boxes_ reduce the need to think about what is out of sight until we have to."

---

![Software, in a nutshell](/images/posts/black-boxes/cover.png)

> Most software today is very much like an Egyptian pyramid with millions of bricks piled on top of each other, with no structural integrity, but just done by brute force and thousands of slaves - **Alan Kay**

There’s beauty when things look simple and are easy to operate despite hiding utmost complexity. Driving a car around requires no mechanical knowledge. Your foot is influencing thousands of explosions per minute.

Simplicity has levels, and as we dig deeper, each new layer reveals gradual and hierarchical complexity. The hood, the components, the engine, the mechanisms inside the engine, the spark plug, the camshaft, and the descent into physics and chemistry.

The progressive compartment of complexity makes maintenance simpler. These _black boxes_ reduce the need to think about what is out of sight until we have to. Onboarding new workers is gradual, cognitive load is low.

However, lots of software architectures disrespect this principle with leaky abstractions that go in the opposite direction. Maintaining systems with bad boundaries is hard and stressful.

The art of making complex things simple is lost.

## Tiny, Tiny Machines

From biology came the inspiration to think about components as cells, called objects. When engineers at Xerox PARC in 60’s and 70's envisioned an electronic board as composed of interdependent, tiny little machines communicating among themselves, it opened a door into a future that [is waiting to happen](https://archive.org/details/AlanKayAtOOPSLA1997TheComputerRevolutionHasntHappenedYet)</sup>. 

The greatest system to have flourished from this framework is the Internet itself. Peers anywhere on the planet are able to send and receive messages through millions of network nodes. This cell-like architecture enabled the countless revolutions we have experienced.

The cell membrane separates and protects its interior from the environment. The many different types of specialized cells cooperate with each other by passing materials around. Alan Kay argued that applying these concepts to human-made systems, making objects bounded by these functionalities, ["messaging, local retention and protection and hiding of state"](https://www.quora.com/What-is-Alan-Kays-definition-of-Object-Oriented/answer/Alan-Kay-11), would yield better and more robust systems.

Object orientation is a mental model about the world. It segregates components and hides their complexity by abstracting away their internals, like small _black boxes_. Information about the system is compacted, and the brain can scale reasoning.

## Software

In its roots, object orientation had no relation to programming languages. Classes, inheritance, mutability versus immutability came to be associated with it decades later. It was always about the messages components exchange.

The debate _object orientation versus functional languages_ has always been moot. When asked what languages could apply it, "Lisp" was Alan Kay’s reply. Whatever the paradigm, there is value in managing the application’s state in a way that is self-contained.

Take Erlang, a functional language. Each BEAM process is a functional program getting a stream of messages. Outside a particular process there could be all sorts of chaotic occurrences, a storm raging. But we don’t care. This compartmentalization lets us focus on what individual components need to do and only that.

In 1969, a project to create a programming language based on these principles started. [Smalltalk](https://en.wikipedia.org/wiki/Smalltalk) was born. C++ (1983) and Java (1995) are the most famous, although not the most representative. When asked about C++, Kay replied, "actually I made up the term object-oriented, and I can tell you I did not have C++ in mind".

## Curiosity Mars Rover

Curiosity Mars Rover is a great example of system built with object orientation in mind. Its complexity is contained. And guess what? It's written in C.

![http://cdn.cantechletter.com/wp-content/uploads/2012/09/NASA-Mars-Rover.jpg](/images/posts/black-boxes/mars_rover_c.jpg)

Curiosity has over 2.5 millions lines of code. Composed of many modules, they use a message queue written specially for the rover. Whenever a module needs an information or something to be done, its messages go into the queue, which will dispatch it to the target module, which will then execute what's needed. There are no mutexes, no transactional memory.

If a message is a command, module A never expects an answer or return value from the receiving module B. If module B breaks or goes offline, module A is never impacted by it. If it's a query message, then a return value is expected but no state can be changed.

Besides the evident robustness, this decouples module A from module B. There are no setters. When working on a module, you're not required to know how another module works. Cognitive load is lower. Different teams can comply with a contract of how the interfaces are designed and work in parallel.

Debugging gets easier too. You can apply binary search to figure out which modules are the root cause.

Changing the system is easier due to how things are decoupled, provided changing one part of the system won't require you to change anything else. Like in Erlang, for instance, processes are deployed to production independently while other components continue running.

Put from another perspective, NASA basically rewrote Erlang, which has all those features, in C. And as Joe Armstrong once jokingly said,

> Erlang might be the only object oriented language.

## Perspective

This perspective can be applied to distributed systems, microservices, text codebases, and even Unix pipes. In code, we tend to use namespaces to convey components, hide states from other components and see methods as representations of messages.

In the end, all systems have some coupling, some level of complexity and an unescapable cognitive burden because that’s nature. It’s our job, however, to manage it.
