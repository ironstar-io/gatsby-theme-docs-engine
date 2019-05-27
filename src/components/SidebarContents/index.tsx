import React from 'react'
import { Link } from 'gatsby'
import { pathPrefix } from '../../../gatsby-config'

import './style.sass'

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
    <section
      className="side-menu"
      defaultOpenKeys={parents}
      selectedKeys={keys}
    >
      {Array.isArray(tree) &&
        tree.map(branch => {
          if (!branch || !Array.isArray(branch.items)) {
            return null
          }

          if (branch.parent === 'root') {
            return branch.items.map(twig => {
              if (twig) {
                return (
                  <div className="menu-item" key={twig.path}>
                    <Link to={twig.path}>
                      <div>{twig.title}</div>
                    </Link>
                  </div>
                )
              }

              return null
            })
          }

          return (
            <div className="menu-parent-wrap" key={branch.parent}>
              <div className="menu-parent">{branch.parent}</div>
              {branch.items.map(twig => {
                if (twig) {
                  return (
                    <div className="submenu-item" key={twig.path}>
                      <Link to={twig.path}>
                        <div>{twig.title}</div>
                      </Link>
                    </div>
                  )
                }

                return null
              })}
            </div>
          )
        })}
    </section>
  )
}

export default SidebarContents
