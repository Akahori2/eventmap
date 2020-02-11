

import React from "react"

function FacebookShareButton({ dataSize, ...props }) {
  return (
    <div
      className="fb-share-button"
      data-href="https://event-map.info"
      data-layout="button"
      data-size={dataSize}
      data-mobile-iframe="false"
    >
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fevent-map.info%2F&amp;src=sdkpreparse"
        className="fb-xfbml-parse-ignore"
      >
        シェア
      </a>
    </div>
  )
}

export default FacebookShareButton

