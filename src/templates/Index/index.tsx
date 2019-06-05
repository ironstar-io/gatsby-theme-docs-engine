import React from 'react'
import RootLayout from '../../layout/Root'
import Button from '../../components/Button'

import './style.sass'

import { DengineConfig, DengineContent } from '../../types'

interface IndexPageProps {
  pageContext: {
    dengineConfig: DengineConfig
    dengineContent: DengineContent
    firstDoc: string
    pageTitle: string
    version: string
    availableLocales: Array<{
      code: string
      name: string
    }>
    availableVersions: string[]
    locale: string
  }
}

const IndexPage: React.SFC<IndexPageProps> = ({
  pageContext: {
    dengineConfig,
    dengineContent,
    firstDoc,
    locale,
    availableLocales,
    availableVersions,
  },
}) => {
  const { name } = dengineContent

  return (
    <RootLayout
      dengineConfig={dengineConfig}
      dengineContent={dengineContent}
      availableLocales={availableLocales}
      availableVersions={availableVersions}
      locale={locale}
      pageTitle="Hello"
      version="latest"
    >
      <div className="index-page">
        <div className="hero-banner">
          <h1>{name}</h1>

          <Button ariaLabel="Get Started" linkRef={firstDoc}>
            Get Started
          </Button>
        </div>

        <section className="cta" />
      </div>
    </RootLayout>
  )
}

export default IndexPage
