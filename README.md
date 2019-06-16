# Bantan Docs Engine by Ironstar

This is a [Gatbsy Theme](https://www.gatsbyjs.org/docs/themes/) for technical documentation websites.

See [Bantan Docs Engine Reference Guide](https://gatsby-theme-docs-engine.ironstar.io) for more detailed information.

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
