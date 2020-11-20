import React from "react"
import { navigate } from "gatsby"
import { Router } from "@reach/router"
import { Container } from "@material-ui/core"
import Order from "../components/screens/Order"
const order = ({ location }) => {
  if (location.pathname === "/order" || location.pathname === "/order/") {
    navigate("/")
  }
  return (
    <Container className={"main"}>
      <Router>
        <Order path="/order/:id" />
      </Router>
    </Container>
  )
}

export default order
