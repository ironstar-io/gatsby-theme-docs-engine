import React from 'react'
import Helmet from 'react-helmet'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

import SiteContext from '../context/site'

import { DengineConfig, DengineContent } from '../types'

interface RootLayoutProps {
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
  children: any
}

const RootLayout: React.SFC<RootLayoutProps> = ({
  dengineConfig,
  dengineContent,
  availableLocales,
  availableVersions,
  pageTitle,
  version,
  locale,
  children,
}) => {
  console.log(dengineContent)
  return (
    <SiteContext.Provider
      value={{
        ...dengineConfig,
        ...dengineContent,
        availableLocales,
        availableVersions,
        locale,
        version,
      }}
    >
      <Helmet
        title={`${pageTitle} | ${dengineContent.name || 'Documentation'}`}
        meta={[
          { name: 'description', content: 'Tokaido Documentation' },
          { name: 'keywords', content: 'Drupal, Hosting' },
        ]}
      >
        <html lang="en" />
      </Helmet>
      <Navbar />

      {children}

      <Footer />
    </SiteContext.Provider>
  )
}

export default RootLayout
