# Bantan Docs Engine by Ironstar

This is a [Gatbsy Theme](https://www.gatsbyjs.org/docs/themes/) for technical documentation websites.

See [Bantan Docs Engine Reference Guide](https://docs-engine.ironstar.io) for more detailed information.

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
      resolve: 'gatsby-theme-docs-engine',
      options: {},
    },
  ],
}
```

Run `yarn develop` to start the development server

Visit http://localhost:8000 to view the base documentation set

## Running Outside Theme Context

This project is at its heart, a Gatsby project. Which means the default docs can be spun up for this project
directly without initialising a theme. This is mostly useful for making contributions to this repository.

You can just run `yarn develop` to get it up and running.

The key differential due to `gatsby-config.js` not allowing export of a function as is required for theme definition,
is that a flag is set. `GATSBY_THEME_LOCAL=true`
