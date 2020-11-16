import React, { useState } from "react"
import { navigate, Link } from "gatsby"

import { useDispatch, useSelector } from "react-redux"

import {
  Card,
  Container,
  Divider,
  Grid,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@material-ui/core"
import Steps from "../Steps"
import Image from "../Image"
import EditIcon from "@material-ui/icons/Edit"
import PaymentCard from "../PaymentCard"

const useStyles = makeStyles(theme => ({
  divideContainers: {
    marginBottom: 10,
  },
  textHeader: {
    fontSize: "1.3rem",
    color: "#3f3e3e",
  },
  textContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  iconButton: {
    cursor: "pointer",
    padding: 2,
  },
  orderContainer: {
    padding: "30px 24px ",
    background: "#f1f1f1",
    [theme.breakpoints.down("xs")]: {
      padding: "20px 8px ",
    },
  },
}))

const PlaceOrder = () => {
  const [coupon, setCoupon] = useState("")
  const classes = useStyles()
  const dispatch = useDispatch()
  const {
    cartItems,
    shippingAddress: { address, city, postalCode, country },
    paymentMethod,
  } = useSelector(state => state.cart)

  const loading = false
  const couponError = false

  // calculations
  const price = cartItems.reduce((a, i) => a + i.price * i.qty, 0).toFixed(2)
  const totalPrice = price < 100 ? parseFloat(price) + 10 : price

  const applyCouponHandle = () => {
    console.log("coupon", coupon)
  }

  const placeOrderHandle = () => {
    console.log("place")
  }

  return (
    <>
      <Container>
        <Steps activeStep={3} />
      </Container>
      <Container className={classes.orderContainer}>
        <Typography variant="h1">PLACE ORDER</Typography>
        <Grid container spacing={2} style={{ marginTop: 30 }}>
          <Grid item md={8} sm={12} xs={12}>
            <Card style={{ padding: "20px 10px" }}>
              <div className={classes.divideContainers}>
                <div className={classes.textContainer}>
                  <Typography className={classes.textHeader} variant="h2">
                    SHIPPING ADDRESS
                  </Typography>
                  <Link to="/shipping?redirect=placeOrder">
                    <EditIcon className={classes.iconButton} />
                  </Link>
                </div>
                <Divider style={{ marginBottom: 10 }} />
                <Typography variant="caption" component="div">
                  {address}
                </Typography>
                <Typography variant="caption" component="div">
                  {city}
                </Typography>
                <Typography variant="caption" component="div">
                  {postalCode}
                </Typography>
                <Typography variant="caption" component="div">
                  {country}
                </Typography>
              </div>
              <div className={classes.divideContainers}>
                <Typography className={classes.textHeader} variant="h2">
                  PAYMENT METHOD
                </Typography>
                <Divider style={{ marginBottom: 10 }} />
                <Typography variant="caption">{paymentMethod}</Typography>
              </div>
              <div>
                <Typography className={classes.textHeader} variant="h2">
                  ORDER
                </Typography>
                <Divider style={{ marginBottom: 10 }} />
                <TableContainer>
                  <Table>
                    <TableBody>
                      {cartItems.map(item => (
                        <TableRow key={item.product}>
                          <TableCell style={{ width: 100, padding: 8 }}>
                            <Link
                              to={`/product/${item.product}?goBack=placeOrder`}
                            >
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
                              to={`/product/${item.product}?backLink=placeOrder`}
                            >
                              {item.name}
                            </Link>
                          </TableCell>
                          <TableCell align="right">
                            {item.qty} x ${item.price}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </Card>
          </Grid>
          <Grid item md={4} sm={12} xs={12}>
            <PaymentCard
              title={"ORDER SUMMARY"}
              price={price}
              totalPrice={totalPrice}
              loading={loading}
              btnText={"PLACE ORDER"}
              btnHandle={placeOrderHandle}
              showCoupon
              coupon={coupon}
              setCoupon={setCoupon}
              applyCouponHandle={applyCouponHandle}
              error={couponError}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default PlaceOrder
