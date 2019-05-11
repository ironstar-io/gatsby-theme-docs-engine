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
  headerLinks: Array<{
    doc: string
    label: string
  }>
  headerIcon: string
  footerIcon: string
  favicon: string
  latestVersion: string
  version?: string
  footer: {
    copyright: string
    brandmark: string
    links: Array<{
      url: string
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
