import React from "react"
import { withStyles } from "@material-ui/core/styles"

import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "../../components/atoms/Typography"
// import Button from '@material-ui/core/Button'

import MailIcon from "@material-ui/icons/Mail"
import HelpIcon from "@material-ui/icons/Help"
import SettingsIcon from "@material-ui/icons/Settings"

import { compose } from "redux"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"

import * as actions from "../../actions/"
import HeaderButton from "../../components/atoms/HeaderButton"

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    height: "40px"
  },
  toolbar: {
    display: "flex",
    alignItems: "flex-start",

    [theme.breakpoints.down("sm")]: {
      height: "50px"
    },
    [theme.breakpoints.up("sm")]: {
      height: "40px"
    }
  }
})

function Header({ classes, actions }) {
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar} variant="dense">
        <Typography variant="h1" color="inherit">
          EVENT MAP!
        </Typography>
        <HeaderButton
          icon={<SettingsIcon />}
          onClickAction={() => {
            actions.changeSettingsDialogOpen(true)
          }}
        />
        <HeaderButton
          icon={<HelpIcon />}
          onClickAction={() => {
            actions.changeHowToUseDialogOpen(true)
          }}
        />
        <HeaderButton
          icon={<MailIcon />}
          onClickAction={() =>
            window.open("https://goo.gl/forms/4L4LAoTdsVs0vbHp2", "_blank")
          }
        />
      </Toolbar>
    </AppBar>
  )
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
})

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(Header)
