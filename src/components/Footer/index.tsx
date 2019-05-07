import React from 'react'
import { Link } from 'gatsby'

import './styles.sass'

const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="row">
        <div className="col-12 col-lg-1 pb-5">
          <img src="/assets/brandmark.svg" alt="Ironstar" />
        </div>
        <div className="order-1 col-6 col-md-3 col-lg-5 order-md-1 resources">
          <Link className="secondary" to="/">
            Ironstar
          </Link>
          {/* <a className="secondary" href="http://ironstar.io">
            Documentation
          </a> */}
          <a
            className="secondary"
            target="_blank"
            rel="noopener noreferrer"
            href="https://tokaido.io/"
          >
            Tokaido
          </a>
          <Link className="secondary" to="/blog">
            Blog
          </Link>
        </div>
        <div className="order-3 col-6 col-md-3 col-lg-2 order-md-2 contact">
          <a className="secondary" href="tel:+61399824413">
            +61 3 9982 4413
          </a>
          <a href="mailto:hello@ironstar.io">hello@ironstar.io</a>
        </div>
        <div className="order-4 col-6 col-md-3 col-lg-2 order-md-3 address">
          Level 2, <br />
          Riverside Quay 1 <br />
          Southbank Boulevard <br />
          Southbank VIC 3006
        </div>
        <div className="order-1 col-6 col-md-2 order-md-4 social">
          <a
            className="secondary"
            rel="noopener noreferrer"
            target="_blank"
            href="http://github.com/ironstar-io"
          >
            GitHub
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="secondary"
            href="https://www.youtube.com/channel/UCZSfGmHSFLRqBRVIaxH9QXw"
          >
            YouTube
          </a>
          <a
            className="secondary"
            rel="noopener noreferrer"
            target="_blank"
            href="http://twitter.com/ironstar-io"
          >
            Twitter
          </a>
        </div>
        <div className="col-12 col-md-11 offset-md-1 order-5 copyright">
          &copy; 2018 Ironstar Hosting Services. Tokaido is a registered
          trademark of Ironstar Hosting Services.
          {/* <a className="secondary" href="http://ironstar.io">
            Privacy
          </a> */}
        </div>
      </div>
    </div>
  </footer>
)

export default Footer
