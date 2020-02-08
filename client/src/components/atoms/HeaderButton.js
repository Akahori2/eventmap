import MuiButton from "@material-ui/core/Button"
import React from "react"
import { withStyles } from "@material-ui/core/styles"

const styles = theme => ({
  button: {
    boxShadow: "none",

    [theme.breakpoints.down("sm")]: {
      maxWidth: "36px",
      minWidth: "36px",
      maxHeight: "38px",
      minHeight: "38px",
    }
  }
})

function HeaderButton({ classes, icon, onClickAction, ...props }) {
  return (
    <MuiButton
      className={classes.button}
      variant="contained"
      color="primary"
      onClick={onClickAction}
    >
      {icon}
    </MuiButton>
  )
}

export default withStyles(styles)(HeaderButton)
