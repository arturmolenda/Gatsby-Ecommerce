import React, { useEffect, useState } from "react"

import { useDispatch, useSelector } from "react-redux"

import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core"
import { Alert, Rating as MuiRating } from "@material-ui/lab"
import CloseIcon from "@material-ui/icons/Close"
import RateReviewIcon from "@material-ui/icons/RateReview"

import Image from "../Image"
import Rating from "../Rating"

import moment from "moment"
import Loader from "../Loader"
import { createProductReview } from "../../redux/actions/productActions"
import Login from "../screens/Login"

const useStyles = makeStyles(() => ({
  reviewsContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: 40,
  },
  reviewsHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  reviewsActions: {
    display: "flex",
    justifyContent: "space-between",
  },
  addReviewBtn: {
    color: "#000",
    border: "2px solid #343a40",
    backgroundColor: "#fff",
    transition: "0.2s ease",
    marginRight: 10,
    "&:hover": {
      color: "#fff",
      backgroundColor: "#343a40",
    },
  },
  dialogContainer: {
    "& .MuiDialog-paper": {
      width: "100%",
      paddingBottom: 10,
      position: "relative",
    },
  },
  dialogExitBtn: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  dialogContent: {
    display: "flex",
    flexDirection: "column",
  },
  emptyContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 20,
  },
}))

