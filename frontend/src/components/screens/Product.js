import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "gatsby"
import {
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  Select,
  Typography,
} from "@material-ui/core"
import { useEffect } from "react"
import { Alert } from "@material-ui/lab"
import { listProducts } from "../../redux/actions/productActions"
import Image from "../Image"
import Loader from "../Loader"
import Rating from "../Rating"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"
const useStyles = makeStyles(theme => ({
  imageMiniature: {
    cursor: "pointer",
    [theme.breakpoints.down("sm")]: {
      width: 100,
      margin: "2px 10px 0 0 !important",
    },
    [theme.breakpoints.down("xs")]: {
      width: 70,
    },
  },
  gridMobileFlex: {
    [theme.breakpoints.down("sm")]: {
      display: "flex",
    },
  },
  descriptionContainer: {
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
  select: {
    backgroundColor: "rgba(0,0,0,0.05)",
  },
}))

const Product = ({ id }) => {
  const [product, setProduct] = useState()
  const [currentImage, setCurrentImage] = useState()
  const [quantity, setQuantity] = useState(1)
  const classes = useStyles()
  const dispatch = useDispatch()
  const { loading, products, success, error } = useSelector(
    state => state.productList
  )
  console.log(loading, products, error)

  useEffect(() => {
    if (products.length !== 0) {
      const foundProduct = products.find(product => product._id === id)
      if (foundProduct) {
        setProduct(foundProduct)
        setCurrentImage(foundProduct.images[0])
      }
    } else if (products.length === 0) {
      console.log(products.length)
      dispatch(listProducts())
    }
  }, [dispatch, success])

  const hoverHandle = imgObj => {
    setCurrentImage(imgObj)
  }

  return (
    <>
      <Link to="/">
        <Button startIcon={<ArrowBackIcon />} style={{ marginBottom: 10 }}>
          Go back
        </Button>
      </Link>
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
              justify="center"
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
                          <Image
                            alt={imgObj.description}
                            filename={imgObj.image}
                          />
                        </div>
                      ))}
                  </div>
                </Grid>
                <Grid item md={10} sm={12} xs={12}>
                  <Image
                    alt={currentImage.description}
                    filename={currentImage.image}
                  />
                </Grid>
              </Grid>
              <Grid item md={4} sm={5} xs={12}>
                <div className={classes.descriptionContainer}>
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
                    ${product.price}{" "}
                    <Typography variant="caption">(tax included)</Typography>
                  </Typography>
                  <div style={{ marginTop: 10 }}>
                    <Rating
                      rating={product.rating}
                      text={product.numReviews}
                      color="#1a1a1a"
                    />
                  </div>

                  <div className={classes.actionsContainer}>
                    {product.countInStock >= 1 ? (
                      <FormControl variant="outlined" fullWidth>
                        <InputLabel>Quantity</InputLabel>
                        <Select
                          className={classes.select}
                          native
                          label="Quantity"
                          value={quantity}
                          onChange={e => setQuantity(e.target.value)}
                        >
                          {product.countInStock >= 5
                            ? [...Array(6).keys()].map(
                                (val, i) =>
                                  i !== 0 && <option value={val}>{val}</option>
                              )
                            : [...Array(product.countInStock).keys()].map(
                                (val, i) =>
                                  i !== 0 && <option value={val}>{val}</option>
                              )}
                        </Select>
                      </FormControl>
                    ) : (
                      <Alert severity="warning">Out of stock</Alert>
                    )}
                    <Button
                      color="primary"
                      variant="contained"
                      size="large"
                      fullWidth
                      disabled={product.countInStock < 1}
                    >
                      Add to cart
                    </Button>
                  </div>
                </div>
              </Grid>
              <div>
                <Divider style={{ margin: "20px 0" }} />
                <Typography variant="body1">{product.description}</Typography>
              </div>
            </Grid>
          </>
        )
      )}
    </>
  )
}

export default Product
