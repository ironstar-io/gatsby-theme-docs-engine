import React from 'react'
import { Layout } from 'antd'
import RootLayout from './Root'
import { SidebarContents } from '../components/SidebarContents'
import { TableOfContents } from '../components/TableOfContents'
import PreviousNext from '../components/PreviousNext'
const { Content } = Layout

const DocumentationLayout = ({
  children,
  sidebarTree,
  siteTitle,
  pageTitle,
  parents,
  previous,
  next,
}: any) => {
  console.log({ sidebarTree })
  return (
    <RootLayout siteTitle={siteTitle} pageTitle={pageTitle}>
      <SidebarContents tree={sidebarTree} parents={parents} />
      <Layout className="content-body">
        <Content
          style={{
            background: '#fff',
            padding: 24,
            margin: 0,
          }}
        >
          {children}
          <PreviousNext previous={previous} next={next} />
        </Content>
      </Layout>
      <TableOfContents />
    </RootLayout>
  )
}

export default DocumentationLayout
