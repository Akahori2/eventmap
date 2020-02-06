import MuiTypography from "@material-ui/core/Typography"
import React from "react"
import { withStyles } from "@material-ui/core/styles"

const styles = theme => ({
  typography: {
    fontFamily: "Passero One",
    fontSize: "2em",
    flexGrow: "1",
    marginTop: "5px",
    height: "40px"
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
