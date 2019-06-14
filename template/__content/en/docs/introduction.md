---
type: page
title: Introduction
tags: ["Welcome", "Get Started"]
---

# Bantan Documentation Engine by Ironstar

This is a [Gatbsy Theme](https://www.gatsbyjs.org/docs/themes/) for technical documentation websites.

## Dependencies

- Node.js >= 8
- yarn/npm

## Quick Start

```sh
git init
yarn init
yarn add gatsby-theme-docs-engine gatsby graphql react react-dom webpack
touch index.js
touch gatsby-config.js
```

Fill your new `gatsby-config.js` file with the following to activate the theme

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

Pull in base set of documentation `npx gatsby-theme-docs-engine init`

Run `yarn develop` to start the development server

Visit http://localhost:8000 to view the base documentation set

## In Production

The source code for the [Tokaido](https://github.com/ironstar-io/tokaido) documentation which is using this theme as a base
can be found [here](https://github.com/ironstar-io/docs.tokaido.io)
