import React from "react"
import { Helmet } from "react-helmet"
import Favicon from "../../public/storeFavicon.png"
import { makeStyles } from "@material-ui/core"

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

const Layout = ({ children }) => {
  const classes = useStyles()
  return (
    <>
      <Helmet>
        <link rel="icon" href={Favicon} />
      </Helmet>
      <div className={classes.flexWrapper}>
        <div>
          <Navbar />
          {children}
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Layout
