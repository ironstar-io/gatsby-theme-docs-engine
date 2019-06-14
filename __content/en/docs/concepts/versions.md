---
type: page
title: Versions
---

# Versions

Versioning in Bantan is similar to the approach for locales, but a version is scoped to a locale.

## Create a new version

1. `npx gatsby-theme-docs-engine version` and follow the prompts
2. This creates an exact copy of your selected locales' 'latest' and places it in `__content/docs/{locale}/{new version key}`
3. Version is now selectable in the UI at `/{locale}/versions`
4. Repeat for your other supported locales

## Important to note

Versions are scoped at the locale level, meaning, for better or worse, you'll need to provide translations for each locale in each new version.
