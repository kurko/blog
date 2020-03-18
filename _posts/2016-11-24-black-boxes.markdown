---

layout: post
title:  "Black Boxes"
date:   2016-11-24 15:02:54 -0200
tags: [software-complexity]
# front_page_image: '/images/posts/black-boxes/cover.png'
excerpt: "This is an excerpt omg"

---

![Software, in a nutshell](/images/posts/black-boxes/cover.png)

> Most software today is very much like an Egyptian pyramid with millions of bricks piled on top of each other, with no structural integrity, but just done by brute force and thousands of slaves - **Alan Kay**

There’s beauty when things look simple and are easy to operate despite hiding unthinkinkable complexity. Driving a car around requires no mechanical knowledge. Your foot is influencing thousands of explosions per minute.

The simplicity has levels, and as we uncover each layer, complexity‘s growth is gradual and hierarchical. The hood, the components, the engine, the mechanisms inside the engine, spark plug, the camshaft, and the descent into physics and chemistry.

The gradual compartment of complexity makes maintenance simpler. There’s no need to think about the things that are out of sight.

Unfortunately, there’s a lot of software architectures disrespecting this basic principle. Leaky abstractions go in the opposite direction of compartmentalizing components. Maintaining such systems is a very complicated and stressful task.

The art of making complex things simple is lost.

## Forward Thinking

The 70's brought new ways of thinking. The hardware industry began experimenting with treating each electronic component as a separate, individual virtual machine <sup>[1](https://en.wikipedia.org/wiki/Dynabook)</sup>. It removed much of the linear thinking and enabled us to load our thought with an ever increasing number of simultaneous things.

From biology came the inspiration to look at components as cells. When Alan Kay envisioned an electronic board as composed of interdependent, tiny little machines communicating among themselves, it opened a door <sup>[2](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=12&ved=2ahUKEwjs2LCrl6PoAhX9G7kGHSPFDh4QFjALegQIAxAB&url=https%3A%2F%2Farchive.org%2Fdetails%2FAlanKayAtOOPSLA1997TheComputerRevolutionHasntHappenedYet&usg=AOvVaw03bkD9lyQTy4foDmclBQgZ)</sup>. The mind could now conceive systems composed from a few virtual machines up to billions.

In the world of countless components, focus ought to be given to "messaging, local retention and protection and hiding of state" [3](https://www.quora.com/What-is-Alan-Kays-definition-of-Object-Oriented/answer/Alan-Kay-11). Alan Kay called that mental model Object-Oriented.

## Software

Object Orientation is a way of perceiving the world. At its core, it has no relation to programming languages, classes, functions, methods, polymorphism, inheritance, prototypes, mutability, immutability. It has nothing to do with code, instances or how you reference objects in memory. It is about one component calling another.

The value of object orientation is in managing the application’s state in a way that it is self-contained.

When asked what languages could apply it, Alan Kay replied, "Lisp", a functional language. Despite the paradigm, it’s good to avoid leaking implementation details to the outside world. 

Take Erlang. Each BEAM process is a functional program getting a stream of messages. Outside a particular process there could be all sorts of chaotic occurrences, a storm raging. But we don’t care. This compartmentalization lets us focus on what individual components need to do and only that.

Smalltalk started as an initiative to codify these concepts into a language in 1969 and added its own mental models. Other languages came along afterwards including C++ (1983) and Java (1995). When asked about C++, Kay replied, "actually I made up the term object-oriented, and I can tell you I did not have C++ in mind".

We can have any To be able to leverage Object Orientation to manage the systems complexity, we need to decouple ourselves from the thought that it is primarily related to languages.

## In The Wild: Curiosity Mars Rover

Curiosity Mars Rover is one of the greatest examples of a system that is built entirely with OO in mind to keep complexity under an accepted level. And guess what? It's written in C.

![http://cdn.cantechletter.com/wp-content/uploads/2012/09/NASA-Mars-Rover.jpg](/images/posts/black-boxes/mars_rover_c.jpg)

Curiosity has over 2.5 millions lines of code. Composed of many modules, they use a message queue written specially for the rover. Whenever a module needs an information or something to be done, its messages go into the queue, which will dispatch it to the target module, which will then execute what's needed. There are no mutexes, no transactional memory.

If a message is a command, module A never expects an answer or return value from the receiving module B. If module B breaks or goes offline, module A is never impacted by it. If it's a query message, then a return value is expected but no state can be changed.

Besides the evident robustness, this decouples module A from module B. There are no setters. When working on a module, you're not required to know how another module works. Cognitive load is lower. Different teams can comply with a contract of how the interfaces are designed and work in parallel.

When debugging, things get easier too. You can apply binary search to figure out which modules are buggy. Once you find the problematic 50%, you search again.

Changing the system is relatively easies. Due to how things are decoupled, changing one part of the system won't require you to change anything else. It's virtually impossible to violate the Law of Demeter. In Erlang, for instance, processes are deployed to production independently while other components continue running.

Put from another perspective, NASA basically rewrote Erlang, which has all those features, in C. And as Joe Armstrong once said,

> Erlang might be the only object oriented language.

## Perspective

We can apply this perspective of messages to distributed systems, microservices, text codebases, and even Unix pipes. In code, use proper namespaces to convey components, hide your states from other components and start seeing your methods as representations of messages.

All systems will have coupled components, a certain level of complexity and a required cognitive load. This is how nature is, our job is to manage it.
