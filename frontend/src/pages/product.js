import React from "react"
import { navigate } from "gatsby"
import { Router } from "@reach/router"
import Product from "../components/screens/Product"
import { Container } from "@material-ui/core"
const product = ({ location }) => {
  console.log(location)
  if (location.pathname === "/product" || location.pathname === "/product/") {
    navigate("/")
  }
  return (
    <Container className={"main"}>
      <Router>
        <Product path="/product/:id" />
      </Router>
    </Container>
  )
}

export default product
