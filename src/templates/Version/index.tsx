import React from 'react'
import { Link } from 'gatsby'
import RootLayout from '../../layout/Root'

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
    availableLocales,
    locale,
    firstDocMap,
  },
}) => {
  const { latestVersion } = dengineConfig
  const latestDoc = firstDocMap.find(fdoc => fdoc.version === 'latest')
  return (
    <RootLayout
      pageTitle="Available Versions"
      dengineConfig={dengineConfig}
      dengineContent={dengineContent}
      availableLocales={availableLocales}
      locale={locale}
      version="N/A"
    >
      <div className="version-page">
        <div className="container">
          <h1>Available Versions</h1>
          <div>
            <Link to={latestDoc.path}>Latest ({latestVersion})</Link>
          </div>
          <br />
          {firstDocMap.map(
            fdoc =>
              fdoc.version !== 'latest' && (
                <div key={fdoc.version}>
                  <Link to={fdoc.path}>{fdoc.version}</Link>
                </div>
              )
          )}
        </div>
      </div>
    </RootLayout>
  )
}
export default VersionPageTemplate
