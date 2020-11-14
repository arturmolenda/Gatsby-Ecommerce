import React from "react"
import { Link } from "gatsby"
import Image from "../Image"
import { Card, CardContent, Typography, makeStyles } from "@material-ui/core"
const useStyles = makeStyles(() => ({
  cardContainer: {
    position: "relative",
    transition: "top .2s ease",
    top: 0,
    "&:hover": {
      top: -2,
    },
  },
  contentContainer: {
    paddingTop: 8,
  },
  textEllipsis: {
    whiteSpace: "nowrap",
    overflowX: "hidden",
    textOverflow: "ellipsis",
  },
}))
const ProductCard = ({ product }) => {
  const classes = useStyles()
  return (
    <>
      <Card className={classes.cardContainer}>
        <Link to={`/product/${product._id}`}>
          <div style={{ maxWidth: 300 }}>
            <Image alt={product.name} filename={product.images[0].image} />
          </div>
          <CardContent className={classes.contentContainer}>
            <Typography className={classes.textEllipsis} variant="caption">
              {product.brand}
            </Typography>
            <Typography
              className={classes.textEllipsis}
              style={{ fontSize: "1.15rem" }}
              variant="h6"
            >
              {product.name}
            </Typography>
            <Typography variant="h6">${product.price}</Typography>
          </CardContent>
        </Link>
      </Card>
    </>
  )
}

export default ProductCard
