import React from 'react'

import { Link } from 'gatsby'

import './style.sass'

import { DocsMeta } from '../../types'

interface Props {
  previous?: DocsMeta
  next?: DocsMeta
}

const PreviousNext = ({ previous = {}, next = {} }: Props) => {
  const previousText =
    previous &&
    `${
      Array.isArray(previous.parents) &&
      previous.parents[0] &&
      previous.parents[0] !== 'root'
        ? `${previous.parents[0]} - `
        : ''
    } ${previous.title}`

  const nextText =
    next &&
    `${
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
          <Link to={previous.path} aria-label={previousText}>
            <b>Previous:</b>
            <br />
            {previousText}
          </Link>
        )}
      </div>
      <div className="next">
        {next && next.title && (
          <Link to={next.path} aria-label={nextText}>
            <b>Next:</b>
            <br />
            {nextText}
          </Link>
        )}
      </div>
    </nav>
  )
}

export default PreviousNext
