import React from "react"

function TwitterShareButton({ dataSize, ...props }) {
  return (
    <a
      href="https://twitter.com/share?ref_src=twsrc%5Etfw"
      className="twitter-share-button"
      data-show-count="false"
      data-size={dataSize}
      data-related="akahori_s"
    >
      ツイート
    </a>
  )
}

export default TwitterShareButton