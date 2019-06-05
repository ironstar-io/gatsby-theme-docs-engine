import React from 'react'
import { Link } from 'gatsby'
import RootLayout from '../../layout/Root'

import './style.sass'

import { DengineConfig, DengineContent, FirstDocMap } from '../../types'

interface VersionPageTemplateProps {
  pageContext: {
    dengineConfig: DengineConfig
    dengineContent: DengineContent
    pageTitle: string
    version: string
    availableLocales: Array<{
      code: string
      name: string
    }>
    availableVersions: string[]
    locale: string
    firstDocMap: Array<FirstDocMap>
  }
}

const VersionPageTemplate: React.SFC<VersionPageTemplateProps> = ({
  pageContext: {
    dengineConfig,
    dengineContent,
    availableLocales,
    availableVersions,
    locale,
    firstDocMap,
  },
}) => {
  const { latestVersion } = dengineConfig
  const latestDoc: FirstDocMap = firstDocMap.find(
    firstDoc => firstDoc.version === 'latest'
  )

  return (
    <RootLayout
      pageTitle="Available Versions"
      dengineConfig={dengineConfig}
      dengineContent={dengineContent}
      availableLocales={availableLocales}
      availableVersions={availableVersions}
      locale={locale}
      version="N/A"
    >
      <div className="version-page">
        <div className="container">
          <h1>Available Versions</h1>
          <div>
            {latestDoc && (
              <Link to={latestDoc.path}>Latest ({latestVersion})</Link>
            )}
          </div>
          <br />
          {Array.isArray(firstDocMap) &&
            firstDocMap.map(
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
