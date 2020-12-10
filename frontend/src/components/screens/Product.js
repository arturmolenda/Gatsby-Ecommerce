import React, { useState, useEffect } from "react"
import { Link } from "gatsby"

import { useDispatch, useSelector } from "react-redux"
import { addToCart } from "../../redux/actions/cartActions"
import { getProductDetails } from "../../redux/actions/productActions"

import {
  Button,
  Divider,
  Grid,
  makeStyles,
  Snackbar,
  Typography,
} from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"
import AddIcon from "@material-ui/icons/Add"

import Image from "../Image"
import Loader from "../Loader"
import Rating from "../Rating"
import QtySelect from "../QtySelect"
import ProductLabels from "../products/ProductLabels"
import ProductReviews from "../products/ProductReviews"

const useStyles = makeStyles(theme => ({
  imageMiniature: {
    cursor: "pointer",
    [theme.breakpoints.down("sm")]: {
      width: 100,
      margin: "2px 10px 0 0 !important",
    },
    [theme.breakpoints.down("xs")]: {
      width: 70,
      display: "table",
    },
  },
  gridMobileFlex: {
    [theme.breakpoints.down("sm")]: {
      display: "flex",
    },
  },
  imgContainer: {
    position: "relative",
    display: "grid",
  },
  productActions: {
    ["@media (min-width: 1024px)"]: {
      marginLeft: "8%",
    },
  },
  actionsContainer: {
    marginTop: 40,
    "& button": {
      marginTop: "10px",
    },
  },
}))

