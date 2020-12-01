import React from "react"
import { Router } from "@reach/router"
import { Container } from "@material-ui/core"
import Users from "../components/screens/adminScreens/Users"
import Orders from "../components/screens/adminScreens/Orders"
import Products from "../components/screens/adminScreens/Products"
import Discounts from "../components/screens/adminScreens/Discounts"
import AdminProduct from "../components/screens/adminScreens/AdminProduct"
import AdminDiscount from "../components/screens/adminScreens/AdminDiscount"

const admin = ({ location }) => {
  console.log(location)
  return (
    <Container className={"main"}>
      <Router>
        <Products path="/admin/products" />
        <Orders path="/admin/orders" />
        <Users path="/admin/users" />
        <Discounts path="/admin/discounts" />
        <AdminDiscount path="/admin/discounts/new" />
        <AdminDiscount path="/admin/discounts/edit/:id" />
        <AdminProduct path="/admin/products/new" />
        <AdminProduct path="/admin/products/edit/:id" />
      </Router>
    </Container>
  )
}

export default admin
