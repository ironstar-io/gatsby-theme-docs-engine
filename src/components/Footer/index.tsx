import React from 'react'
import { Link } from 'gatsby'

import SiteContext from '../../context/site'

import './styles.sass'

const Footer = () => (
  <SiteContext.Consumer>
    {({ footer }) => {
      return (
        <footer className="footer">
          <div className="container">
            {footer.brandmark && (
              <div className="brandmark">
                <img src="/assets/brandmark.svg" alt="Ironstar" />
              </div>
            )}
            <div className="row">
              {Array.isArray(footer.links) && (
                <div className="resources">
                  {footer.links.map(({ label, url }) => (
                    <a aria-label={label} key={url} href={url}>
                      {label}
                    </a>
                  ))}
                </div>
              )}
              <div className="contact">
                {footer.phone && <a href="tel:+61399824413">+61 3 9982 4413</a>}
                {footer.email && (
                  <a href="mailto:hello@ironstar.io">hello@ironstar.io</a>
                )}
              </div>
              {footer.addressBlock && (
                <div
                  className="address"
                  dangerouslySetInnerHTML={{ __html: footer.addressBlock }}
                />
              )}
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
                <div className="copyright">
                  &copy; 2018 Ironstar Hosting Services. Tokaido is a registered
                  trademark of Ironstar Hosting Services.
                </div>
              )}
              {/* <a className="secondary" href="http://ironstar.io">
                Privacy
              </a> */}
            </div>
          </div>
        </footer>
      )
    }}
  </SiteContext.Consumer>
)

export default Footer
