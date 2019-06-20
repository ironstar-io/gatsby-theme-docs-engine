const { siteMetadata, pathPrefix, plugins } = require('./gatsbyConfigCommon')

module.exports = (themeOptions = {}) => {
  if (
    themeOptions.dengineConfig &&
    themeOptions.dengineConfig.algoliaDocSearch &&
    themeOptions.dengineConfig.algoliaDocSearch.enabled === true
  ) {
    plugins.push({
      resolve: `gatsby-plugin-algolia-docsearch`,
      options: {
        apiKey: themeOptions.dengineConfig.algoliaDocSearch.apiKey,
        indexName: themeOptions.dengineConfig.algoliaDocSearch.indexName,
        inputSelector:
          themeOptions.dengineConfig.algoliaDocSearch.inputSelector ||
          '#algolia-docsearch-input',
        debug: themeOptions.dengineConfig.algoliaDocSearch.debug || false,
      },
    })
  }

  if (themeOptions.dengineConfig && themeOptions.dengineConfig.favicon) {
    plugins.push({
      resolve: `gatsby-plugin-favicon`,
      options: {
        logo: themeOptions.dengineConfig.favicon,
      },
    })
  }

  return {
    siteMetadata,
    pathPrefix,
    plugins,
  }
}
