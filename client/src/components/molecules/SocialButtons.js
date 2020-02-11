import React from "react"

import TwitterShareButton from "../atoms/TwitterShareButton"
import FacebookShareButton from "../atoms/FacebookShareButton"
import HatenaShareButton from "../atoms/HatenaShareButton"

function SocialButtons({ ...props }) {
  return (
    <>
      <TwitterShareButton dataSize="large" />
      {" "}
      <FacebookShareButton dataSize="large" />
      {" "}
      <HatenaShareButton />
    </>
  )
}

export default SocialButtons
