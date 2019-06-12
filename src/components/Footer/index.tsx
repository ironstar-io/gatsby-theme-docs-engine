import React from 'react'
import { Link } from 'gatsby'

import SiteContext from '../../context/site'

import './styles.sass'

import { DengineContent } from '../../types'

const defaultStyling = {
  backgroundImage:
    'linear-gradient(90deg,#3f8bfd,#483bec),linear-gradient(90deg,#483bec,#483bec)',
  color: 'white',
}

const Footer: React.SFC<{}> = () => (
  <SiteContext.Consumer>
    {({ footer = {} }: DengineContent) => {
      const footerStyling = Object.assign(
        {},
        defaultStyling,
        footer.style || {}
      )

      return (
        <footer style={footerStyling} className="footer">
          <div className="container">
            {footer.brandmark && (
              <div className="brandmark">
                <img src={footer.brandmark} alt="Brandmark" />
              </div>
            )}
            <div className="row">
              {Array.isArray(footer.links) &&
                footer.links.map(({ externalRef, internalRef, label }) => (
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

              <div className="contact">
                <div className="left">
                  {footer.addressBlock && (
                    <div
                      className="address"
                      dangerouslySetInnerHTML={{ __html: footer.addressBlock }}
                    />
                  )}
                </div>
                <div className="right">
                  {footer.phone && (
                    <a href={`tel:${footer.phone}`}>Phone: {footer.phone}</a>
                  )}
                  {footer.email && (
                    <a href={`mailto:${footer.email}`}>Email: {footer.email}</a>
                  )}
                  {Array.isArray(footer.policy) && (
                    <div className="policy-links">
                      {footer.policy.map(
                        ({ name, externalRef, internalRef }) => {
                          if (internalRef) {
                            return (
                              <Link key={name} to={internalRef}>
                                {name}
                              </Link>
                            )
                          }
                          return (
                            <a key={name} href={externalRef}>
                              {name}
                            </a>
                          )
                        }
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="social">
                {Array.isArray(footer.socials) &&
                  footer.socials.map(({ label, url }) => (
                    <a
                      key={url}
                      aria-label={label}
                      rel="noopener noreferrer"
                      target="_blank"
                      href={url}
                    >
                      {label}
                    </a>
                  ))}
              </div>
              {footer.copyright && (
                <div className="copyright">{footer.copyright}</div>
              )}
              <div className="powered-by">Built with <a href="https://github.com/ironstar-io/bantan-docs-engine" target="_blank">Bantan Docs Engine</a> by <a href="https://ironstar.io">Ironstar</a></div>
            </div>
          </div>
        </footer>
      )
    }}
  </SiteContext.Consumer>
)

export default Footer
