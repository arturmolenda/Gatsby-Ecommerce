import React, { useState } from "react"
import { Link } from "gatsby"

import { dispatch, useDispatch, useSelector } from "react-redux"
import { addToCart, removeFromCart } from "../../redux/actions/cartActions"

import {
  Button,
  Card,
  Collapse,
  Grid,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete"
import Image from "../Image"
import QtySelect from "../QtySelect"
import { Alert } from "@material-ui/lab"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import ExpandLessIcon from "@material-ui/icons/ExpandLess"
const useStyles = makeStyles(theme => ({
  cartContainer: {
    padding: "10px 10px 40px",

    [theme.breakpoints.down("sm")]: {
      padding: "10px 0px 40px",
    },
  },
  checkoutTitle: {
    padding: "16px 10px 5px",
    border: "none",
    "& h1": {
      fontSize: "1.9rem",
      fontWeight: 600,
      margin: 0,
    },
  },
  couponContainer: {
    display: "flex",
    flexDirection: "column",
    padding: 10,
    marginTop: 16,
  },
  expandContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  expandIcon: {
    padding: 5,
    cursor: "pointer",
    fontSize: "2rem",
  },
}))

const Cart = () => {
  const [coupon, setCoupon] = useState("")
  const [expanded, setExpanded] = useState(false)
  const dispatch = useDispatch()
  const { productId: productLoading, cartItems } = useSelector(
    state => state.cart
  )

  const error = false

  const classes = useStyles()
  const price = cartItems.reduce((a, i) => a + i.price * i.qty, 0).toFixed(2)

  const applyCouponHandle = () => {
    console.log("coupon", coupon)
  }
  return (
    <div className={classes.cartContainer}>
      <h1>SHOPPING CART</h1>
      <Grid container spacing={2}>
        <Grid item md={8} sm={12}>
          {cartItems.length !== 0 ? (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell align="left">Product</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Ammount</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.map(item => (
                    <TableRow key={item.product}>
                      <TableCell style={{ width: 150, padding: 8 }}>
                        <Link to={`/product/${item.product}?goBack=cart`}>
                          <Image
                            alt={item.name}
                            filename={item.image}
                            customStyle={{ borderRadius: 6 }}
                          />
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link
                          className="underline"
                          to={`/product/${item.product}?backLink=cart`}
                        >
                          {item.name}
                        </Link>
                      </TableCell>
                      <TableCell align="right">${item.price}</TableCell>
                      <TableCell align="right">
                        <QtySelect
                          countInStock={item.countInStock}
                          value={item.qty}
                          changeHandle={e =>
                            dispatch(addToCart(item.product, e.target.value))
                          }
                          loading={productLoading === item.product}
                          customWidth={"50%"}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          onClick={() => dispatch(removeFromCart(item.product))}
                        >
                          <DeleteIcon />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Alert severity="info">
              Your cart is empty{" "}
              <Link to="/" style={{ color: "#000" }}>
                Go Back
              </Link>
            </Alert>
          )}
        </Grid>

        <Grid item md={4} sm={12} xs={12}>
          <TableContainer component={Card}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.checkoutTitle}>
                    <Typography variant="h1">Total</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Subtotal</TableCell>
                  <TableCell align="right">${price}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Delivery</TableCell>
                  <TableCell align="right">
                    {price >= 100 ? "Free" : "$10"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ fontWeight: 600 }}>
                    Total Price (tax included)
                  </TableCell>
                  <TableCell style={{ fontWeight: 600 }} align="right">
                    ${price >= 100 ? price : price + 10}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div style={{ padding: 10 }}>
              <Link to="/checkout">
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                  disabled={productLoading}
                >
                  Go to checkout
                </Button>
              </Link>
            </div>
          </TableContainer>
          <Card className={classes.couponContainer}>
            <div className={classes.expandContainer}>
              <Typography variant="caption">
                Add discount coupon (optional)
              </Typography>
              {expanded ? (
                <ExpandLessIcon
                  className={classes.expandIcon}
                  onClick={() => setExpanded(false)}
                />
              ) : (
                <ExpandMoreIcon
                  className={classes.expandIcon}
                  onClick={() => setExpanded(true)}
                />
              )}
            </div>
            <Collapse in={expanded}>
              <TextField
                fullWidth
                type="text"
                label="Coupon"
                variant="outlined"
                margin="dense"
                value={coupon}
                onChange={e => setCoupon(e.target.value)}
                style={{ marginBottom: 10 }}
              />
              {coupon.length !== 0 && !error && (
                <Button
                  fullWidth
                  variant="outlined"
                  color="primary"
                  onClick={applyCouponHandle}
                >
                  Apply
                </Button>
              )}
              {error && <Alert variant="error">{error}</Alert>}
            </Collapse>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}

export default Cart
