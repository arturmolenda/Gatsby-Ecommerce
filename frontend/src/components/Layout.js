import { Container, makeStyles } from "@material-ui/core"
import React from "react"
import Footer from "./Footer"
import Navbar from "./Navbar"

const useStyles = makeStyles(() => ({
  flexWrapper: {
    display: "flex",
    minHeight: "100vh",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  main: { marginTop: "4vh" },
}))

const Layout = ({ children, location, path }) => {
  const classes = useStyles()
  console.log(location, path)
  return (
    <div className={classes.flexWrapper}>
      <div>
        <Navbar />
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default Layout
