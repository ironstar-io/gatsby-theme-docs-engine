---
title: 東海道へようこそ
root: '/docs'
parents: ['root']
tags: ['一般情報', '挨拶']
---

東海道へようこそ - 1.8.0-beta!

# 東海道とは？

Tokaido is an open source platform for running Drupal 7 and 8 sites using Docker. It includes an incredibly powerful command line interface called tok for running a production-grade Tokaido environment on your local machine.

Core components like PHP, Nginx, and MySQL run inside Docker containers, making them lightweight and isolated. In addition, Tokaido spawns a series of helper components that unlock additional functionality - like Solr, Memcache, or Mailhog.

## Tokaido Makes Drupal Effortless

The Tokaido CLI was built with simplicity in mind. When designing this tool, we wanted to ensure that it was something you could just pick up and run without needing to spend any time learning how to operate it.

For example, starting a new Tokaido environment just requires one simple command: tok up

```sh
$ tok up

🚀 Tokaido is starting up!
🔄 Creating a background process to sync your local repo into the Tokaido environment
🚅 Tokaido started your containers
🔐 Setting up HTTPS for your local development environment

WELCOME TO TOKAIDO
==================

Your Drupal development environment is now up and running

💻 Run "ssh myproject.tok" to ssh into the environment
🌎 Run "tok open" to open the environment in your browser
👀 Run "tok exec" to run one-time commands like 'tok exec drush status'
🤔 Run "tok status" check the status of your environment
```

## Tokaido is Lightweight

You can run multiple Tokaido environments on your local system at the same time, and each one uses only less than 300MB of memory and almost no CPU.

Consider for example this standard project using the (slightly tidied-up) output from docker stats

```sh
NAME                CPU     % MEM USAGE / LIMIT

umami_mysql_1       0.06%   193.1MiB / 31.34GiB
umami_haproxy_1     0.00%   9.449MiB / 31.34GiB
umami_varnish_1     0.27%   27.86MiB / 31.34GiB
umami_nginx_1       0.00%   12.53MiB / 31.34GiB
umami_fpm_1         0.00%   44.05MiB / 31.34GiB
umami_drush_1       0.00%   11.45MiB / 31.34GiB
umami_kishu_1       0.00%   4.656MiB / 31.34GiB
umami_memcache_1    0.01%   2.594MiB / 31.34GiB
umami_syslog_1      0.00%   3.758MiB / 31.34GiB
umami_mailhog_1     0.00%   3.773MiB / 31.34GiB
umami_sync_1      0.00%   109.8MiB / 31.34GiB
```

## Tokaido is Full Featured

But even though Tokaido is light on resources, it still packs in a full local development environment. As an example, Tokaido launches a full SSH endpoint that you can log into and run commands like Drush, Composer, Gulp, and many other utilities that you don't even need to have installed on your local workstation.

```sh
$ ssh umami.tok

The Tokaido local development system is ephemeral. Each time you restart the
local Tokaido instance, your database is reset. Content not saved in the
/tokaido/site folder will also be lost forever.

Be sure to check out https://tokaido.io/docs for help

🚅 LOCAL umami 02:27:00 /tokaido/site/web $ cd ..
🚅 LOCAL umami 02:27:00 /tokaido/site $ composer install
...
```

You can even use the tok exec command to run SSH commands ad-hoc, and save yourself an extra step:

```
$ tok exec drush status
Drupal version : 8.5.6
Site URI : http://my-project.local.tokaido.io:5154
Database driver : mysql
Database hostname : mysql
Database port : 3306
Database username : tokaido
Database name : tokaido
Database : Connected
```

## Tokaido Feels Great

There's a lot of automation happening every time you launch a new project with tok up.

Our favourite is the SSL Proxy server, which exposes all of your Tokaido projects on a single and trusted SSL portal: [https://local.tokaido.io:5154](https://local.tokaido.io:5154)

When you run tok upthe very first time on a Mac, Tokaido will offer to automatically add a new certificate to your keychain. On Linux, we can't do this automatically but you can still add that certificate to your preferred browser's keychain and stop those annoying SSL validation errors during local development.

But that's not all. There's a bunch of built-in Tokaido commands that make life easy and that just feel great to use:

- tok open will automatically open your Drupal site on the local.tokaido.io URL with HTTPS
- tok open {service}will open the web-facing port of any local services like Nginx, Varnish, Mailhog, and more.
- tok configopens an interface menu editor that lets you easily modify Tokaido settings, like increasing the PHP memory limit or turning on Redis support.
- tok test will auto-provision Nightwatch testing infrastructure for Drupal 8.6 and above.
- tok snapshot can be used to save and restore database snapshots created by Tokaido, or copied from somewhere else
- tok new can launch new Drupal 8 projects with just a single command: check it out with tok new --profile demo_umami
- tok purge can reset your Tokaido Varnish and Drupal cache, making it easier to test caching config locally
  That's really just the tip of the iceberg, and we're constantly adding new conveniences into Tokaido that help you get on with the important work of building amazing Drupal websites.

## Sharing is Easy

Each time you run Tokaido on a project, a shared config file is added at .tok/config.yml. This file gets added to your Git repository and is shared with any other members of your project team.

For example, if you change the PHP Memory Limit to 512MB and commit to the repo, then every other developer will also pick up that change next time they run tok up

## Tokaido is Production-grade

The Docker images that Tokaido runs were first designed to be run in production-grade environments for large enterprise and government hosting. The Tokaido CLI which makes local development so easy came later.

Because they were built for production, these containers either enforce or encourage a secure and reliable approach to Drupal hosting. Our design philosophy is that your local environment should be as close to production as possible, and Tokaido provides a very production-like environment.

Here are some examples of Tokaido's default configuration that encourages security and resilience:

- Tokaido includes Varnish, because all production environments should use caching
- Tokaido includes and configures object caching via Memcache automatically
- Tokaido includes and configures object caching via Memcache automatically
- Tokaido sets secure headers like X-Frame-Options, X-XSS-Protection, and Referrer-Policy by default
- Tokaido's PHP config uses sane defaults for things like max children, memory, and similar.
- Sometimes these defaults can get in the way, which is why we've made it possible to disable these controls. However, it is key to Tokaido's way of working that these are opt-out rather than opt-in settings.

Ready To Do Great Things?
Hopefully by now you're itching to check out Tokaido on your own Drupal projects. We'd suggest now is a good time to head over to the Installing Tokaido documentation.

If you already have Tokaido but don't want to use an existing project (or maybe you don't have one handy), why not try this awesome command and see what happens:

`tok new --profile demo_umami`
