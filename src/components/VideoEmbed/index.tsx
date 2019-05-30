import React from 'react'

import './style.sass'

interface VideoModalProps {
  videoId: string
}

const youtubeOptions = {
  autoplay: 0,
  cc_load_policy: 1,
  color: null,
  controls: 1,
  disablekb: 0,
  enablejsapi: 0,
  end: null,
  fs: 1,
  h1: null,
  iv_load_policy: 1,
  list: null,
  listType: null,
  loop: 0,
  modestbranding: null,
  origin: null,
  playlist: null,
  playsinline: null,
  rel: 0,
  showinfo: 1,
  start: 0,
  wmode: 'transparent',
  theme: 'dark',
}

const VideoEmbed: React.FC<VideoModalProps> = ({ videoId }) => {
  const getQueryString = (obj: any = {}) => {
    let url = ''
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key] !== null) {
          url += key + '=' + obj[key] + '&'
        }
      }
    }
    return url.substr(0, url.length - 1)
  }

  const getVideoUrl = (videoId: string): string => {
    const query = getQueryString(youtubeOptions)
    return '//www.youtube.com/embed/' + videoId + '?' + query
  }

  return (
    <div className="video-body">
      <div className="video-inner">
        <div className="video-movie-wrap">
          <iframe
            width="560"
            height="315"
            src={getVideoUrl(videoId)}
            frameBorder="0"
            allowFullScreen={true}
            tabIndex={-1}
          />
        </div>
      </div>
    </div>
  )
}

export default VideoEmbed
