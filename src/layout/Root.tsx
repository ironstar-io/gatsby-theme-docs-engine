import React from 'react'
import Helmet from 'react-helmet'
import Header from '../components/Header'
import { Layout } from 'antd'
import Footer from '../components/Footer'

const { Sider } = Layout

const RootLayout = ({ children, pageTitle, siteTitle, version }: any) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateRows: 'auto 1fr',
        height: '100vh',
      }}
    >
      <Helmet
        title={`${pageTitle} | Ironstar Documentation`}
        meta={[
          { name: 'description', content: 'Tokaido Documentation' },
          { name: 'keywords', content: 'Drupal, Hosting' },
        ]}
      >
        <html lang="en" />
      </Helmet>

      <Header siteTitle={siteTitle} version={version} />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr auto',
          height: '100%',
        }}
        className="main-wrapper"
      >
        {children}
      </div>

      <Layout>
        <Sider width={200} style={{ background: '#fff', height: '100%' }} />
      </Layout>

      <Footer />
    </div>
  )
}

export default RootLayout
