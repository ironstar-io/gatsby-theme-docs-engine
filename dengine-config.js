const dengineConfig = {
  title: 'Ironstar Documentation Engine', // Title for your website.
  tagline: 'A website for testing',
  url: 'https://docs.tokaido.io', // Your website URL
  // Used for publishing and more
  projectName: 'test-site',
  organizationName: 'Ironstar',
  documentationOrder: [
    { parent: 'root', items: ['Introduction'] },
    { parent: 'About Tokaido', items: ['Why use Tokaido?'] },
    { parent: 'Containers', items: ['General', 'HAProxy', 'Varnish'] },
  ],
  // Users of your product
  users: [
    {
      caption: 'User1',
      image: '/img/undraw_open_source.svg',
      infoLink: 'https://www.google.com',
      pinned: true,
    },
  ],
  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    { doc: 'about/introduction', label: 'Docs' },
    { page: 'help', label: 'Help' },
    { blog: true, label: 'Blog' },
  ],

  /* path to images for header/footer */
  headerIcon: 'img/favicon.ico',
  footerIcon: 'img/favicon.ico',
  favicon: 'img/favicon.ico',

  // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
  copyright: `Copyright © ${new Date().getFullYear()} Ironstar Pty Ltd`,
}

module.exports = dengineConfig
