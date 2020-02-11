import React from "react"

function HatenaShareButton({ ...props }) {
  return (
    <a
      href="http://b.hatena.ne.jp/entry/"
      className="hatena-bookmark-button"
      data-hatena-bookmark-layout="basic"
      data-hatena-bookmark-width="20"
      data-hatena-bookmark-height="28"
      title="このエントリーをはてなブックマークに追加"
    >
      <img
        src="https://b.st-hatena.com/images/v4/public/entry-button/button-only@2x.png"
        alt="このエントリーをはてなブックマークに追加"
        width="20"
        height="20"
        style={{ border: "none" }}
      />
    </a>
  )
}

export default HatenaShareButton




