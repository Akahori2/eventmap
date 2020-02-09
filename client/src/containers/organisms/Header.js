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

import * as STYLE_DATA from "../../utils/styleData"

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    height: STYLE_DATA.HEADER_HEIGHT,
  },
  toolbar: {
    display: "flex",
    alignItems: "flex-start",
    height: STYLE_DATA.HEADER_HEIGHT,
  },
  headerButton: {
    marginTop: "2px"
  },
})

function Header({ classes, actions }) {
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar} variant="dense">
        <Typography variant="h1" color="inherit">
          EVENT MAP!
        </Typography>
        {/* <div className={classes.headerButton}> */}
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
        {/* </div> */}
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
