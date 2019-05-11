import React from 'react'
import RootLayout from '../../layout/Root'
import Button from '../../components/Button'

import './style.sass'

import { DengineConfig } from '../../types'

interface IndexPageProps {
  pageContext: {
    dengineConfig: DengineConfig
  }
}

const IndexPage: React.SFC<IndexPageProps> = ({
  pageContext: { dengineConfig },
}) => {
  const { name } = dengineConfig
  return (
    <RootLayout
      dengineConfig={dengineConfig}
      pageTitle="Hello"
      version="latest"
    >
      <div className="index-page">
        <div className="hero-banner">
          <h1>{name}</h1>
          <h2>An extensible engine for powering your docs</h2>

          <Button
            ariaLabel="Get Started"
            linkRef="/docs/get-started/introduction"
          >
            Get Started
          </Button>
        </div>

        <section className="cta" />
      </div>
    </RootLayout>
  )
}

export default IndexPage
