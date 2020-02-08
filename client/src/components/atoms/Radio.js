import MuiRadio from "@material-ui/core/Radio"
import React from "react"
import { withStyles } from "@material-ui/core/styles"

const styles = theme => ({
  radio: {

  }
})

function Radio({ classes, color, ...props }) {
  return <MuiRadio className={classes.radio} color={color} {...props} />
}

export default withStyles(styles)(Radio)
