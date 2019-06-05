import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'

import './style.sass'

interface ExpanderProps {
  currentParent: string
  branch: {
    parent: string
    items: Array<{
      path: string
      title: string
    }>
  }
}

const CLOSED = 'closed'
const OPEN = 'open'

const Expander: React.SFC<ExpanderProps> = ({ branch, currentParent }) => {
  const [menuState, updateMenuState] = useState(CLOSED)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 768) {
        return updateMenuState(OPEN)
      }
    }
  })

  const toggleMenuState = () => {
    return updateMenuState(menuState === CLOSED ? OPEN : CLOSED)
  }

  return (
    <div className="menu-parent-wrap">
      <div className={`menu-parent ${menuState}`} onClick={toggleMenuState}>
        {branch.parent}
      </div>
      <div className={`submenu-wrap ${menuState}`}>
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
    </div>
  )
}

export default Expander
