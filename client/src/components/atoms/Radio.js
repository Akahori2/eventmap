import MuiRadio from "@material-ui/core/Radio"
import React from "react"
import { withStyles } from "@material-ui/core/styles"

const styles = theme => ({
  radio: {
    [theme.breakpoints.down("sm")]: {
      margin: "4px 10px 4px 12px"
    },
    [theme.breakpoints.up("sm")]: {
      margin: "10px 10px 6px 12px"
    },
    padding: "0px"
  }
})

function Radio({ classes, color, ...props }) {
  return <MuiRadio className={classes.radio} color={color} {...props} />
}

export default withStyles(styles)(Radio)
