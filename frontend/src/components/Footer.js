import React from "react"
import { Typography } from "@material-ui/core"

const Footer = () => {
  return (
    <div
      style={{
        height: 60,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#343a40",
        maxWidth: "initial",
        color: "#fff",
        marginTop: 30,
      }}
    >
      <Typography variant="body2" align="center">
        © {new Date().getFullYear()} Gatsby Store by Artur Molenda
      </Typography>
    </div>
  )
}

export default Footer
