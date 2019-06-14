---
type: page
title: Why does this exist?
---

# Why does this exist?

Always an important question to ask whenever building any software, there are three points that should be checked.

## Does this already exist?

Yes, there are a few other documentation generators that exist, this particular project takes influence from [Docusaurus](https://docusaurus.io/)

## Is there a need for this to exist?

Good documentation is the pillar of a great product, be it software or otherwise. We needed something that was going to tick all the boxes before being
potentially tied to a documentation solution that might not fit for us exactly. We created the time, and decided to build it. In our continued commitment
to the open source community as Ironstar, we also decided that our efforts should be open sourced, so others can potentially benefit.

## Do current solutions fit purpose?

Originally we set out to write all of our documentation using Docusaurus, but found it missed the mark in a few key areas for us at the time.

### Another custom API to learn

This was a key reason to build my own, in hindsight I should have remembered this XKCD from a few years ago.

![Standard Proliferation](https://imgs.xkcd.com/comics/standards.png)

Through utilising [Gatsby Themes](https://www.gatsbyjs.org/docs/themes/), the amount of new concepts and APIs to learn is reduced, but not removed.

### Speed

Loading and reloading the page had to be super, extra snappy if you want people to enjoy reading your docs.

Pre-rendered Gatsby makes route changing and initial load exceptionally fast

### Built with a common tech

Myself and my co-workers are Ironstar are comfortable with a certain set of tech. If the proposed solution requires learning a new framework, it's probably out.

Built with Gatsby on React, frameworks with which many are already comfortable.

### Customisable

Has to be easy to change components without too much difficulty

Gatsby Themes [component shadowing](https://www.christopherbiscardi.com/post/component-shadowing-in-gatsby-child-themes) takes this to the next level

### Extensible

Needs to be easy to add new pages, new custom logic without being bolted to a template

Again, I believe this has been solved through Gatsby Themes. Add pages, add components, build docs inline with an exisiting Gatsby project.

## Did you try anything else?

We also tried some other solutions including paid SaaS providers, but found they didn't fit our use case

## Why "Bantan" Docs Engine

At Ironstar, all of our internal and external projects are accompanied by a Japanese train line code name. See [Tokaido](https://tokaido.io), one of our other
open source projects.

[The Bantan Line (播但線 Bantan-sen)](https://en.wikipedia.org/wiki/Bantan_Line) is a railway line that connects Himeji and Wadayama station in Asago City, Hyōgo Prefecture, Japan.
