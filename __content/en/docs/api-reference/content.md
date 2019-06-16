---
type: page
title: Content
---

# Content

A TypeScript type definition for this property can be found [here](https://github.com/ironstar-io/bantan-docs-engine/blob/master/src/types.ts)

## Defaults

```js
{
  en: {
    name: 'Bantan Documentation Engine',
    organizationName: 'Ironstar',
    localeInfo: {
      code: 'en',
      name: 'English',
    },
    users: [ // Users of your product (CURRENTLY UNUSED)
      {
        caption: 'User1',
        image: '/img/undraw_open_source.svg',
        infoLink: 'https://www.google.com',
        pinned: true,
      },
    ],
    header: {
      style: {
        backgroundImage:
          'linear-gradient(90deg,#3f8bfd,#483bec),linear-gradient(90deg,#483bec,#483bec)',
        color: 'white',
      },
      links: [
        { internalRef: '/docs/introduction', label: 'Docs' },
        { externalRef: 'https://github.com/ironstar-io/bantan-docs-engine', label: 'GitHub' },
      ],
    },
    footer: {
      brandmark: '/assets/brandmark.svg',
      phone: '+61 455 555 555',
      email: 'hello@documentation.io',
      // HTML OK here
      addressBlock:
        'Level 1, <br />123 Documentation St<br />Doctown VIC 3000',
      socials: [
        { label: 'GitHub', url: 'http://github.com/ironstar-io' },
        {
          label: 'YouTube',
          url: 'https://www.youtube.com/channel/UCZSfGmHSFLRqBRVIaxH9QXw',
        },
        { label: 'Twitter', url: 'http://twitter.com/ironstar-io' },
      ],
      policy: [
        {
          name: 'Privacy',
          externalRef: 'https://example.io/privacy',
        },
        {
          name: 'Terms & Conditions',
          externalRef: 'https://example.io/terms-conditions',
        },
      ],
      // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
      copyright: `© ${new Date().getFullYear()} Ironstar Pty Ltd`,
    },
  }
}
```

## en (Locale key)

_object_

This key should relate to the locale and be the same as the top level locale directory name in `__content`.
In this case `__content/en/...`

### name

_string_

Name of the docs project, this is used in the HTML document title as `{documentation page name} | {documentation project name}`

### organizationName

_string_

Currently unused but may utilised in future expansion, or can be used in custom components

### localeInfo

_object_

Provide some information to the frontend about the current locale, used for the language selection dropdown

code (_string_): Should be the same as your locale key
name (_string_): Free string to name your locale, for example 'English - AU' or 'Chinese - Simplified'

### users

_object_

Currently unused but may utilised in future expansion, or can be used in custom components

### header

_object_

#### style

_object_

Apply CSS in JS type styling properties directly to the header element. This may be deprecated in favour of
SASS overrides in future however

#### links

_Array{}_

Refers to the links to the right hand side of the header

**internalRef or externalRef**

_string_

One of these is required, internalRef utilises the gatsby link component for snappy route changes, externalLink using
a standard HTML anchor element

**label**

_string_

The name to apply to the link

### footer

_object_

#### brandmark

_string_

Optionally provide an icon to display in the middle of the footer

#### phone (optional)

_string_

The phone number you'd like to display in association with your documentation

#### email (optional)

_string_

The email address you'd like to display in association with your documentation

#### addressBlock (optional)

_string_

The address you'd like to display in association with your documentation, a HTML string can be used here

#### policy

_Array{}_

Refers to the policy links to the right hand side of the footer

**internalRef or externalRef**

_string_

One of these is required, internalRef utilises the gatsby link component for snappy route changes, externalLink using
a standard HTML anchor element

**label**

_string_

The name to apply to the link

#### socials

_Array{}_

Refers to the social links at the bottom of the footer

**url**

_string_

The external URL to link to for your social media account

**name**

_string_

The name to apply to the link

### copyright

_string_

The copyright copy to apply to the very bottom of the footer
