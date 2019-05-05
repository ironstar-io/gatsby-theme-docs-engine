import React from 'react'
import { Link } from 'gatsby'

import './style.sass'

interface Props {
  tree: any
  parents: string[]
}

const PreviousNext = ({ previous, next }: Props) => {
  return (
    <nav id="previous-next">
      <div className="previous">
        {previous && (
          <Link to={previous.path}>
            <button>
              Previous:{' '}
              {Array.isArray(previous.parents) &&
              previous.parents[0] &&
              previous.parents[0] !== 'root'
                ? `${previous.parents[0]} - `
                : ''}
              {previous.title}
            </button>
          </Link>
        )}
      </div>
      <div className="next">
        {next && (
          <Link to={next.path}>
            <button>
              Next:{' '}
              {Array.isArray(next.parents) &&
              next.parents[0] &&
              next.parents[0] !== 'root'
                ? `${next.parents[0]} - `
                : ''}
              {next.title}
            </button>
          </Link>
        )}
      </div>
    </nav>
  )
}

export default PreviousNext
