---
type: page
title: Component Shadowing
---

# Component Shadowing

This is the most powerful feature of Gatsby Themes, and also the most compelling for us when deciding on technology for this project

## What is it?

This allows you to create new React components that override the one or many of the components supplied by the theme, allowing you to render
with a twist, or completely customised components. Huge amounts of flexibility without pulling in the entire theme code into source.

## How to use

At a very high level, you want to "shadow" your themes' component, so let's start by creating a new directory at `PROJECT_ROOT/src` with the exact same
name as your theme as it exists in npm. In this instance `gatsby-theme-docs-engine`.

Will result in the following structure

```shell
PROJECT_ROOT
|-- src
|---- gatsby-theme-docs-engine
```

Say for instance, we'd like a custom footer. Looking at the structure of the theme, there's a component called `Footer` in the `components` directory.
Let's "shadow" this structure and provide a new custom React component for rendering

```shell
PROJECT_ROOT
|-- src
|---- gatsby-theme-docs-engine
|------ components
|-------- Footer
|---------- index.tsx
|---------- style.sass
```

Now the next time you run `gatsby develop` the page will render as normal, except the footer will be the the custom component.

## Additional Information

From people who can explain it much better than myself.

- [Gatsby Themes with Component Shadowing](https://www.gatsbyjs.org/docs/themes/api-reference/#component-shadowing)
- [A good blog post on Component Shadowing](https://www.gatsbyjs.org/blog/2019-04-29-component-shadowing/)
