const baseConfig = require('@ironstar/docs-engine/gatsby/gatsby-config.js')
const plugins = baseConfig.plugins.push({
  // Optionally add any additional gatsby plugin configuration here
})

module.exports = Object.assign(baseConfig, {
  siteMetadata: {
    title: 'Gatsby Ant-Design Documentation Starter',
  },
  pathPrefix: '/ironstar-documentation',
  plugins,
})
