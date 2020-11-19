import React, { useState } from "react"
import { navigate, Link } from "gatsby"

import { useDispatch, useSelector } from "react-redux"
import { applyDiscount } from "../../redux/actions/discountActions"

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
import { useEffect } from "react"
import { createOrder } from "../../redux/actions/orderActions"
import { Alert } from "@material-ui/lab"

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
  const [price, setPrice] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const classes = useStyles()
  const dispatch = useDispatch()

  const { userInfo } = useSelector(state => state.userLogin)
  const { loading, order, success, error } = useSelector(
    state => state.orderCreate
  )
  const {
    cartItems,
    shippingAddress: { address, city, postalCode, country },
    paymentMethod,
  } = useSelector(state => state.cart)
  let discount = useSelector(state => state.discountApply)

  // calculations and redirect
  useEffect(() => {
    if (!userInfo) navigate("/login")
    if (cartItems.length === 0) navigate("/cart")
    else {
      const itemsPrice = cartItems
        .reduce((a, i) => a + i.price * i.qty, 0)
        .toFixed(2)
      setPrice(itemsPrice)
      setTotalPrice(itemsPrice < 100 ? parseFloat(itemsPrice) + 10 : itemsPrice)
    }
  }, [userInfo, cartItems])

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`)
    }
  }, [success, order])

  const applyCouponHandle = () => {
    dispatch(applyDiscount(coupon, totalPrice))
  }

  const placeOrderHandle = () => {
    if (cartItems.length !== 0 && userInfo) {
      dispatch(
        createOrder({
          orderItems: cartItems,
          shippingAddress: {
            address,
            city,
            postalCode,
            country,
          },
          paymentMethod,
          price,
          totalPrice,
          shippingPrice: price < 100 ? 10 : 0,
          coupon: discount.couponInfo
            ? {
                code: discount.couponInfo.code,
                isPercent: discount.couponInfo.isPercent,
                amount: discount.couponInfo.amount,
              }
            : null,
        })
      )
    }
  }

  const couponChange = e => {
    setCoupon(e.target.value)
    discount.error = null
  }

  return (
    <>
      <Container>
        <Steps activeStep={3} />
      </Container>
      <Container className={classes.orderContainer}>
        <Typography variant="h1">PLACE ORDER</Typography>
        {error && <Alert severity="error">{error}</Alert>}
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
              btnText={"PLACE ORDER"}
              btnHandle={placeOrderHandle}
              loading={loading}
              showCoupon
              coupon={coupon}
              setCoupon={couponChange}
              applyCouponHandle={applyCouponHandle}
              couponError={discount.error}
              couponLoading={discount.loading}
              couponInfo={discount.couponInfo}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default PlaceOrder
