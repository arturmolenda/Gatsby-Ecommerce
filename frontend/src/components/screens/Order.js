import React, { useState, useEffect } from "react"
import { navigate, Link } from "gatsby"
import { Helmet } from "react-helmet"

import { useDispatch, useSelector } from "react-redux"
import {
  getOrderDetails,
  payOrder,
  shipOrder,
} from "../../redux/actions/orderActions"
import {
  ORDER_DETAILS_RESET,
  ORDER_PAY_RESET,
} from "../../redux/constants/orderConstants"

import {
  Button,
  Card,
  Container,
  Divider,
  Grid,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"

import axios from "axios"
import moment from "moment"

import Image from "../Image"
import PaymentCard from "../PaymentCard"
import Loader from "../Loader"

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

const Order = ({ id: orderId }) => {
  const [sdkReady, setSdkReady] = useState(false)
  const [tracking, setTracking] = useState("")
  const classes = useStyles()
  const dispatch = useDispatch()
  const { userInfo } = useSelector(state => state.userLogin)
  const { loading, order, error } = useSelector(state => state.orderDetails)
  const {
    shippingAddress: { address, city, postalCode, country },
    paymentMethod,
  } = useSelector(state => state.cart)
  const {
    loading: loadingPay,
    success: successPay,
    error: errorPay,
  } = useSelector(state => state.orderPay)
  const {
    loading: loadingShip,
    success: successShip,
    error: errorShip,
  } = useSelector(state => state.orderShip)

  useEffect(() => {
    if (!userInfo) navigate("/login")
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal")
      const script = document.createElement("script")
      script.type = "text/javascript"
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onload = () => setSdkReady(true)
      document.body.appendChild(script)
    }
    if (!order || successPay || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch(getOrderDetails(orderId))
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript()
      } else {
        setSdkReady(true)
      }
    }
  }, [userInfo, order, successPay])

  useEffect(() => {
    if (successShip) dispatch(getOrderDetails(orderId))
  }, [successShip])

  useEffect(() => {
    return () => {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: ORDER_DETAILS_RESET })
    }
  }, [])

  const successPaymentHandle = paymentResult => {
    dispatch(payOrder(orderId, paymentResult))
  }

  const markShipped = () => {
    dispatch(shipOrder(orderId, tracking))
  }

  return (
    <>
      <Helmet title={orderId ? `Order ${orderId}` : "Order"} />
      {userInfo && userInfo.isAdmin && (
        <Link to={"/admin/orders"}>
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
        <Container className={classes.orderContainer}>
          <Typography variant="h1" style={{ fontSize: "1.9rem" }}>
            ORDER {orderId}
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <Grid container spacing={2} style={{ marginTop: 30 }}>
            <Grid item md={8} sm={12} xs={12}>
              <Card style={{ padding: "23.5px 10px" }}>
                <div className={classes.divideContainers}>
                  <Typography className={classes.textHeader} variant="h2">
                    SHIPPING
                  </Typography>
                  <Divider style={{ marginBottom: 10 }} />
                  <Typography variant="caption" component="div">
                    <strong>Name:</strong> {order.user.name}
                  </Typography>
                  <Typography variant="caption" component="div">
                    <strong>Email:</strong> {order.user.email}
                  </Typography>
                  <Typography variant="caption" component="div">
                    <strong>Address:</strong>
                  </Typography>
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
                  {order.shipped ? (
                    <>
                      <Alert severity="info">
                        Parcel shipped at:{" "}
                        <strong>{moment(order.shippedAt).format("LLL")}</strong>
                        <br />
                        {order.tracking && (
                          <Typography variant="caption">
                            You can track your order{" "}
                            <a
                              href={order.tracking}
                              target="_blank"
                              style={{ color: "#000", fontWeight: 600 }}
                              className="underline"
                            >
                              here
                            </a>
                          </Typography>
                        )}
                      </Alert>
                    </>
                  ) : (
                    <Alert severity="error">Not shipped</Alert>
                  )}
                </div>
                <div className={classes.divideContainers}>
                  <Typography className={classes.textHeader} variant="h2">
                    PAYMENT METHOD
                  </Typography>
                  <Divider style={{ marginBottom: 10 }} />
                  <Typography variant="caption">{paymentMethod}</Typography>
                  {order.isPaid ? (
                    <Alert severity="info">
                      Paid at:{" "}
                      <strong>{moment(order.paidAt).format("LLL")}</strong>
                    </Alert>
                  ) : (
                    <Alert severity="error">Not paid</Alert>
                  )}
                </div>
                <div>
                  <Typography className={classes.textHeader} variant="h2">
                    ORDER
                  </Typography>
                  <Divider style={{ marginBottom: 10 }} />
                  <TableContainer>
                    <Table>
                      <TableBody>
                        {order.orderItems.map(item => (
                          <TableRow key={item.product}>
                            <TableCell style={{ width: 100, padding: 8 }}>
                              <Link
                                to={`/product/${item.product}?backLink=order/${orderId}`}
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
                                to={`/product/${item.product}?backLink=order/${orderId}`}
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
                price={order.price}
                totalPrice={order.totalPrice}
                loading={loading || loadingPay}
                couponInfo={order.coupon}
                payPalBtn={!order.isPaid || !successPay}
                isPaid={order.isPaid}
                sdkReady={sdkReady}
                btnHandle={successPaymentHandle}
              />
              {errorPay && <Alert severity="error">{errorPay}</Alert>}
              {userInfo && userInfo.isAdmin && (
                <Card style={{ marginTop: 20, padding: 10 }}>
                  <TextField
                    fullWidth
                    type="text"
                    variant="outlined"
                    label={
                      order.shipped
                        ? "Tracking Link"
                        : "Tracking Link (optional)"
                    }
                    margin="dense"
                    value={tracking}
                    onChange={e => setTracking(e.target.value)}
                    style={{ marginBottom: 10 }}
                  />
                  <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    size="large"
                    onClick={markShipped}
                    disabled={loadingShip}
                  >
                    {order.shipped ? "UPDATE TRACKING" : "MARK AS SHIPPED"}
                    {loadingShip && <Loader button />}
                  </Button>
                  {errorShip && (
                    <Alert severity="error" style={{ marginTop: 10 }}>
                      {errorShip}
                    </Alert>
                  )}
                </Card>
              )}
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  )
}

export default Order
