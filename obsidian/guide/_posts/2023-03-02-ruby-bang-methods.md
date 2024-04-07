---
share: true
title: What does bang methods mean in Ruby?
date: 2023-03-02 06:00:00 -0400
filename: guide/_posts/2023-03-02-ruby-bang-methods
tags:
  - ruby
  - programming
excerpt: It might not mean what you think it means.
---

The Ruby convention for using bangs (`!`) is, mostly, "when there are two versions of the same method, and one of them is _more_ dangerous than the other, use the bang". Citation is none others than [Eric Hodel and David Black](https://archive.is/mgDiH).

For example, in Rails there are `update` and `update!`, `create` and `create!` and so on. In Ruby's Enumerable there are `map` and `map!` and others, but note that's always two methods with the same name. If we check [https://ruby-doc.org/3.2.1/Enumerable.html](https://ruby-doc.org/3.2.1/Enumerable.html), not a single method has _only_ a bang method, they all come in doubles.

The bang in Ruby has nothing to do with whether the method raises exceptions. `Array#map!` doesn't raise an exception. On the other hand, ActiveRecord's `create` can raise exceptions, like when you set uniqueness constraints on your database. However, you sure could use it to mean that the method raises an exception, but that will be _your meaning_, and it's fine. Just be careful not to confuse others.

It also doesn't doesn't mean that it mutates self. Most Enumerable methods with bangs mutate themselves, and that's just a coincidence. ActiveRecord's `create` also mutates itself, and has no bang.

The bang doesn't mean "it *is* dangerous", it means "it's *more* dangerous than the counterpart method without bang", and so unless there's a second method, I don't quite get why put the bang. The presence of `def delete!` means that there's an equivalent `def delete`, but if we can't find it in code, not even in mixins or parent class, then that causes confusion. 

And maybe it's fine to have the bang in methods without counterparts, but what does it mean in this case? Just make sure you have a convention with your team, and make sure every new member who joins is notified that the Ruby convention for bangs is not being used. But at that point, it might not be worth the hassle, and it might be simpler to just stick with known conventions.