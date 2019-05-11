import React from 'react'
import Helmet from 'react-helmet'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

import SiteContext from '../context/site'

const RootLayout = ({ children, pageTitle, dengineConfig, version }: any) => {
  return (
    <SiteContext.Provider value={{ ...dengineConfig, version }}>
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
