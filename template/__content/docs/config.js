const versionConfig = {
  documentationOrder: [
    {
      parent: 'root',
      items: [
        'Introduction',
        'Installation',
        'FAQ',
        'Support',
        'Release Schedule',
        'Usage Data',
      ],
    },
    {
      parent: 'About Tokaido',
      items: [
        'Tokaido vs Other Tools',
        'Why should I use Tokaido?',
        'Tokaido Sync Services',
        "What's New in 1.8",
      ],
    },
    {
      parent: 'Using Tokaido',
      items: [
        'Starting a New Drupal Project',
        'Starting an Existing Drupal Project',
        'Managing the Tokaido Config',
        'Tokaido Command Reference',
        'Changing the PHP Version',
      ],
    },
    {
      parent: 'Advanced Tokaido',
      items: [
        'Directly Managing docker-compose',
        'Full Tokaido Configuration Reference',
        'Provisioning Nightwatch Tests',
        'Using Xdebug',
        'Cleaning up Tokaido Environments',
      ],
    },
    {
      parent: 'Tokaido Containers',
      items: [
        'General',
        'Apache Solr',
        'Adminer',
        'PHP FPM',
        'Mailhog',
        'MySQL',
        'Memcache',
        'Redis',
        'Varnish',
      ],
    },
  ],
}

module.exports = versionConfig
