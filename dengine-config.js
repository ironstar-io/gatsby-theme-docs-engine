const dengineConfig = {
  projectName: 'Bantan Docs Engine',
  url: 'https://bantan-docs.ironstar.io', // Your website URL
  defaultLocale: 'en',
  repository: {
    url: 'https://github.com/ironstar-io/bantan-docs-engine',
    branch: 'master',
  },
  feedback: {
    show: false,
    apiPath: '/v1/feedback/documentation',
  },
  apiUrl: 'https://api.xxxxxx.io',
  redirectIndex: true,
  favicon: 'img/favicon.ico',
  latestVersion: '0.1.7',
}

module.exports = dengineConfig
