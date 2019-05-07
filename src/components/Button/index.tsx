import React from 'react'
import { Link } from 'gatsby'

import './style.sass'

interface ButtonProps {
  linkRef: string
  theme: string
  invertColor: boolean
  icon: boolean
  children: any
  ariaLabel: string
  classname: string
  clickFn: () => {}
}

const Button: React.SFC<ButtonProps> = ({
  linkRef,
  clickFn,
  children,
  ariaLabel = '',
  icon = false,
  invertColor = false,
  classname = '',
  theme = 'light',
}) => {
  const buttonClass = `button theme-${theme} ${
    invertColor ? ' invert-color' : ''
  } ${!linkRef && !clickFn ? ' no-op' : ''}${
    icon ? ' icon' : ' text'
  }${classname}`

  if (linkRef) {
    return (
      <Link className={buttonClass} to={linkRef} aria-label={ariaLabel}>
        <button aria-label={ariaLabel}>{children}</button>
      </Link>
    )
  }

  if (clickFn) {
    return (
      <div className={buttonClass}>
        <button aria-label={ariaLabel} onClick={clickFn}>
          {children}
        </button>
      </div>
    )
  }

  return (
    <div className={buttonClass}>
      <button aria-label={ariaLabel}>{children}</button>
    </div>
  )
}

export default Button
