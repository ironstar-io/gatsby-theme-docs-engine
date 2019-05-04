import React from 'react'
import { Link } from 'gatsby'
import { Menu, Row, Icon } from 'antd'

interface Props {
  siteTitle: string
}

const Header: React.SFC<Props> = ({ siteTitle }) => {
  return (
    <Row>
      <Menu mode="horizontal">
        <Menu.Item>
          <Link to="/docs/get-started/introduction/">{siteTitle}</Link>
        </Menu.Item>
        <Menu.Item>
          <a
            href="https://github.com/jannikbuschke/gatsby-antd-docs"
            target="_blank"
          >
            <Icon type="github" />
            GitHub
          </a>
        </Menu.Item>
        <Menu.Item>
          <a href="https://twitter.com/jannikbuschke" target="_blank">
            <Icon type="twitter" />
            Twitter
          </a>
        </Menu.Item>
      </Menu>
    </Row>
  )
}

export default Header
