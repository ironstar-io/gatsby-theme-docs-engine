import React from 'react'
import { Link } from 'gatsby'
import { Menu, Row, Icon } from 'antd'

interface Props {
  siteTitle: string
  version: string
}

const Header: React.SFC<Props> = ({ siteTitle, version }) => {
  return (
    <Row>
      <Menu mode="horizontal">
        <Menu.Item>
          <Link to="/docs/introduction/">{siteTitle}</Link>
        </Menu.Item>
        <Menu.Item className="version-button">
          <Link to="/versions">
            <div>Version</div>
            {version ? <div>{version}</div> : null}
          </Link>
        </Menu.Item>
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
}

export default Header
