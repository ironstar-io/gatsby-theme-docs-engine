---
type: page
title: Config
---

# Config

A TypeScript type definition for this property can be found [here](https://github.com/ironstar-io/gatsby-theme-docs-engine/blob/master/src/types.ts)

## Defaults. See: `dengineConfig`

`gatsby-config.js`

```js
module.exports = {
  __experimentalThemes: [
    {
      resolve: 'gatsby-theme-docs-engine',
      options: {
        dengineConfig: {
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
          apiUrl: 'https://api.xxxxxx.io',
          redirectIndex: true,
          favicon: 'img/favicon.ico',
          latestVersion: '0.1.7',
        },
        dengineContent: {
          // ...
        },
      },
    },
  ],
}
```

## Reference

### projectName

_string_

Not used in the default template, but provided to the frontend for future use or extended custom components

### url

_string_

Not used in the default template, but provided to the frontend for future use or extended custom components

### defaultLocale

_string_

Should map to one of the top level keys in the `dengineContent`. This determines the locale that is loaded when visiting the root index page.

### repository

_object_

Repository details, for providing the "Notice something wrong, sumbit a PR" link in documentation pages back to the original repo

- url (_string_): The repo for this set of documentation
- branch (_string_): The main branch where edits should exist, usually 'master'

### feedback

_object_

Optionally implement feedback stars at the bottom of each documentation page. Omitting this property will default to not showing the
feedback component at all

- show (_bool_): Whether or not to show the feedback component.
- apiPath (_string_): The path in which to POST the feedback result

When this is enabled, on send, it will send a POST request to a combination of `apiUrl` and `feedback.apiPath` with a payload that looks like the following example

```json
{
  "score": "5",
  "docsPage": "/en/docs/introduction.md"
}
```

You'd have to set up your own API to accept and process this request of course.

As mentioned, this also requires the `apiUrl` property to be set in the root, more information on that in the following section

### apiUrl

_string_

The root URL for your API, not including a trailing `/`

Currently this is only used for the feedback API POST, but mayb ben extended in the library for more uses in the future, or with your own custom components.

### redirectIndex

_bool_

Should the a splash page be shown at the root index level of the site, or should it redirect to the first documentation page for the locale context

### favicon

_string_

Path to your favicon file in `/static`

### latestVersion

_string_

The matcher for `/versions` page to know which version should be marked as "latest"
