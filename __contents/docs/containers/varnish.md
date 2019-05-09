---
title: Varnish
root: '/docs'
parents: ['Containers']
---

# Varnish

Each Tokaido environment is little more than a collection of open source Docker containers orchestrated by an easy-to-use CLI. We've built these containers for production hosting environments and have refined them over a long period of time.

In this guide, we'll provide a bit more detail about how each of these containers are built and operate. You can find all the containers on our [GitHub page](https://github.com/tokaido-io/), and you are welcome to fork and contribute.

## Common Functionality

Most of the containers Tokaido runs were built for the same production hosting environment, so they share a lot common ground. If you want to work with them, it can be helpful to understand how they are designed in common.

#### User Accounts

Unless absolutely necessary, all of the containers run as their own users. In total, the following users exist:

- uid 1001 - `tok` - The principal user, and the user you log into the Drush container as
- uid 1002 - `nginx` - The user that the nginx container and process runs as
- uid 1003 - `fpm` - A reserved user that isn't used. The FPM container actually runs as `tok`
- uid 1004 - `varnish` - The user that the varnish container runs as
- uid 1005 - `haproxy` - HAProxy runs as this user
- uid 1006 - `syslog` - You guess it, syslog runs as this user

All of these users are members of the `web` group, with gid 1001.

The primary reason for this strict separation of users is security. By limiting containers to specific user identities, we can effectively limit the potential for an exploit in one container to modify content in another container.

#### Logs

The Varnish, FPM, and Nginx containers all write log files to a shared `/tokaido/logs` volume. You can access these logs from within the Drush/SSH container.

### HAProxy

The HAProxy container is the main HTTPS gateway between you and your Tokaido environment. It terminates HTTP and HTTPS requests and passes the HTTP request down into the Varnish container. For your local development environment, you really only need to use the HTTPS port.

This container uses a [pretty basic haproxy config](https://github.com/tokaido-io/haproxy/blob/master/config/haproxy.cfg). The main reason we use it is because the open source implementation fo Varnish doesn't provide HTTPS, so Haproxy gives us a fast mechanism to enable this.

### Varnish

The Varnish container provides optional caching for content served by Drupal. It receives traffic from the HAProxy container and passses requests for uncached content down to Nginx.

The Varnish container will simply honour whatever cache headers are supplied by your Drupal site, so you can bypass Varnish by simply turning caching off in Drupal. The only real exception to this rule is for logged in users, where the path is /user, /admin, /ajax and a few others, or the Authorization header is present.

Varnish also does some basic security enforcement by adding headers to outgoing responses to improve browser security. These include:

- `X-XSS-Protection = 1; mode=block` stops pages loading when the [browser detects cross-site scripting attacks](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-XSS-Protection){:target="\_blank"}
- `Referrer-Policy = same-origin` stops cross-origin requests from [sending "Referer" information](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy){:target="\_blank"} for strict GDPR compliance
- `Strict-Transport-Security = max-age=31536000` [forces SSL for 1 year](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security){:target="\_blank"}. This isn't needed in Tokaido, but it matches best practices in production so we add it in.

There are a few other tips and tricks that our Varnish image applies. You can review the Varnish config for full details [here](https://github.com/tokaido-io/varnish/blob/master/config/default.vcl){:target="\_blank"}.

### Nginx

The nginx container serves static content from your Drupal site, and passes any PHP requests for Drupal down into the PHP FPM container. There isn't much special about this container, but you can review it's config files [here](https://github.com/tokaido-io/nginx/tree/master/config){:target="\_blank"} if you like.

### FPM

The FPM container is the brains behind your Drupal site. This is arguably the most important container and we've ensured that you have extensive capability to modify and tweak this environment based on your Druapl site's particular needs.

Most of the variables for PHP - things like memory*limit, max_children, and more are all set to sane, production-friendly defaults. You can \_easily* override these by modify Tokaido's `docker-compose.tok.yml` file. Check out the [Environments](/environments) documentation page for more detail.

### Memcache

The memcache containers run, well, ahem, it runs memcache. Obviously. We highly recommend using Memcache in your Drupal site. To use this container in Tokaido, simply add the following to your `settings.tok.php` file after you're run the initial Site Install.

```php
$settings['cache']['default'] = 'cache.backend.memcache';
$settings['memcache_storage']['key_prefix'] = 'default';
$settings['memcache_storage']['memcached_servers'] = ['memcache:11211' => 'default'];
```

### MySQL

The MySQL container provides a local MySQL instance for your Tokaido site. We didn't need to invent anything special for this service, so Tokaido just uses the official Docker MySQL image. Check out the [Environments](/environments) documentation for more details.

Note that each time to replace your Tokaido environment by using `tok destroy` you will completely destroy your MySQL database.

### Drush

The Drush container _is_ something we had to invent especially. It provides an SSH server and many, many friendly tools for managing PHP and Drupal sites. This includes Composer, Vim, the Mysql client, and of course PHP itself.

You can use this container to maintain your site, and to sync between the Tokaido environment and remote uses using Drush aliases.

The Drush container is also your easy access point to all of your site logs, which you'll find in the `/tokaido/logs` folder.

### Syslog

The Syslog container helps with log collection for all of your various containers. Logs received by the Syslog server and stored in `/tokaido/logs`

### Unison

The Unison container runs a local Unison server, an rsync-like utility that performs fast bi-directional sync.

When you start Tokaido by running `tok up`, it synchronises your local repository with the remote environment. To catch further changes, you can run `tok sync` to perform a one-time sync, or run `tok watch` to keep Unison running and syncing any time changes are made.

When Tokaido sets up your environment, it creates a Unison profile inside `~/.unison`. This file gives Unison all of the details it needs to find and sync your site.

### Solr

Tokaido ships with a Solr 6.6 container that extends the official [Docker Solr 6.6 Slim image](https://github.com/docker-solr/docker-solr/tree/master/6.6/slim){:target="\_blank"}

This container currently launches by default and creates a core called `drupal`.

You can access the Solr web interface using the exposed Solr port. You can look this up with this command:

- `tok ports 8983`

This default core includes the Solr conf directory from [search_api_solr release 8.x-2.0](https://www.drupal.org/project/search_api_solr/releases/8.x-2.0){:target="\_blank"}

Inside your Drupal site, you can reach the Solr container using the hostname `solr` on the defautl port 8983. This should work with only the minimal, default config.
