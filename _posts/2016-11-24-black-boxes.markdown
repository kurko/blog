---

layout: post
title:  "Black Boxes"
date:   2016-11-24 15:02:54 -0200
tags: [software-complexity]
front_page_image: '/images/posts/black-boxes/cover.png'
excerpt: "This is an excerpt omg"

---

![Software, in a nutshell](/images/posts/black-boxes/cover.png)

> Most software today is very much like an Egyptian pyramid with millions of bricks piled on top of each other, with no structural integrity, but just done by brute force and thousands of slaves - **Alan Kay**

Mark's night was ruined at 11:28pm after the voice announced, "flight 1921 delayed due to...". Airline staff had no good news to any of 261 angry travelers. Best news for Mark is a flight leaving at 5:58am, so he waits. Tired and hungry, he decides to check out a vending machine nearby. Coin inserted, snack selected, a relief, "that was easy".

Consider a parallel universe where Mark has to not just insert a coin, but declare a full list of details that the vending machine has to execute in order to eject snacks. 7 billion people knowing all technical details of every vending machine. Then, one day, one vending machine is replaced and the entire society falls apart. Unthinkable.

That bizarre scenario is, albeit crazy, a perfect metaphor to depict the state of software today. Components intertwined with other components knowing internal details and procedures that don't belong to them cannot be changed so easily. Maintaining such systems is a very complicated and stressful task.

A perspective on components that passed the test of time is Object Orientation (OO), developed by Alan Kay. Started in the 70's in the hardware industry, the rule was treating every electronic component as a computer. Inspired in biology, where each cell is a machine, now processors were machines too interacting with other machines, like memories boards. With those individual machines communicating among themselves, the mind could conceive systems composed from a few virtual machines up to billions. In this new perspective, no more would components sneak into each other's internals.

In this world of countless components, however, Alan Kay regretted defining Object Orientation because it implied that objects and components were the priority in a system. For him, it was about "messaging, local retention and protection and hiding of state", nothing else. According to Kay, messaging was the main feature.

Messaging at center gives rise to protection and hiding of state, decoupling components. Now components are black boxes.

## Software

When asked what languages could OO be applied to, Alan Kay replied, "Smalltalk and Lisp". Lisp, the functional language? Why would anyone do that? Because OO is a _perspective_.

I'll say it again: OO is a perspective. It is not about programming languages, classes, functions, methods, polymorphism, inheritance, prototypes, mutability, immutability. It has nothing to do with code, instances or how you reference objects in memory. It is about one object calling for another. Languages like C++ and Java successfully narrowed the concept down to classes and methods. Marketing.

In a functional language, messages are passed between the components of your system to provide logical encapsulation. You're still going to try to avoid leaking implementation details to the outside world. In Erlang, for instance, each process is a functional program getting a stream of messages. Outside the process there could be all sorts of chaotic occurrences, a storm raging, but on the inside things are calm, letting you focus on what that process should do and only that.

In 1969, Smalltalk started as an initiative to apply these concepts into a language. It sure does have messages, protection and hiding of state, but that's totally another dimension. Other languages came along afterwards. The two biggest names today are C++ and Java created in 1983 and 1995 respectively. Unfortunately, they have distorted what OO really means. When asked about C++, Kay replied, "actually I made up the term object-oriented, and I can tell you I did not have C++ in mind."

To be able to leverage Object Orientation to manage the systems complexity, we need to decouple ourselves from the thought that it is primarily related to languages.

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
