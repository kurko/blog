---
share: true
title: Problem-solving template
date: 2025-06-22 10:00:00 -0400
filename: guide/_posts/2025-06-22-problem-solving-template
tags: [problem-solving, programming, engineering, product]
excerpt: Template document for synthesizing problems, solutions and proposals.

---

The following is a template for RFC's and Tech Briefs I've been using since 2013 in startups for change proposals and aligning understanding among engineers and business people.

## Why would we use such a template?

We engineers tend to overoptimize for solutions (to engineer literally means "find solutions"). In that process, we sometimes forget to think deeply about the problem, especially when we're passionate about the solution. Lots of engineers jump to resolution without fully understanding the problem, and/or without communicating their understanding to those around, generating more problems in the process.

To interrupt that bias, this template serves as a sort of checklist while also giving structure to the very solution. Forcing the writer to think deeply about the problem before diving into a solution optimizes for rationality and maximizes changes of success.

↘︎ <a href="#template">Skip to template</a>

Think of it as a starter kit. You can get a lot more sophisticated. For example, under the Problem section, you could include user stories, data, and anything that details it, but you're free to omit that depending on your situation.

Some tips:

- The best documents are the shortest. Inexperienced people don't write docs, but when they first see their value, they write bibles. After a few years and seniority, they realize most of it is noise, and then they start writing short but good documents.
- Get feedback on your first draft, to make sure you're going in the right direction. The best professionals do.
- I've used Github for reviews for years, and more recently people have preferred UI's like Notion, which in you can comment on specific sentences. That's secondary, but interacting and iterating on the document should be fast.


# <a name="template">The template</a>

```
tl;dr {write this after the doc is ready}

{Small 1-2 sentences introducing this document.}

# Problem

{
Explain the problem. Start from high-level to low-level, creating anchors for the reader.

Take the reader background into consideration. For engineers, focus on technical. For a non-technical audience, start with non-technical language to orient them.

If you can't explain it, you don't understand the problem. Don't jump to solutions before you understand it and the constraints.
}

# Objectives [optional]

{
Describe what you aim to achieve with the solution below. Do we want to hit a specific number? Do we want to decrease a particular threshold?

This section can grow into subsections and include metrics (usage, performance), as well as business objectives, especially for Product briefs. For Tech briefs, they tend to stay focused on systems.

Why [optional]? Because most everyday problems are simple and the Problem section will already make the goals self-evident. Sometimes, however, the problem is large and you want to tackle only a piece of it. In those situations, it makes sense to say, "hey, we will attack this corner over here" to help the reader understand why your propose change is so brief is relation to the problem space.
}

# Proposed change

{
List here every change you are going to make, separated by system. If you are touching two systems, add sub-sections for each.

Most readers are visual, so make use of pictures, charts, diagrams and tables where possible. If you got bullet-point with sub-bullet-points, reconsider if that can become a table.

Architectures and structures that take 2 minutes of reading to understand can be visualize in seconds with a diagram. These days, Github and Notion support Mermaid so creating visual cues is easy, so no excuses.

If you're dealing with a large problem and you need multiple solutions, create separate documents for each solution. For a large problem, e.g "Observability", you might want proposals "Metrics", "Lifecycle map", "Dashboard" and so on.

Rule: do not include alternatives. Your goal is to synthesize the problem and come up with a single solution. There's a whole section at the bottom for alternatives.
}

## Release plan [optional]

{
Usually bullet-points.

For more complex changes, you might need to release parts of it behind feature flags to decrease risk. Make sure to list them here, as well as the timeline. You can use tables to help the reader visualize the content.
}

# Drawbacks

{
Bullet-points with tradeoffs. What's not so great about the proposed solution? What issues aren't addressed?

This section signals to the reader that you considered the shortcomings and had a more holistic view of the problem-solution. You can also include what would be required to "fix" each drawback (in Pros-Cons-Fixes style).
}

# Alternatives

{
List approaches that aren't being proposed but were considered. This gives the reader a chance to review your understanding of the problem, and also signals you considered all alternatives.

Make sure to include why each alternative isn't the main proposal.
}

```