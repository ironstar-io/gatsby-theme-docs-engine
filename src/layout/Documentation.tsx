import React from 'react'
import { Layout } from 'antd'
import RootLayout from './Root'
import { SidebarContents } from '../components/SidebarContents'
import { TableOfContents } from '../components/TableOfContents'
import PreviousNext from '../components/PreviousNext'
const { Content } = Layout

import './Documentation.sass'

const DocumentationLayout = ({
  children,
  sidebarTree,
  siteTitle,
  pageTitle,
  version,
  parents,
  previous,
  next,
}: any) => {
  console.log({ version })
  return (
    <RootLayout siteTitle={siteTitle} pageTitle={pageTitle} version={version}>
      <SidebarContents tree={sidebarTree} parents={parents} />
      <Layout>
        <Content className="content-body">{children}</Content>
        <PreviousNext previous={previous} next={next} />
      </Layout>
      <TableOfContents />
    </RootLayout>
  )
}

export default DocumentationLayout