const Product = ({ id, location, previewProduct }) => {
  const [product, setProduct] = useState()
  const [currentImage, setCurrentImage] = useState()
  const [quantity, setQuantity] = useState(1)
  const [successAlert, setSuccessAlert] = useState(false)
  const classes = useStyles()
  const dispatch = useDispatch()
  const { loading, product: currentProduct, error } = useSelector(
    state => state.productDetails
  )

  const backLink =
    location && location.search ? `/${location.search.split("=")[1]}` : "/"
  useEffect(() => {
    if (previewProduct && previewProduct._id === id) {
      setProduct(previewProduct)
      setCurrentImage(previewProduct.images[0])
    } else if (currentProduct && currentProduct._id === id) {
      setProduct(currentProduct)
      setCurrentImage(currentProduct.images[0])
    } else if (!loading) dispatch(getProductDetails(id))
  }, [dispatch, currentProduct, previewProduct, id])

  const hoverHandle = imgObj => {
    setCurrentImage(imgObj)
  }

  const addToCartHandle = () => {
    if (!previewProduct) {
      dispatch(addToCart(product._id, quantity))
      setSuccessAlert(true)
    }
  }

  const newRatingCb = rating => {
    setProduct({ ...product, rating })
  }

  console.log(backLink)
  return (
    <>
      {!previewProduct && (
        <Link to={backLink} replace>
          <Button startIcon={<ArrowBackIcon />} style={{ marginBottom: 10 }}>
            Go back
          </Button>
        </Link>
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        product && (
          <>
            <Grid
              container
              spacing={2}
              alignItems="flex-start"
              justify="flex-start"
            >
              <Grid
                container
                spacing={1}
                item
                md={8}
                sm={7}
                xs={12}
                wrap="wrap-reverse"
                alignItems="flex-end"
              >
                <Grid item md={2} sm={12} xs={12}>
                  <div className={classes.gridMobileFlex}>
                    {product.images.length > 1 &&
                      product.images.map((imgObj, index) => (
                        <div
                          onMouseEnter={() => hoverHandle(imgObj)}
                          className={classes.imageMiniature}
                          key={index}
                          style={{
                            marginTop: index !== 0 && 10,

                            outline:
                              currentImage.image === imgObj.image &&
                              "2px solid #4e4e4e",
                          }}
                        >
                          {previewProduct && imgObj.image ? (
                            imgObj.local ? (
                              <Image
                                alt={imgObj.description && imgObj.description}
                                filename={imgObj.image}
                              />
                            ) : (
                              <img
                                src={imgObj.blob ? imgObj.blob : imgObj.image}
                                style={{ width: "100%", display: "flex" }}
                              />
                            )
                          ) : (
                            <Image
                              alt={imgObj.description && imgObj.description}
                              filename={
                                imgObj.image
                                  ? imgObj.image
                                  : "productPlaceholder.jpg"
                              }
                            />
                          )}
                        </div>
                      ))}
                  </div>
                </Grid>
                <Grid
                  item
                  md={product.images.length > 1 ? 10 : 12}
                  sm={12}
                  xs={12}
                >
                  <div className={classes.imgContainer}>
                    {previewProduct && currentImage.image ? (
                      currentImage.local ? (
                        <Image
                          alt={
                            currentImage.description && currentImage.description
                          }
                          filename={currentImage.image}
                        />
                      ) : (
                        <img
                          src={
                            currentImage.blob
                              ? currentImage.blob
                              : currentImage.image
                          }
                          style={{ width: "100%" }}
                        />
                      )
                    ) : (
                      <Image
                        alt={
                          currentImage.description && currentImage.description
                        }
                        filename={
                          currentImage.image
                            ? currentImage.image
                            : "productPlaceholder.jpg"
                        }
                      />
                    )}
                    <ProductLabels
                      labels={product.labels}
                      discount={product.discount}
                    />
                  </div>
                </Grid>
              </Grid>
              <Grid item md={4} sm={5} xs={12}>
                <div className={classes.productActions}>
                  <Typography variant="h5" style={{ fontSize: "1.3rem" }}>
                    {product.brand}
                  </Typography>
                  <Typography
                    variant="h2"
                    style={{ fontSize: "2rem", fontWeight: 600 }}
                  >
                    {product.name}
                  </Typography>
                  <Typography style={{ marginTop: 6 }} variant="h6">
                    {product.discount &&
                    product.discount.amount > 0 &&
                    product.discount.expireDate > new Date().toISOString() ? (
                      <>
                        <span style={{ color: "#eb0037" }}>
                          <p style={{ margin: 0 }}>
                            - {product.discount.amount}%
                          </p>
                          <span style={{ fontWeight: 600, marginRight: 8 }}>
                            ${product.discount.totalPrice}
                          </span>
                        </span>
                        <span style={{ textDecoration: "line-through" }}>
                          ${parseFloat(product.price).toFixed(2)}
                        </span>
                      </>
                    ) : (
                      `$${parseFloat(product.price).toFixed(2)}`
                    )}
                    <Typography variant="caption"> (tax included)</Typography>
                  </Typography>
                  <div style={{ marginTop: 10 }}>
                    <Rating
                      rating={product.rating}
                      text={product.numReviews}
                      color="#1a1a1a"
                    />
                  </div>

                  <div className={classes.actionsContainer}>
                    <QtySelect
                      countInStock={product.countInStock}
                      label="Quantity"
                      value={quantity}
                      changeHandle={e => setQuantity(e.target.value)}
                      maxWidth
                    />
                    <Button
                      color="primary"
                      variant="contained"
                      size="large"
                      onClick={addToCartHandle}
                      fullWidth
                      startIcon={<AddIcon />}
                      disabled={product.countInStock < 1}
                    >
                      Add to cart
                    </Button>
                  </div>
                  <ProductReviews
                    productData={product}
                    newRatingCb={newRatingCb}
                  />
                </div>
              </Grid>
              <Divider style={{ margin: "20px 0", width: "100%" }} />
              <div>
                <Typography variant="body1">{product.description}</Typography>
              </div>
            </Grid>
            <Snackbar
              style={{ marginTop: 55 }}
              open={successAlert}
              autoHideDuration={1500}
              onClose={() => setSuccessAlert(false)}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <Alert style={{ backgroundColor: "#dcf9dc" }} severity="success">
                Item added to your cart!
              </Alert>
            </Snackbar>
          </>
        )
      )}
    </>
  )
}

export default Product
