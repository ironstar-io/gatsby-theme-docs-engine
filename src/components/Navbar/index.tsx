import React, { useEffect, useState, Fragment } from 'react'
import { Link } from 'gatsby'

import MenuDropdown from '../MenuDropdown'
import HamburgerMenu from '../HamburgerMenu'

import SiteContext from '../../context/site'

import './style.sass'

import { DengineContent } from '../../types'

const defaultStyling = {
  backgroundImage:
    'linear-gradient(90deg,#3f8bfd,#483bec),linear-gradient(90deg,#483bec,#483bec)',
  color: 'white',
}

const languageNavbarMap = (
  availableLocales: Array<{ code: string; name: string }> = []
) =>
  availableLocales.map(({ code, name }) => ({
    name,
    internalLinkRef: `/${code}`,
  }))

const Navbar: React.SFC<{}> = () => {
  const [isMobile, setMobile] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth <= 767) {
        return setMobile(true)
      }
    }
  })

  return (
    <SiteContext.Consumer>
      {({
        header = {},
        name,
        version,
        locale,
        availableLocales,
        availableVersions,
      }: DengineContent) => {
        const headerStyling = Object.assign(
          {},
          defaultStyling,
          header.style || {}
        )

        const renderMenuInner = (
          <Fragment>
            {version !== 'N/A' &&
              Array.isArray(availableVersions) &&
              availableVersions.length > 1 && (
                <div className="version-button">
                  <Link to={`/${locale}/versions`}>{version || 'latest'}</Link>
                </div>
              )}

            {Array.isArray(availableLocales) && availableLocales.length > 1 && (
              <MenuDropdown
                title="Language"
                items={languageNavbarMap(availableLocales)}
              />
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
          </Fragment>
        )

        return (
          <div style={headerStyling} className="navbar">
            <div className="container">
              <div className="left">
                <div className="main-title">
                  <Link to="/">
                    {header.logo ? <img src={header.logo} /> : name}
                  </Link>
                </div>
              </div>
              <div className="right">
                {isMobile && <HamburgerMenu>{renderMenuInner}</HamburgerMenu>}
                {!isMobile && renderMenuInner}
              </div>
            </div>
          </div>
        )
      }}
    </SiteContext.Consumer>
  )
}

export default Navbar
