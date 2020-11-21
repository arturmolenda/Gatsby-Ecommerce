import React from "react"
import { navigate } from "gatsby"
import { Router } from "@reach/router"
import Product from "../components/screens/Product"
import { Container } from "@material-ui/core"
import Users from "../components/screens/adminScreens/Users"
import Orders from "../components/screens/adminScreens/Orders"
import Products from "../components/screens/adminScreens/Products"
import Discounts from "../components/screens/adminScreens/Discounts"
const admin = ({ location }) => {
  console.log(location)
  return (
    <Container className={"main"}>
      <Router>
        <Products path="/admin/products" />
        <Orders path="/admin/orders" />
        <Users path="/admin/users" />
        <Discounts path="/admin/discounts" />
      </Router>
    </Container>
  )
}

export default admin
