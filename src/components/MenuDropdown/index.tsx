import React, { useState } from 'react'
import { Link } from 'gatsby'

import './style.sass'

const CLOSED = 'closed'
const OPEN = 'open'

interface MenuDropdownProps {
  title: string
  items: Array<{
    name: string
    internalLinkRef: string
    externalLinkRef: string
  }>
}

const MenuDropdown: React.FC<MenuDropdownProps> = ({
  title = '',
  items = [],
}) => {
  const [menuState, updateMenuState] = useState(CLOSED)

  const toggleMenuState = () => {
    return updateMenuState(menuState === CLOSED ? OPEN : CLOSED)
  }

  return (
    <div className="menu-dropdown">
      <button onClick={toggleMenuState}>{title}</button>
      <div className={`menu-items ${menuState}`}>
        {Array.isArray(items) &&
          items.map(({ name, internalLinkRef, externalLinkRef }) => (
            <div className="menu-item">
              {internalLinkRef && (
                <Link to={internalLinkRef} aria-label={name}>
                  {name}
                </Link>
              )}
              {externalLinkRef && (
                <a href={externalLinkRef} aria-label={name}>
                  {name}
                </a>
              )}
            </div>
          ))}
      </div>
    </div>
  )
}

export default MenuDropdown
