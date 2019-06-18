export interface DengineConfig {
  projectName: string
  url: string
  defaultLocale: string
  repository: {
    url: string
    branch: string
  }
  feedback: {
    show: boolean
    apiPath: string
  }
  algoliaDocSearch: {
    enabled: boolean
    inputSelector: string
    apiKey: string
    indexName: string
    debug: boolean
  }
  apiUrl: string
  favicon: string
  latestVersion: string
  headerIcon: string
  footerIcon: string
}

export interface DengineContent {
  name: string
  tagline: string
  organizationName: string
  localeInfo: {
    code: string
    name: string
  }
  users: Array<{
    caption: string
    image: string
    infoLink: string
    pinned: boolean
  }>
  header: {
    icon: string
    style?: any
    links?: Array<{
      externalRef?: string
      internalRef?: string
      label: string
    }>
  }
  footer: {
    style?: any
    icon?: string
    copyright?: string
    brandmark?: string
    links?: Array<{
      externalRef?: string
      internalRef?: string
      label: string
    }>
    phone?: string
    email?: string
    // HTML OK here
    addressBlock?: string
    socials?: Array<{
      label: string
      url: string
    }>
    policy?: Array<{
      name: string
      internalRef?: string
      externalRef?: string
    }>
  }
  copyright: string
}

export interface FirstDocMap {
  path: string
  version: string
}

export interface DocsMeta {
  key: string
  parents: string[]
  path: string
  title: string
}

export interface SidebarTreeObject {
  items: Array<{
    key: string
    parents: string[]
    path: string
    title: string
  }>
  parent: string
}
