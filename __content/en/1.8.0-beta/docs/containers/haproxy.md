---
title: HAProxy
root: '/docs'
parents: ['Containers']
tags: ['Containers', 'Proxy']
---

# HAProxy

The HAProxy container is the main HTTPS gateway between you and your Tokaido environment. It terminates HTTP and HTTPS requests and passes the HTTP request down into the Varnish container. For your local development environment, you really only need to use the HTTPS port.

This container uses a [pretty basic haproxy config](https://github.com/tokaido-io/haproxy/blob/master/config/haproxy.cfg). The main reason we use it is because the open source implementation fo Varnish doesn't provide HTTPS, so Haproxy gives us a fast mechanism to enable this.
