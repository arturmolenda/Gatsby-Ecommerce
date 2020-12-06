import React from "react"
import { Link, navigate } from "gatsby"

import { useDispatch, useSelector } from "react-redux"
import { addToCart, removeFromCart } from "../../redux/actions/cartActions"

import {
  Button,
  Grid,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete"
import Image from "../Image"
import QtySelect from "../QtySelect"
import { Alert } from "@material-ui/lab"
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart"
import PaymentCard from "../PaymentCard"

const useStyles = makeStyles(theme => ({
  cartContainer: {
    padding: "10px 10px 40px",

    [theme.breakpoints.down("sm")]: {
      padding: "10px 0px 40px",
    },
  },
  productsTableFix: {
    [theme.breakpoints.down("xs")]: {
      display: "initial",
    },
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

const Cart = () => {
  const dispatch = useDispatch()
  const { productId: productLoading, cartItems } = useSelector(
    state => state.cart
  )

  const classes = useStyles()

  // calculations
  const price = cartItems.reduce((a, i) => a + i.price * i.qty, 0).toFixed(2)
  const totalPrice = price < 100 ? parseFloat(price) + 10 : price

  const checkoutHandle = () => {
    navigate("/login?redirect=shipping")
  }
  return (
    <div className={classes.cartContainer}>
      <Typography variant="h1" style={{ margin: "18px 0" }}>
        SHOPPING CART
      </Typography>
      <Grid container spacing={2} className={classes.productsTableFix}>
        {cartItems.length !== 0 ? (
          <>
            <Grid item md={8} sm={12}>
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
                            onClick={() =>
                              dispatch(removeFromCart(item.product))
                            }
                          >
                            <DeleteIcon />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item md={4} sm={12} xs={12}>
              <PaymentCard
                title={"TOTAL PRICE"}
                price={price}
                totalPrice={totalPrice}
                loading={productLoading}
                btnText={"GO TO CHECKOUT"}
                btnHandle={checkoutHandle}
              />
            </Grid>
          </>
        ) : (
          <div className={classes.emptyContainer}>
            <AddShoppingCartIcon
              style={{ width: 100, height: 100, marginBottom: 20 }}
            />
            <Alert
              severity="info"
              variant="standard"
              style={{ alignItems: "center", backgroundColor: "#c1e3fc" }}
            >
              Your shopping cart is empty, add something and come back again!
            </Alert>
            <Link to="/">
              <Button
                color="primary"
                variant="contained"
                style={{ marginTop: 20 }}
              >
                Browse products
              </Button>
            </Link>
          </div>
        )}
      </Grid>
    </div>
  )
}

export default Cart
