const { siteMetadata, pathPrefix, plugins } = require('./gatsbyConfigCommon')

module.exports = {
  siteMetadata,
  pathPrefix,
  plugins: [
    ...plugins,
    {
      resolve: `gatsby-plugin-favicon`,
      options: {
        logo: require.resolve(`${__dirname}/../static/favicon.png`),
      },
    },
  ],
}
