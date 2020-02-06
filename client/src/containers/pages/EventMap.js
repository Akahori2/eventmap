import React, { Component } from "react"
import SearchForm from "../organisms/SearchForm"
import Map from "../organisms/Map"

import { bindActionCreators } from "redux"

import TermsOfServiceDialog from "../organisms/TermsOfServiceDialog"
import HowToUseDialog from "../organisms/HowToUseDialog"
import SettingsDialog from "../organisms/SettingsDialog"

import { withStyles } from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import Drawer from "@material-ui/core/Drawer"

import * as actions from "../../actions/"

import { compose } from "redux"
import { connect } from "react-redux"

import Header from "../organisms/Header"

import withWidth, { isWidthUp } from "@material-ui/core/withWidth"

const drawerWidthPC = 255

const styles = theme => ({
  root: {
    color: theme.palette.text.primary
  },
  drawerPaper: {
    [theme.breakpoints.down("sm")]: {
      width: "100vw"
    },
    [theme.breakpoints.up("sm")]: {
      width: drawerWidthPC
    }
  },
  content: {
    flexGrow: 1
  },
  map: {
    [theme.breakpoints.up("sm")]: {
      paddingLeft: drawerWidthPC
    },
    paddingTop: "40px"
  }
})

class EventMap extends Component {
  render() {
    const { classes, width, form, header } = this.props
    return (
      <div className={classes.root}>
        <CssBaseline />
        <Header />

        <main className={classes.content}>
          <Drawer
            //一定サイズのタブレット以上だと常にDrawer表示する
            open={isWidthUp("sm", width) ? true : form.drawerOpen}
            variant="persistent"
            classes={{
              paper: classes.drawerPaper
            }}
          >
            <div className={classes.toolbar} />
            <SearchForm />
          </Drawer>

          <div className={classes.map}>
            <Map
              id="myMap"
              //ここでもオプション入れられるけど入れない
              onMapLoad={map => {}}
            />
          </div>
        </main>

        {header.termsOfServiceDialogOpen && <TermsOfServiceDialog />}
        {header.howToUseDialogOpen && <HowToUseDialog />}
        {header.settingsDialogOpen && <SettingsDialog />}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  form: state.form,
  header: state.header
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
})

export default compose(
  withStyles(styles),
  withWidth(),
  connect(mapStateToProps, mapDispatchToProps)
)(EventMap)
