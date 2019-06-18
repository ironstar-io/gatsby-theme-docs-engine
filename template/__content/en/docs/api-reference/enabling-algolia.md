---
type: page
title: Enabling Algolia
---

# Enabling Algolia

Algolia offers a fantastic product to the community for indexing and searching your documentation pages. It's called DocSearch,
more information and sign up is available here: https://community.algolia.com/docsearch/

This Gatsby theme offers integration with DocSearch out of the box, all you need to do is enable it and add your credentials.

## Data model

`gatsby-config.js`

```js
module.exports = {
  __experimentalThemes: [
    {
      resolve: 'gatsby-theme-docs-engine',
      options: {
        dengineConfig: {
          // ...
          algoliaDocsearch: {
            enabled: true,
            apiKey: 'PROVIDED_API_KEY_HERE',
            indexName: 'PROVIDED_INDEX_NAME_HERE',
            inputSelector: '#some-input-id', // Optional, default: '#algolia-docsearch-input'. Handy if you use a custom component.
            debug: false, // Optional, default: false
          },
        },
        dengineContent: {
          // ...
        },
      },
    },
  ],
}
```

API reference

## algoliaDocsearch

_object_

This object is responsible for enabling and passing credentials to the DocSearch plugin. If it is ommitted/empty nothing will be displayed.

### enabled

_bool_ (default: false)

Must be set to `true` for the search box to be displayed an module initialised.

### apiKey

_string_

The Algolia DocSearch team proivided API key. This is a public key, not a secret and OK to be exposed in the front end.

### indexName

_string_

The Algolia DocSearch team proivided index name. This is a public value, not a secret and OK to be exposed in the front end.

### inputSelector

_string_

A CSS type selector to apply your DocSearch module against. Can safely be omitted, only really useful if you have one or multiple custom
components for `SearchBox` (see `src/components`) and want to use a custom selector.

### debug

_boolean_

Enable debug mode for the DocSearch module. Can be omitted, defaults to false.
