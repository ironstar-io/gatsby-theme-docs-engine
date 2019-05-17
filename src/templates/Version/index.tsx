import React from 'react'
import { Link } from 'gatsby'
import RootLayout from '../../layout/Root'
import { Layout } from 'antd'
const { Content } = Layout

import './style.sass'

import { DengineConfig } from '../../types'

interface VersionPageTemplateProps {
  pageContext: {
    dengineConfig: DengineConfig
    availableVersions: string[]
  }
}

const VersionPageTemplate: React.SFC<VersionPageTemplateProps> = ({
  pageContext: {
    dengineConfig,
    dengineContent,
    availableVersions,
    locale,
    firstDoc,
  },
}) => {
  const { latestVersion } = dengineConfig
  return (
    <RootLayout
      pageTitle="Available Versions"
      dengineConfig={dengineConfig}
      dengineContent={dengineContent}
      locale={locale}
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
              <Link to={firstDoc}>Latest ({latestVersion})</Link>
            </div>
            {availableVersions.map(version => (
              <div key={version}>
                <Link to={`/${locale}/${version}`}>{version}</Link>
              </div>
            ))}
          </div>
        </Content>
      </Layout>
    </RootLayout>
  )
}
export default VersionPageTemplate