const ProductReviews = ({ productData, newRatingCb }) => {
  const dispatch = useDispatch()
  const [product, setProduct] = useState(null)
  const [score, setScore] = useState(null)
  const [scoreError, setScoreError] = useState("")
  const [comment, setComment] = useState("")
  const [addReviewOpen, setAddReviewOpen] = useState(false)
  const [readReviewsOpen, setReadReviewsOpen] = useState(false)
  const classes = useStyles()

  const { loading, success, newProduct, error } = useSelector(
    state => state.productReviewCreate
  )
  const { userInfo } = useSelector(state => state.userLogin)

  useEffect(() => {
    if (success && newProduct) {
      setProduct({ ...newProduct, isReviewed: true })
      setScore(null)
      setComment("")
      setAddReviewOpen(false)
      newRatingCb(newProduct.rating, newProduct.reviews, newProduct.numReviews)
    }
    // eslint-disable-next-line
  }, [success, newProduct])

  useEffect(() => {
    if (productData.reviews.length !== 0 && userInfo) {
      const isReviewed = productData.reviews.find(
        review => review.user === userInfo._id
      )
      console.log(isReviewed)
      if (isReviewed) setProduct({ ...productData, isReviewed: true })
      else setProduct(productData)
    } else setProduct(productData)
    // eslint-disable-next-line
  }, [userInfo])

  const reviewChange = e => {
    if (e.target.value.length <= 200) setComment(e.target.value)
  }

  const scoreChange = (e, newScore) => {
    setScore(newScore)
    if (scoreError && newScore !== null) setScoreError("")
  }

  const submitHandle = () => {
    console.log(score, scoreError)
    if (score === null) setScoreError("This field is required!")
    else dispatch(createProductReview(product._id, { rating: score, comment }))
  }

  return (
    product && (
      <>
        <div className={classes.reviewsContainer}>
          <div className={classes.reviewsHeader}>
            <Typography variant="h5">
              {parseFloat(product.rating).toFixed(1)}
              <span style={{ color: "#66676e" }}>/5</span>
              <Typography variant="caption">
                {" "}
                reviews({product.numReviews})
              </Typography>
            </Typography>
            <Rating rating={product.rating} color={"#1a1a1a"} />
          </div>
          <div className={classes.reviewsActions}>
            <Button
              className={classes.addReviewBtn}
              size="large"
              fullWidth
              onClick={() => setAddReviewOpen(true)}
            >
              Add Review
            </Button>
            <Button
              color="primary"
              variant="contained"
              size="large"
              fullWidth
              onClick={() => setReadReviewsOpen(true)}
            >
              Read Reviews
            </Button>
          </div>
        </div>
        <Dialog
          open={addReviewOpen}
          onClose={() => setAddReviewOpen(false)}
          className={classes.dialogContainer}
        >
          {userInfo ? (
            <>
              <DialogTitle disableTypography>
                {!product.isReviewed && (
                  <Typography variant="h6" style={{ marginRight: 40 }}>
                    What do you think about this product?
                  </Typography>
                )}
                <IconButton
                  className={classes.dialogExitBtn}
                  onClick={() => setAddReviewOpen(false)}
                >
                  <CloseIcon />
                </IconButton>
              </DialogTitle>
              <DialogContent>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", marginBottom: 20 }}>
                    <div style={{ minWidth: 150, maxWidth: 150 }}>
                      <Image
                        alt={product.name}
                        filename={
                          product.images.length > 0 && product.images[0].image
                        }
                        customStyle={{ borderRadius: 6 }}
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginLeft: 10,
                      }}
                    >
                      <Typography variant="caption">{product.brand}</Typography>
                      <Typography variant="caption" style={{ fontWeight: 600 }}>
                        {product.name}
                      </Typography>
                    </div>
                  </div>
                  {!product.isReviewed ? (
                    <>
                      <div style={{ marginBottom: 20 }}>
                        <Typography variant="caption" component="div">
                          Review product
                        </Typography>
                        <MuiRating
                          name="controlled"
                          value={score}
                          onChange={(e, val) => scoreChange(e, val)}
                        />
                        {scoreError && (
                          <Typography
                            variant="caption"
                            color="secondary"
                            component="div"
                          >
                            {scoreError}
                          </Typography>
                        )}
                      </div>
                      <TextField
                        variant="filled"
                        label={`Review ${comment.length}/200 (optional)`}
                        placeholder="What's your experience this product?"
                        value={comment}
                        multiline
                        rows={4}
                        onChange={reviewChange}
                        style={{ marginBottom: 20 }}
                      />
                      {error && (
                        <Alert severity="info" style={{ marginBottom: 10 }}>
                          {error}
                        </Alert>
                      )}
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        size="large"
                        onClick={submitHandle}
                        disabled={loading}
                      >
                        Submit
                        {loading && <Loader button />}
                      </Button>
                    </>
                  ) : (
                    <>
                      <Alert severity="success" style={{ marginBottom: 10 }}>
                        Product already reviewed. Thank you!
                      </Alert>
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        size="large"
                        onClick={() => setAddReviewOpen(false)}
                        disabled={loading}
                      >
                        Continue shopping
                      </Button>
                    </>
                  )}
                </div>
              </DialogContent>
            </>
          ) : (
            <div style={{ padding: 30 }}>
              <Login productReviewLogin />
            </div>
          )}
        </Dialog>

        <Dialog
          open={readReviewsOpen}
          onClose={() => setReadReviewsOpen(false)}
          className={classes.dialogContainer}
        >
          <DialogTitle disableTypography>
            <Typography
              variant="h6"
              style={{ marginRight: 40, fontWeight: 600 }}
              component="div"
            >
              Reviews ({product.numReviews})
            </Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 25,
              }}
            >
              <Typography variant="h5">
                {parseFloat(product.rating).toFixed(1)}
                <span style={{ color: "#66676e" }}>/5</span>
              </Typography>
              <Rating rating={product.rating} color={"#1a1a1a"} />
            </div>
            <IconButton
              className={classes.dialogExitBtn}
              onClick={() => setReadReviewsOpen(false)}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <Divider />
          <DialogContent>
            {product.reviews.length > 0 ? (
              product.reviews.map((review, index) => (
                <div key={index}>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <Typography variant="h6" style={{ fontWeight: 600 }}>
                        {review.name}
                      </Typography>
                      <Typography variant="caption">
                        Reviewed at: {moment(review.createdAt).format("L")}
                      </Typography>
                      <Rating rating={product.rating} color={"#1a1a1a"} />
                      <Typography variant="body1">{review.comment}</Typography>
                    </div>
                    <div style={{ minWidth: 150, maxWidth: 150 }}>
                      <Image
                        alt={product.name}
                        filename={
                          product.images.length > 0 && product.images[0].image
                        }
                        customStyle={{ borderRadius: 6 }}
                      />
                    </div>
                  </div>
                  <Divider style={{ margin: "15px 0" }} />
                </div>
              ))
            ) : (
              <div className={classes.emptyContainer}>
                <RateReviewIcon
                  style={{ width: 100, height: 100, marginBottom: 20 }}
                />
                <Alert
                  severity="info"
                  variant="standard"
                  style={{ alignItems: "center", backgroundColor: "#c1e3fc" }}
                >
                  There are no visible reviews
                </Alert>
                <Button
                  color="primary"
                  variant="contained"
                  style={{ marginTop: 20 }}
                  onClick={() => setReadReviewsOpen(false)}
                >
                  Close
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </>
    )
  )
}

export default ProductReviews
