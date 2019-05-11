import React from 'react'
import { Link } from 'gatsby'
import RootLayout from '../../layout/Root'
import { Layout } from 'antd'
const { Content } = Layout

import './style.sass'

import { DengineConfig } from '../../types'

interface PageTemplateProps {
  pageContext: {
    availableVersions: string[]
    dengineConfig: DengineConfig
  }
}

const PageTemplate: React.SFC<PageTemplateProps> = ({
  pageContext: { dengineConfig, availableVersions },
}) => {
  const { latestVersion } = dengineConfig
  return (
    <RootLayout
      pageTitle="Available Versions"
      dengineConfig={dengineConfig}
      version="N/A"
    >
      <Layout className="version-page">
        <Content
          style={{
            background: '#fff',
            padding: 24,
            margin: 0,
          }}
        >
          <div>
            <h1>Available Versions</h1>
            <div>
              <Link to={`/docs/introduction`}>Latest ({latestVersion})</Link>
            </div>
            {availableVersions.map(version => (
              <div key={version}>
                <Link to={`/${version}`}>{version}</Link>
              </div>
            ))}
          </div>
        </Content>
      </Layout>
    </RootLayout>
  )
}
export default PageTemplate
