import React, { useState } from "react"

import Slider from "infinite-react-carousel"

import { Button, makeStyles } from "@material-ui/core"

import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos"
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos"

import Image from "../Image"

const useStyles = makeStyles(() => ({
  container: {
    position: "relative",
    width: "80%",
    margin: "0 auto",
  },
}))

const Carousel = ({ products }) => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      {products.length !== 0 && (
        <Slider
          pauseOnHover
          autoplay
          accessibility
          wheel
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
            <div key={product._id}>
              <Image alt={product.name} filename={product.images[0].image} />
            </div>
          ))}
        </Slider>
      )}
    </div>
  )
}

export default Carousel
