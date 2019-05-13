export interface DengineConfig {
  name: string
  tagline: string
  url: string
  projectName: string
  organizationName: string
  defaultLocale: string
  documentationOrder: Array<{
    parent: string
    items: string[]
  }>
  repository: {
    url: string
    branch: string
  }
  users: Array<{
    caption: string
    image: string
    infoLink: string
    pinned: boolean
  }>
  favicon: string
  latestVersion: string
  version?: string
  header: {
    icon: string
    style: {
      backgroundImage: string
      color: string
    }
    links: Array<{
      externalRef?: string
      internalRef?: string
      label: string
    }>
  }
  footer: {
    style: {
      backgroundImage: string
      color: string
    }
    icon: string
    copyright: string
    brandmark: string
    links: Array<{
      externalRef?: string
      internalRef?: string
      label: string
    }>
    phone: string
    email: string
    // HTML OK here
    addressBlock: string
    socials: Array<{
      label: string
      url: string
    }>
  }
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
