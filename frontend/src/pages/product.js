import React from "react"
import { navigate } from "gatsby"
import { Router } from "@reach/router"
import Product from "../components/screens/Product"
const product = ({ location }) => {
  console.log(location)
  if (location.pathname === "/product" || location.pathname === "/product/") {
    navigate("/")
  }
  return (
    <Router>
      <Product path="/product/:id" />
    </Router>
  )
}

export default product
