import React from "react"
import { withStyles } from "@material-ui/core/styles"

const styles = theme => ({
  year: {
    marginRight: "5px"
  }
})

function Copyright({ classes, color, ...props }) {
  return (
    <>
      <span className={classes.year}>© 2019-2020</span>
      <a
        href="https://twitter.com/akahori_s"
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "none" }}
      >
        @akahori_s
      </a>
    </>
  )
}

export default withStyles(styles)(Copyright)





