import React from "react"

import { Provider } from "react-redux"
import store from "./redux/store"

import { CssBaseline } from "@material-ui/core"
import { ThemeProvider } from "@material-ui/core/styles"
import { createMuiTheme } from "@material-ui/core/styles"
import Layout from "./components/Layout"

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#343a40",
      light: "#484848",
      dark: "#191919",
    },
    secondary: {
      main: "#f44336",
    },
    error: {
      main: "#f44336",
    },
    background: {
      default: "#fff",
    },
  },
})

export default ({ element }) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>{element}</Layout>
      </ThemeProvider>
    </Provider>
  )
}
