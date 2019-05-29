import React from 'react'
import { Link } from 'gatsby'
import { pathPrefix } from '../../../gatsby-config'

import Expander from './Expander'

import './style.sass'

import { SidebarTreeObject } from '../../types'

interface SidebarContentsProps {
  tree: Array<SidebarTreeObject>
  parents: string[]
}

const SidebarContents: React.SFC<SidebarContentsProps> = ({ tree, parent }) => {
  return (
    <div
      className="side-menu"
      //  defaultOpenKeys={parents} selectedKeys={keys}
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
                  <div className="root-menu-item" key={twig.path}>
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
            <Expander
              key={branch.parent}
              branch={branch}
              currentParent={parent}
            />
          )
        })}
    </div>
  )
}

export default SidebarContents
