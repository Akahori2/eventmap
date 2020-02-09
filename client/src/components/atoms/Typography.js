import MuiTypography from "@material-ui/core/Typography"
import React from "react"
import { withStyles } from "@material-ui/core/styles"
import * as STYLE_DATA from "../../utils/styleData"

const styles = theme => ({
  typography: {
    fontFamily: "Passero One",
    fontSize: "2em",
    flexGrow: "1",
    marginTop: "5px",
    height: STYLE_DATA.HEADER_HEIGHT
  }
})

function Radio({ classes, children, ...props }) {
  return (
    <MuiTypography className={classes.typography} {...props}>
      {children}
    </MuiTypography>
  )
}

export default withStyles(styles)(Radio)
