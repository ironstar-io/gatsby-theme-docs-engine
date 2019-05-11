export interface DengineConfig {
  name: string
  tagline: string
  url: string
  projectName: string
  organizationName: string
  documentationOrder: Array<{
    parent: string
    items: string[]
  }>
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
