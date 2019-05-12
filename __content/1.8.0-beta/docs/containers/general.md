---
title: General
root: '/docs'
parents: ['Containers']
tags: ['General', 'Containers']
---

# General

Each Tokaido environment is little more than a collection of open source Docker containers orchestrated by an easy-to-use CLI. We've built these containers for production hosting environments and have refined them over a long period of time.

In this guide, we'll provide a bit more detail about how each of these containers are built and operate. You can find all the containers on our [GitHub page](https://github.com/tokaido-io/), and you are welcome to fork and contribute.

## Common Functionality

Most of the containers Tokaido runs were built for the same production hosting environment, so they share a lot common ground. If you want to work with them, it can be helpful to understand how they are designed in common.

### User Accounts

Unless absolutely necessary, all of the containers run as their own users. In total, the following users exist:

- uid 1001 - `tok` - The principal user, and the user you log into the Drush container as
- uid 1002 - `nginx` - The user that the nginx container and process runs as
- uid 1003 - `fpm` - A reserved user that isn't used. The FPM container actually runs as `tok`
- uid 1004 - `varnish` - The user that the varnish container runs as
- uid 1005 - `haproxy` - HAProxy runs as this user
- uid 1006 - `syslog` - You guess it, syslog runs as this user

All of these users are members of the `web` group, with gid 1001.

The primary reason for this strict separation of users is security. By limiting containers to specific user identities, we can effectively limit the potential for an exploit in one container to modify content in another container.

### Logs

The Varnish, FPM, and Nginx containers all write log files to a shared `/tokaido/logs` volume. You can access these logs from within the Drush/SSH container.
