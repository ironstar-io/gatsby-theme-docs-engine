---
type: page
title: Locales
---

# Locales

Bantan Documentation Engine treats locales as first class citizens, with each set of documentation broken down at the root level into their respective locales, then versions.

This means that locales are isolated in their structure, and also the data delivery to the frontend allowing for the maximum possible flexibility.

## Create a new locale

1. `npx gatsby-theme-docs-engine locale` and follow the prompts
2. This creates an exact copy of your default locale and places it in `__content/docs/{new locale key}/`
3. Add your new locale key to the `dengineContent` object residing in the theme configuration in `gatsby-config.js`
4. Customise the fields in the new locale key to provide a locale context experience
5. Add translations for your documentation in `__content/docs/{new locale key}/`

## About versions

Versions are scoped at the locale level, meaning, for better or worse, you'll need to provide translations for each locale in each new version.
