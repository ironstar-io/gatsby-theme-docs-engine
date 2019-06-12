import React, { useState, Fragment } from 'react'

import './style.sass'

const CLOSED = 'closed'
const OPEN = 'open'

const Hamburger: React.SFC<{}> = ({ children }) => {
  const [menuState, toggleMenuState] = useState(CLOSED)

  const handleToggle = () => {
    return toggleMenuState(menuState === CLOSED ? OPEN : CLOSED)
  }

  return (
    <Fragment>
      <button
        onClick={handleToggle}
        className={`hamburger hamburger--spring${
          menuState === OPEN ? ' is-active' : ''
        }`}
        type="button"
      >
        <span className="hamburger-box">
          <span className="hamburger-inner" />
        </span>
      </button>
      <div className={`menu-items${menuState === OPEN ? ' is-active' : ''}`}>
        {children}
      </div>
    </Fragment>
  )
}

export default Hamburger
