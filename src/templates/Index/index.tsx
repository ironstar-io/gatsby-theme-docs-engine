import React from 'react'
import { Link } from 'gatsby'
import { Button, Icon } from 'antd'
import RootLayout from '../../layout/Root'

import './style.sass'

const IndexPage = ({ pageContext: { dengineConfig } }) => {
  const { name } = dengineConfig
  return (
    <RootLayout dengineConfig={dengineConfig} pageTitle="" version="latest">
      <div className="index-page">
        <div className="hero-banner">
          <h1>{name}</h1>
          <h2>An extensible engine for powering your docs</h2>

          <Button type="primary" size="large">
            <Link to="/docs/get-started/introduction">Get Started</Link>
          </Button>
        </div>

        <section className="cta" />
      </div>
    </RootLayout>
  )
}

export default IndexPage
