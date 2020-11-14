import React from "react"
import Skeleton from "@material-ui/lab/Skeleton"
import { Card, CardContent, makeStyles, Typography } from "@material-ui/core"
import Image from "./Image"

const useStyles = makeStyles(() => ({
  text: {
    display: "flex",
  },
}))
const ProductSkeleton = () => {
  const classes = useStyles()
  const randomInt = (min, max) => {
    return min + Math.floor((max - min) * Math.random())
  }
  return (
    <Card>
      <div style={{ maxWidth: 300, position: "relative" }}>
        <div style={{ visibility: "hidden" }}>
          <Image alt="placeholder" filename={"productPlaceholder.jpg"} />
        </div>
        <Skeleton
          variant="rect"
          style={{
            position: "absolute",
            top: 0,
            height: "100%",
            width: "100%",
          }}
        />
      </div>
      <CardContent style={{ paddingTop: 8 }}>
        <Typography className={classes.text} variant="caption">
          <Skeleton variant="text" width={randomInt(29, 52)} />
        </Typography>
        <Typography
          className={classes.text}
          style={{ fontSize: "1.15rem" }}
          variant="h6"
        >
          <Skeleton variant="text" width={randomInt(29, 250)} />
        </Typography>
        <Typography className={classes.text} variant="h6">
          <Skeleton variant="text" width={randomInt(51, 85)} />
        </Typography>
      </CardContent>
    </Card>
  )
}

export default ProductSkeleton
