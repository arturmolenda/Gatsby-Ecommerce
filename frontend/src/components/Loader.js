import { CircularProgress } from "@material-ui/core"
import React from "react"

const Loader = ({ button }) => {
  return (
    <CircularProgress
      style={
        button && {
          width: 26,
          height: 26,
          position: "absolute",
          top: "calc(50% - 13px)",
          left: "calc(50% - 13px)",
        }
      }
    />
  )
}

export default Loader
