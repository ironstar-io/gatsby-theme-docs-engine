import React from 'react'
import { Link } from 'gatsby'
import Menu from 'antd/lib/menu'
import 'antd/lib/menu/style/css'
import { pathPrefix } from '../../../gatsby-config'

const SubMenu = Menu.SubMenu

import { SidebarTreeObject } from '../../types'

interface SidebarContentsProps {
  tree: Array<SidebarTreeObject>
  parents: string[]
}

const SidebarContents: React.SFC<SidebarContentsProps> = ({
  tree,
  parents,
}) => {
  const keys =
    typeof window !== 'undefined'
      ? [pathPrefix + window.location.pathname]
      : undefined

  return (
    <Menu
      mode="inline"
      style={{ minWidth: 180, height: '100%', borderRight: 0 }}
      defaultOpenKeys={parents}
      selectedKeys={keys}
    >
      {tree.map(branch => {
        if (branch.parent === 'root') {
          return branch.items.map(twig => {
            return (
              <Menu.Item key={twig.path}>
                <Link to={twig.path}>
                  <div>{twig.title}</div>
                </Link>
              </Menu.Item>
            )
          })
        }

        return (
          <SubMenu
            key={branch.parent}
            title={<span style={{ fontWeight: 900 }}>{branch.parent}</span>}
          >
            {branch.items.map(twig => {
              return (
                <Menu.Item key={twig.path}>
                  <Link to={twig.path}>
                    <div>{twig.title}</div>
                  </Link>
                </Menu.Item>
              )
            })}
          </SubMenu>
        )
      })}
    </Menu>
  )
}

export default SidebarContents
