import React from 'react'
import Helmet from 'react-helmet'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

import SiteContext from '../context/site'

import { DengineConfig } from '../types'

import '../styles/global.sass'

interface RootLayoutProps {
  dengineConfig: DengineConfig
  pageTitle: string
  version: string
  children: any
}

const RootLayout: React.SFC<RootLayoutProps> = ({
  dengineConfig,
  dengineContent,
  availableLocales,
  pageTitle,
  version,
  locale,
  children,
}: any) => {
  return (
    <SiteContext.Provider
      value={{
        ...dengineConfig,
        ...dengineContent,
        availableLocales,
        locale,
        version,
      }}
    >
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
        <Navbar />

        {children}

        <Footer />
      </div>
    </SiteContext.Provider>
  )
}

export default RootLayout
