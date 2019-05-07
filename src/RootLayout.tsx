import React from 'react'
import Helmet from 'react-helmet'
import Header from './components/Header'
import { Layout } from 'antd'
import { SidebarContents } from './components/SidebarContents'
import { TableOfContents } from './components/TableOfContents'
import Footer from './components/Footer'
import PreviousNext from './components/PreviousNext'
const { Sider, Content } = Layout

const RootLayout = ({
  children,
  sidebarTree,
  title,
  parents,
  previous,
  next,
}: any) => {
  console.log({ sidebarTree })
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateRows: 'auto 1fr',
        height: '100vh',
      }}
    >
      <Helmet
        title={`${title} | Ironstar Documentation`}
        meta={[
          { name: 'description', content: 'Sample' },
          { name: 'keywords', content: 'sample, something' },
        ]}
      >
        <html lang="en" />
      </Helmet>
      <Header siteTitle={title} />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr auto',
          height: '100%',
        }}
        className="main-wrapper"
      >
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
      </div>
      <Layout>
        <Sider width={200} style={{ background: '#fff', height: '100%' }} />
      </Layout>
      <Footer />
    </div>
  )
}

export default RootLayout
