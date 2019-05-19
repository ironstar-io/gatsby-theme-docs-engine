import React from 'react'
import { Link } from 'gatsby'
import SiteContext from '../../context/site'

import './style.sass'

import { DengineConfig } from '../../types'

const defaultStyling = {
  backgroundImage:
    'linear-gradient(90deg,#3f8bfd,#483bec),linear-gradient(90deg,#483bec,#483bec)',
  color: 'white',
}

const Navbar: React.SFC<{}> = () => {
  return (
    <SiteContext.Consumer>
      {({ header = {}, name, version, locale }: DengineConfig) => {
        const headerStyling = Object.assign(
          {},
          defaultStyling,
          header.style || {}
        )

        return (
          <div style={headerStyling} className="navbar">
            <div className="container">
              <div className="left">
                <div>
                  <Link to="/">{name}</Link>
                </div>
              </div>
              <div className="right">
                {version !== 'N/A' && (
                  <div className="version-button">
                    <Link to={`/${locale}/versions`}>
                      {version || 'latest'}
                    </Link>
                  </div>
                )}

                {Array.isArray(header.links) &&
                  header.links.map(({ externalRef, internalRef, label }) => (
                    <div key={label}>
                      {externalRef && (
                        <a
                          href={externalRef}
                          aria-label={label}
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          {label}
                        </a>
                      )}
                      {internalRef && (
                        <Link aria-label={label} to={internalRef}>
                          {label}
                        </Link>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )
      }}
    </SiteContext.Consumer>
  )
}

export default Navbar
