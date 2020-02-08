import React from "react"
import { withStyles } from "@material-ui/core/styles"

const styles = theme => ({
  iconImage: {
    verticalAlign: "baseline",
  }
})

function ConnpassIcon({ classes, ...props }) {
  return (
    <img src="./connpass_logo_4.png" alt="connpassのロゴ" className="iconImage"/>
  )
}

export default withStyles(styles)(ConnpassIcon)