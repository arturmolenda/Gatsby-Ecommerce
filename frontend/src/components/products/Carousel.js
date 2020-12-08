import React, { useState } from "react"
import { navigate } from "gatsby"

import Slider from "infinite-react-carousel"

import { makeStyles, Typography } from "@material-ui/core"

import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos"
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos"

import Image from "../Image"
import ProductLabels from "./ProductLabels"
import Rating from "../Rating"

const useStyles = makeStyles(theme => ({
  imageContainer: {
    position: "relative",
  },
  productDetails: {
    position: "absolute",
    top: 0,
    padding: "50px 40px",
    fontSize: "1rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.85rem",
      padding: "30px 15px",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.6rem",
      padding: "20px 10px",
    },
  },
  productLink: {
    cursor: "pointer",
    position: "absolute",
    top: "15%",
    left: "15%",
    bottom: "15%",
    right: "15%",
  },
}))

const Carousel = ({ products }) => {
  const classes = useStyles()
  const [dragging, setDragging] = useState(false)

  const navigateHandle = (e, id) => {
    if (dragging) e.stopPropagation()
    else navigate(`/product/${id}`)
  }

  return (
    products.length !== 0 && (
      <Slider
        pauseOnHover
        autoplay
        autoplaySoeed={4000}
        duration={80}
        accessibility
        pauseOnHover
        beforeChange={() => setDragging(true)}
        afterChange={() => setDragging(false)}
        prevArrow={
          <div>
            <ArrowBackIosIcon />
          </div>
        }
        nextArrow={
          <div>
            <ArrowForwardIosIcon />
          </div>
        }
        dots
      >
        {products.map(product => (
          <div key={product._id} className={classes.imageContainer}>
            <Image alt={product.name} filename={product.images[0].image} />
            <ProductLabels
              labels={product.labels}
              discount={product.discount}
            />
            <div
              className={classes.productLink}
              onClickCapture={e => navigateHandle(e, product._id)}
            />
            <div
              className={classes.productDetails}
              style={{ cursor: "pointer" }}
            >
              <div onClickCapture={e => navigateHandle(e, product._id)}>
                <Typography variant="caption" style={{ fontSize: "1.25em" }}>
                  {product.brand}
                </Typography>
                <Typography
                  variant="h2"
                  style={{ fontSize: "3.75em", fontWeight: 600 }}
                >
                  {product.name}
                </Typography>
                <Typography
                  variant="h6"
                  style={{
                    fontSize: "1.5em",
                    fontWeight: 600,
                    color: "#3e3e3e",
                  }}
                >
                  {product.discount &&
                  product.discount.amount > 0 &&
                  product.discount.expireDate > new Date().toISOString() ? (
                    <>
                      <span
                        style={{
                          fontWeight: 600,
                          marginRight: 8,
                          color: "#eb0037",
                        }}
                      >
                        ${product.discount.totalPrice}
                      </span>
                      <span style={{ textDecoration: "line-through" }}>
                        ${parseFloat(product.price).toFixed(2)}
                      </span>
                    </>
                  ) : (
                    `$${parseFloat(product.price).toFixed(2)}`
                  )}
                </Typography>
                <Rating
                  rating={product.rating}
                  color="#1a1a1a"
                  style={{ marginTop: 10 }}
                />
              </div>
            </div>
          </div>
        ))}
      </Slider>
    )
  )
}

export default Carousel
