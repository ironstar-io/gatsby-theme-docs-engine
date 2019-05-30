import React from 'react'

import './style.sass'

interface Props {
  children: any
  title: string
  type: 'info' | 'warning' | 'error' | 'success'
}

const InfoBlock: React.FC<Props> = ({
  children,
  title = 'Info',
  type = 'info',
}) => {
  return (
    <div className={`${type}-block callout-block`}>
      <p className="callout">{title}</p>
      {children}
    </div>
  )
}

export default InfoBlock
