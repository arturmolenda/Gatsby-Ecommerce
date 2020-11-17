import React, { useEffect, useState } from "react"
import { navigate } from "gatsby"
import { useDispatch, useSelector } from "react-redux"

import {
  Button,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@material-ui/core"

import Steps from "../Steps"
import { savePaymentMethod } from "../../redux/actions/cartActions"

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("PayPal")
  const dispatch = useDispatch()
  const { userInfo } = useSelector(state => state.userLogin)
  const { cartItems, shippingAddress } = useSelector(state => state.cart)
  useEffect(() => {
    if (!userInfo) navigate("/login")
    else if (Object.keys(shippingAddress).length === 0) navigate("/shipping")
    else if (cartItems.length === 0) navigate("/cart")
  }, [userInfo, shippingAddress, cartItems])

  const submitHandle = e => {
    e.preventDefault()
    if (paymentMethod) {
      dispatch(savePaymentMethod(paymentMethod))
      navigate("/placeOrder")
    }
  }

  return (
    userInfo &&
    cartItems.length !== 0 &&
    Object.keys(shippingAddress).length !== 0 && (
      <>
        <Steps activeStep={2} />
        <Grid container justify="center">
          <Grid item lg={4} md={6} sm={8} xs={8}>
            <Typography variant="h1">PAYMENT METHOD</Typography>
            <Typography
              variant="h5"
              style={{ color: "#66676e", marginTop: 30 }}
            >
              Select Method
            </Typography>
            <form onSubmit={submitHandle}>
              <RadioGroup
                value={paymentMethod}
                onChange={e => setPaymentMethod(e.target.value)}
              >
                <FormControlLabel
                  label="PayPal or Credit Card"
                  value="PayPal"
                  control={<Radio color="default" />}
                />
              </RadioGroup>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginTop: 15 }}
              >
                Continue
              </Button>
            </form>
          </Grid>
        </Grid>
      </>
    )
  )
}

export default Payment
