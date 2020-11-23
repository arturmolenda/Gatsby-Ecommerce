import React from "react"
import { Link } from "gatsby"
import Image from "../Image"
import { Card, CardContent, Typography, makeStyles } from "@material-ui/core"
const useStyles = makeStyles(() => ({
  cardContainer: {
    position: "relative",
    transition: "top .2s ease",
    top: 0,
    cursor: "pointer",
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
const ProductCard = ({ product, disableLink, sampleProduct }) => {
  const classes = useStyles()
  return (
    <>
      <Card
        className={classes.cardContainer}
        style={{
          filter: sampleProduct && "blur(1.5px)",
        }}
      >
        <div style={{ pointerEvents: disableLink && "none" }}>
          <Link to={`/product/${product._id}`}>
            <div style={{ position: "relative" }}>
              <div />
              {disableLink && product.images[0].image && !sampleProduct ? (
                product.images[0].local ? (
                  <Image
                    alt={product.name}
                    filename={product.images[0].image}
                  />
                ) : (
                  <img
                    src={
                      product.images[0].blob
                        ? product.images[0].blob
                        : product.images[0].image
                    }
                    style={{ width: "100%" }}
                  />
                )
              ) : (
                <Image
                  alt={product.name}
                  filename={
                    product.images[0].image
                      ? product.images[0].image
                      : "productPlaceholder.jpg"
                  }
                />
              )}
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
              <Typography variant="h6">
                ${parseFloat(product.price).toFixed(2)}
              </Typography>
            </CardContent>
          </Link>
        </div>
      </Card>
    </>
  )
}

export default ProductCard
