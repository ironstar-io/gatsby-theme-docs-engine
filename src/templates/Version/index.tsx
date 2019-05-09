import React from 'react'
import { Link } from 'gatsby'
import RootLayout from '../../layout/Root'
import { Layout } from 'antd'
const { Content } = Layout

import './style.sass'

interface PageTemplateProps {
  pageContext: {
    availableVersions: string[]
  }
}

const PageTemplate: React.SFC<PageTemplateProps> = ({
  pageContext: { siteTitle, availableVersions },
}) => {
  return (
    <RootLayout siteTitle={siteTitle} pageTitle="Available Versions">
      <div />
      <Layout className="version-page">
        <Content
          style={{
            background: '#fff',
            padding: 24,
            margin: 0,
          }}
        >
          <h1>Available Versions</h1>
          <div>
            <Link to={`/docs/introduction`}>Latest</Link>
          </div>
          {availableVersions.map(version => (
            <div>
              <Link to={`/${version}`}>{version}</Link>
            </div>
          ))}
        </Content>
      </Layout>
    </RootLayout>
  )
}
export default PageTemplate
