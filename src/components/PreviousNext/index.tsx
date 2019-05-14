import React from 'react'

import Button from '../Button'

import './style.sass'

import { DocsMeta } from '../../types'

interface Props {
  previous?: DocsMeta
  next?: DocsMeta
}

const PreviousNext = ({ previous = {}, next = {} }: Props) => {
  const previousText =
    previous &&
    `Previous: ${
      Array.isArray(previous.parents) &&
      previous.parents[0] &&
      previous.parents[0] !== 'root'
        ? `${previous.parents[0]} - `
        : ''
    } ${previous.title}`

  const nextText =
    next &&
    `Next: ${
      Array.isArray(next.parents) &&
      next.parents[0] &&
      next.parents[0] !== 'root'
        ? `${next.parents[0]} - `
        : ''
    } ${next.title}`

  return (
    <nav id="previous-next">
      <div className="previous">
        {previous && previous.title && (
          <Button
            invertColor={true}
            linkRef={previous.path}
            ariaLabel={previousText}
          >
            {previousText}
          </Button>
        )}
      </div>
      <div className="next">
        {next && next.title && (
          <Button invertColor={true} linkRef={next.path} ariaLabel={nextText}>
            {nextText}
          </Button>
        )}
      </div>
    </nav>
  )
}

export default PreviousNext
