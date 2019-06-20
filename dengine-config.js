const dengineConfig = {
  projectName: 'Bantan Docs Engine',
  url: 'https://bantan-docs.ironstar.io', // Your website URL
  defaultLocale: 'en',
  repository: {
    url: 'https://github.com/ironstar-io/gatsby-theme-docs-engine',
    branch: 'master',
  },
  feedback: {
    show: false,
    apiPath: '/v1/feedback/documentation',
  },
  algoliaDocSearch: {
    enabled: false,
  },
  apiUrl: 'https://api.xxxxxx.io',
  redirectIndex: true,
  favicon: '',
  latestVersion: '0.1.7',
}

module.exports = dengineConfig
