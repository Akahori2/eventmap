import React from "react"
import { Provider } from "react-redux"

import store from "./store"

import "./styles/index.css"
import EventMap from "./containers/pages/EventMap"
import * as serviceWorker from "./serviceWorker"

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles"

//IE対応
import es6Promise from "es6-promise"
es6Promise.polyfill()

const theme = createMuiTheme({
  //デフォルトのカラーセット
  palette: {
    type: "light",
    primary: {
      //indigo
      main: "#3f51b5"
    },
    secondary: {
      //deeppurple
      main: "#ec6c00"
    }
  },
  //新しいバージョンでは記述必須となった
  typography: {
    useNextVariants: true
  },
  breakpoints: {
    keys: ["xs", "sm", "md", "lg", "xl"],
    values: {
      xs: 360, // スマホ用
      sm: 768, // タブレット用
      md: 992, // PC用
      lg: 1000000000,
      xl: 1000000000
    }
  }
})

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <EventMap />
        </MuiThemeProvider>
      </Provider>
    )
  }
}

serviceWorker.register()

export default App
