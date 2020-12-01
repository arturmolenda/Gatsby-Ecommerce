import React, { useState, useEffect } from "react"
import { navigate } from "gatsby"

import { useDispatch, useSelector } from "react-redux"

import Steps from "../Steps"
import { Button, Grid, TextField, Typography } from "@material-ui/core"
import { saveShippingAddress } from "../../redux/actions/cartActions"

const Shipping = ({ location }) => {
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [country, setCountry] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const nextPage = location.search
    ? `/${location.search.split("=")[1]}`
    : "/payment"

  const dispatch = useDispatch()

  const { userInfo } = useSelector(state => state.userLogin)
  const { cartItems, shippingAddress } = useSelector(state => state.cart)
  useEffect(() => {
    console.log(userInfo, cartItems)
    if (!userInfo) navigate("/")
    else if (cartItems.length === 0) navigate("/cart")
    if (shippingAddress && Object.keys(shippingAddress).length === 4) {
      setAddress(shippingAddress.address)
      setCity(shippingAddress.city)
      setPostalCode(shippingAddress.postalCode)
      setCountry(shippingAddress.country)
    }
  }, [userInfo, shippingAddress, cartItems])

  const submitHandle = e => {
    e.preventDefault()
    setSubmitted(true)
    if (address.trim() && city.trim() && country.trim() && postalCode.trim()) {
      dispatch(saveShippingAddress({ address, city, postalCode, country }))
      navigate(nextPage)
    }
  }

  return (
    <div>
      {userInfo && cartItems.length !== 0 && (
        <>
          <Steps activeStep={1} />
          <Grid container justify="center">
            <Grid item lg={4} md={6} sm={8} xs={8}>
              <Typography variant="h1">SHIPPING</Typography>
              <form onSubmit={submitHandle} style={{ display: "grid" }}>
                <TextField
                  type="text"
                  label="Address*"
                  variant="filled"
                  margin="dense"
                  error={submitted && address.trim() === ""}
                  helperText={
                    submitted && address.trim() === "" && "Field is required!"
                  }
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                />
                <TextField
                  type="text"
                  label="City*"
                  variant="filled"
                  margin="dense"
                  error={submitted && city.trim() === ""}
                  helperText={
                    submitted && city.trim() === "" && "Field is required!"
                  }
                  value={city}
                  onChange={e => setCity(e.target.value)}
                />
                <TextField
                  type="text"
                  label="Postal Code*"
                  variant="filled"
                  margin="dense"
                  error={submitted && postalCode.trim() === ""}
                  helperText={
                    submitted &&
                    postalCode.trim() === "" &&
                    "Field is required!"
                  }
                  value={postalCode}
                  onChange={e => setPostalCode(e.target.value)}
                />
                <TextField
                  type="text"
                  label="Country*"
                  variant="filled"
                  margin="dense"
                  error={submitted && country.trim() === ""}
                  helperText={
                    submitted && country.trim() === "" && "Field is required!"
                  }
                  value={country}
                  onChange={e => setCountry(e.target.value)}
                />
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  size="large"
                  style={{ marginTop: 10 }}
                >
                  Proceed
                </Button>
              </form>
            </Grid>
          </Grid>
        </>
      )}
    </div>
  )
}

export default Shipping
