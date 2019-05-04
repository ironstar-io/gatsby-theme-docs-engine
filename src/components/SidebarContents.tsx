import React from 'react'
import { Link } from 'gatsby'
import Menu from 'antd/lib/menu'
import 'antd/lib/menu/style/css'
import { pathPrefix } from '../../gatsby-config'

const SubMenu = Menu.SubMenu

interface Props {
  tree: any
  parents: string[]
}

export const SidebarContents = ({ tree, parents }: Props) => {
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
      {Object.keys(tree).map(branch => {
        if (branch === 'root') {
          return tree[branch].map(twig => {
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
            key={branch}
            title={<span style={{ fontWeight: 900 }}>{branch}</span>}
          >
            {tree[branch].map(twig => {
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
