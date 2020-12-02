import React from "react"
import Products from "../components/products/Products"
import { Router } from "@reach/router"
import { Container } from "@material-ui/core"
import Cart from "../components/screens/Cart"
import Users from "../components/screens/adminScreens/Users"
import Orders from "../components/screens/adminScreens/Orders"
import { Products as AdminProducts } from "../components/screens/adminScreens/Products"
import Discounts from "../components/screens/adminScreens/Discounts"
import AdminProduct from "../components/screens/adminScreens/AdminProduct"
import AdminDiscount from "../components/screens/adminScreens/AdminDiscount"
import Order from "../components/screens/Order"
import Payment from "../components/screens/Payment"
import PlaceOrder from "../components/screens/PlaceOrder"
import Profile from "../components/screens/Profile"
import Register from "../components/screens/Register"
import Shipping from "../components/screens/Shipping"
import Login from "../components/screens/Register"
import Product from "../components/screens/Product"

export default function Home({ location }) {
  return (
    <Container className={"main"}>
      <Router>
        <Products path="/" />
        <Products path="/search/:keyword" />
        <Products path="/page/:pageNumber" />
        <Products path="/search/:keyword/page/:pageNumber" />
        <Product path="/product/:id" />
        <Login path="/login" location={location} />
        <Register path="/register" location={location} />
        <Profile path="/profile" />
        <Payment path="/payment" />
        <PlaceOrder path="/placeOrder" />
        <Shipping path="/shipping" location={location} />
        <Cart path="/cart" />
        <Order path="/order/:id" />
        <AdminProducts path="/admin/products" />
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
