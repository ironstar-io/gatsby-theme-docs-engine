import React, { Fragment, useState } from 'react'
import axios from 'axios'

import './style.sass'

interface Props {
  apiPath: string
  apiUrl: string
  page: string
}

const scoreMap = [
  'Unusable Documentation',
  'Poor Documentation',
  'Average Documentation',
  'Good Documentation',
  'Excellent Documentation',
]

const Feedback: React.SFC<Props> = ({ apiUrl, apiPath, page }) => {
  const [score, setScore] = useState(0)
  const [feedbackSent, setSent] = useState(false)
  const [errorMsg, setError] = useState('')
  const [starHover, setStarHover] = useState(0)

  const sendFeedback = async () => {
    try {
      const res = await axios.post(`${apiUrl}${apiPath}`, {
        score: score.toString(),
        docsPage: page,
      })

      setSent(true)

      if (res.status !== 202) {
        throw new Error('A HTTP error occurred')
      }
    } catch (e) {
      console.error(e)
      setError('Failed to send feedback')
    }
  }

  const clickScore = (selected: number) => {
    if (score !== selected) {
      setScore(selected)
    }
  }

  const handleStarHover = (i: number) => {
    if (starHover !== i) {
      setStarHover(i)
    }
  }
  const handleStarLeave = (i: number) => {
    if (starHover !== 0 || starHover !== i) {
      setStarHover(0)
    }
  }

  return (
    <div className="feedback">
      {feedbackSent === false && !errorMsg && (
        <Fragment>
          <div className="stars">
            {new Array(5).fill(null).map((_, i) => (
              <div
                key={`star-${i + 1}`}
                onClick={() => clickScore(i + 1)}
                className={`star ${starHover >= i + 1 && 'star-hover'}`}
                onMouseEnter={() => handleStarHover(i + 1)}
                onMouseLeave={() => handleStarLeave(i + 1)}
              >
                {score >= i + 1 ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 47.94 47.94"
                  >
                    <path
                      d="M26.29 2.49l5.4 10.95c.38.76 1.1 1.3 1.95 1.41l12.09 1.76a2.58 2.58 0 0 1 1.43 4.4l-8.75 8.53c-.6.6-.89 1.45-.74 2.29l2.06 12.04A2.58 2.58 0 0 1 36 46.59l-10.82-5.68c-.75-.4-1.65-.4-2.4 0l-10.82 5.68c-1.89 1-4.1-.61-3.74-2.72l2.06-12.04c.15-.84-.13-1.7-.74-2.29L.78 21.01a2.58 2.58 0 0 1 1.43-4.4l12.1-1.76a2.58 2.58 0 0 0 1.94-1.4l5.4-10.96a2.58 2.58 0 0 1 4.64 0z"
                      fill="#ed8a19"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 490.73 490.73"
                  >
                    <path
                      fill="currentColor"
                      d="M453.44 160.21l-119.7-8.6c-2.5-.2-4.7-1.7-5.6-4.1l-45.6-111c-6.3-15.3-20.5-24.8-37.1-24.8s-30.7 9.5-37.1 24.9l-45.7 111.1a6.7 6.7 0 0 1-5.6 4.1l-119.5 8.6c-16.2.9-30 11.5-35.3 27.1-5.4 15.8-.9 32.4 11.9 43.3l92.5 76.4c1.9 1.6 2.8 4.2 2.2 6.6l-28.2 115.4c-3.3 12-1 24.4 6.3 34.1 7.5 9.8 19.2 15.7 31.5 15.7a38 38 0 0 0 21.1-6.4l101.1-62.9a6.6 6.6 0 0 1 6.9 0l102.1 62.7c6.4 4.3 13.8 6.6 21.3 6.6 11.5 0 22.9-5.5 30.3-14.8 7.7-9.6 10.5-22.1 7.7-34.6l-28.3-115.7c-.6-2.5.3-5.1 2.2-6.7l93.9-76.6c12.6-10.8 17.1-27.4 11.8-43.2-5.2-15.6-19.1-26.3-35.1-27.2zm7.7 51.5l-93.7 76.5a31.16 31.16 0 0 0-10.5 31.5l28.3 115.5c1.5 6.8-1.2 11.5-3 13.7-2.8 3.5-7 5.7-11.2 5.7-2.6 0-5.2-.8-8-2.7l-102.5-63a31.12 31.12 0 0 0-32.7.1l-101.5 63.1c-6.5 4.3-15.2 2.4-19.8-3.6-1.9-2.5-3.9-6.8-2.1-13.1l28.3-115.8c2.8-11.5-1.3-23.8-10.4-31.3l-92.3-76.3c-7.3-6.3-5.3-14.4-4.5-16.7s4.1-10 13.7-10.5l119.7-8.6c11.8-.9 22-8.2 26.5-19.2l45.7-111.1c3.7-9 12-9.7 14.4-9.7 2.4 0 10.7.7 14.4 9.7l45.7 111.1c4.5 11 14.7 18.3 26.5 19.2l119.9 8.7c9.4.5 12.7 8.2 13.5 10.5.6 2.1 2.6 10.2-4.4 16.3z"
                    />
                  </svg>
                )}
                {starHover === i + 1 && (
                  <div className="star-qual">{scoreMap[i]}</div>
                )}
              </div>
            ))}
          </div>
          <div
            className="feedback-btn"
            role="button"
            aria-label="Submit Feedback"
            onClick={() => sendFeedback()}
          >
            SEND FEEDBACK
          </div>
        </Fragment>
      )}
      {feedbackSent === true && !errorMsg && (
        <div className="success">Thank you kindly for your feedback</div>
      )}
      {errorMsg && <div className="failure">{errorMsg}</div>}
    </div>
  )
}

export default Feedback
