const dengineConfig = {
  projectName: 'test-site',
  url: 'https://docs.tokaido.io', // Your website URL
  defaultLocale: 'en',
  repository: {
    url: 'https://github.com/ironstar-io/docs-engine',
    branch: 'master',
  },
  /* path to images for header/footer */
  headerIcon: 'img/favicon.ico',
  footerIcon: 'img/favicon.ico',
  favicon: 'img/favicon.ico',
  latestVersion: '1.8.0',
}

const dengineContent = {
  en: {
    // NOT GLOBAL
    name: 'Ironstar Documentation Engine', // Title for your website.
    tagline: 'A website for testing',
    organizationName: 'Ironstar',
    documentationOrder: [
      { parent: 'root', items: ['Introduction'] },
      { parent: 'About Tokaido', items: ['Why use Tokaido?'] },
      { parent: 'Containers', items: ['General', 'HAProxy', 'Varnish'] },
    ],
    // Users of your product (CURRENTLY UNUSED)
    users: [
      {
        caption: 'User1',
        image: '/img/undraw_open_source.svg',
        infoLink: 'https://www.google.com',
        pinned: true,
      },
    ],
    // For no header links in the top nav bar -> headerLinks: [],
    header: {
      style: {
        backgroundImage:
          'linear-gradient(90deg,#3f8bfd,#483bec),linear-gradient(90deg,#483bec,#483bec)',
        color: 'white',
      },
      links: [
        { internalRef: '/docs/introduction', label: 'Docs' },
        { externalRef: 'https://github.com/ironstar-io', label: 'GitHub' },
      ],
    },
    footer: {
      links: [
        { label: 'Ironstar', url: 'https://ironstar.io' },
        { label: 'Tokaido', url: 'https://tokaido.io' },
      ],
      phone: '+61 455 555 555',
      email: 'hello@ironstar.io',
      // HTML OK here
      addressBlock:
        'Level 2, <br />Riverside Quay 1 <br />Southbank Boulevard <br />Southbank VIC 3006',
      socials: [
        { label: 'GitHub', url: 'http://github.com/ironstar-io' },
        {
          label: 'YouTube',
          url: 'https://www.youtube.com/channel/UCZSfGmHSFLRqBRVIaxH9QXw',
        },
        { label: 'Twitter', url: 'http://twitter.com/ironstar-io' },
      ],
      // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
      copyright: `Copyright © ${new Date().getFullYear()} Ironstar Pty Ltd`,
    },
  },
}

module.exports = dengineConfig
