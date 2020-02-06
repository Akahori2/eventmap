import MuiFormControlLabel from "@material-ui/core/FormControlLabel"
import React from "react"
import { withStyles } from "@material-ui/core/styles"

const styles = theme => ({
  radioLabel: {
    color: theme.palette.text.primary
  }
})

function FormControlLabel({ classes, label, ...props }) {
  return (
    <MuiFormControlLabel
      label={<span className={classes.radioLabel}>{label}</span>}
      {...props}
    />
  )
}

export default withStyles(styles)(FormControlLabel)
