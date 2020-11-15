import React from "react"
import Cart from "../components/screens/Cart"
import { Container, makeStyles } from "@material-ui/core"

const cart = () => {
  return (
    <Container className={`main main-cart`}>
      <Cart />
    </Container>
  )
}

export default cart
