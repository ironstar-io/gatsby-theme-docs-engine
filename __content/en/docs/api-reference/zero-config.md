---
type: page
title: 0C Design
---

# 0C Design

Akin to other projects we really like, such as [Gatsby](https://www.gatsbyjs.org) (can you tell we're fans?) we enjoy the concept of 0C, or "Zero Configuration"
software libraries.

This means that when you follow the quick start guide in the introduction with the following configuration

```js
module.exports = {
  __experimentalThemes: [
    {
      resolve: "gatsby-theme-docs-engine",
      options: {}
    }
  ]
};
```

The `options` field is an empty object, however when starting up the development server, you'll be greeted with fully working documentation, with defaults
we think will make it easy to get up and going, as quickly as possible.

## Default Override

Applying a 0C paradigm means that these defaults need manual override by the user, however this is not a destructive process. In other words,
once you apply a set of configuration at the top level, the remaining defaults will continue to be applied.

For instance, take the following minimal configuration change

```js
module.exports = {
  __experimentalThemes: [
    {
      resolve: "gatsby-theme-docs-engine",
      options: {
        dengineConfig: {
          projectName: "New Project Docs"
        }
      }
    }
  ]
};
```

In this case `'New Project Docs'` has been set as the new project name, but all of the other defaults will continue to be applied.
