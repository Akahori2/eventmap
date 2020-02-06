import MuiButton from "@material-ui/core/Button"
import React from "react"
import { withStyles } from "@material-ui/core/styles"

const styles = theme => ({
  button: {
    height: "40px",
    boxShadow: "none",
    marginLeft: "2px",

    [theme.breakpoints.down("sm")]: {
      maxWidth: "36px",
      minWidth: "36px",
      maxHeight: "40px",
      minHeight: "40px"
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
