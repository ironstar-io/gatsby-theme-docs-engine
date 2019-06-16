const dengineContent = {
  en: {
    name: 'Bantan Documentation Engine', // Title for your website.
    organizationName: 'Ironstar',
    localeInfo: {
      code: 'en',
      name: 'English',
    },
    // Users of your product (CURRENTLY UNUSED)
    users: [
      {
        caption: 'User1',
        image: '/img/undraw_open_source.svg',
        infoLink: 'https://www.google.com',
        pinned: true,
      },
    ],
    header: {
      style: {
        backgroundImage:
          'linear-gradient(90deg,#3f8bfd,#483bec),linear-gradient(90deg,#483bec,#483bec)',
        color: 'white',
      },
      links: [
        { internalRef: '/docs/introduction', label: 'Docs' },
        {
          externalRef: 'https://github.com/ironstar-io/bantan-docs-engine',
          label: 'GitHub',
        },
      ],
    },
    footer: {
      brandmark: '/assets/brandmark.svg',
      links: [
        { label: 'Ironstar', url: 'https://ironstar.io' },
        { label: 'Tokaido', url: 'https://tokaido.io' },
      ],
      phone: '+61 455 555 555',
      email: 'hello@documentation.io',
      // HTML OK here
      addressBlock: 'Level 1, <br />123 Documentation St<br />Doctown VIC 3000',
      socials: [
        { label: 'GitHub', url: 'http://github.com/ironstar-io' },
        {
          label: 'YouTube',
          url: 'https://www.youtube.com/channel/UCZSfGmHSFLRqBRVIaxH9QXw',
        },
        { label: 'Twitter', url: 'http://twitter.com/ironstar-io' },
      ],
      policy: [
        {
          name: 'Privacy',
          externalRef: 'https://example.io/privacy',
        },
        {
          name: 'Terms & Conditions',
          externalRef: 'https://example.io/terms-conditions',
        },
      ],
      // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
      copyright: `© ${new Date().getFullYear()} Ironstar Pty Ltd`,
    },
  },
}

module.exports = dengineContent
