---
type: page
title: config.js
---

# config.js

This file provides scoped custom config at the locale -> version level and must be present in each `/docs` directory.

The reason for this file is twofold.

1. It is required for setting the order of your documentation for each of your versions
2. It can optionally be used to override content and config present in `gatsby-config.js`

## Example

```js
const versionConfig = {
  documentationOrder: [
    {
      parent: "root",
      items: ["Introduction", "Why?", "Convenience Commands"]
    },
    {
      parent: "Concepts",
      items: [
        "config.js",
        "Locales",
        "Versions",
        "Component Shadowing",
        "Developer Story"
      ]
    },
    {
      parent: "API Reference",
      items: ["0C Design", "Config", "Content"]
    }
  ]
};

module.exports = versionConfig;
```

## Reference

### parent

_string_

This can be any string and is how the documentation page will be nested in the left hand side menu.

Please consider the string 'root' reserved, this is used for documentation pages that aren't nested and always floats
to the top of the list.

While the parent name is set here, the path in the URL is designated by the folder structure inside `/docs`.

### items

_string[]_

This is an ordered list of your documentation files for the given parent, for ordering the links in the side navigation
and providing the correct links for the 'previous'/'next' links at the end of each documentation page.

This string _must_ exactly match the `title` property for the documentation file which you'd like to associate
