---
type: page
title: Directory Structure
---

# Directory Structure

General rules

- All content for documentation located in the `PROJECT_ROOT/__content` Directory
- At least one locale directory
- md/mdx files located in {locale}/docs the extra directory depth to help with easier preprocessing logic, and future expansions to support 'blog' etc.
- {locale}/docs (ie. no version directory)

```shell
PROJECT_ROOT
|-- `/__content`
|---- `/{locale}`
|------ `/docs`<--- this maps to 'latest'
|-------- optional subdirectories
|-------- markdown/mdx
|-------- `config.js`
|------ `/{version}`
|-------- `/docs`
|---------- optional subdirectories
|---------- markdown/mdx
|---------- `config.js`
```

Practical example of a version in a locale, take English (en) for version 1.8.0. The documentation files would be located at `PROJECT_ROOT/__content/en/1.8.0/docs/`
