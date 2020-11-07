import React from "react"

import { CssBaseline } from "@material-ui/core"
import { ThemeProvider } from "@material-ui/core/styles"
import { createMuiTheme } from "@material-ui/core/styles"
import Layout from "./components/Layout"

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#323232",
      light: "#484848",
      dark: "#000000",
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

export default ({ element }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Layout>{element}</Layout>
  </ThemeProvider>
)
