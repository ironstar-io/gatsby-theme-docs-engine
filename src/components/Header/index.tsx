import React from 'react'
import { Link } from 'gatsby'
import { Menu, Row, Icon } from 'antd'
import SiteContext from '../../context/site'

const Header: React.SFC<{}> = () => {
  return (
    <SiteContext.Consumer>
      {({ name, version }) => {
        return (
          <Row>
            <Menu mode="horizontal">
              <Menu.Item>
                <Link to="/docs/introduction/">{name}</Link>
              </Menu.Item>
              {version !== 'N/A' ? (
                <Menu.Item className="version-button">
                  <Link to="/versions">{version || 'latest'} </Link>
                </Menu.Item>
              ) : null}
              <Menu.Item>
                <a href="https://github.com/ironstar-io" target="_blank">
                  <Icon type="github" />
                  GitHub
                </a>
              </Menu.Item>
              <Menu.Item>
                <a href="https://twitter.com/tokaido-io" target="_blank">
                  <Icon type="twitter" />
                  Twitter
                </a>
              </Menu.Item>
            </Menu>
          </Row>
        )
      }}
    </SiteContext.Consumer>
  )
}

export default Header
