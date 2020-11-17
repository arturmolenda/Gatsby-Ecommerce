import { Container } from "@material-ui/core"
import React from "react"
import Shipping from "../components/screens/Shipping"

const shipping = ({ location }) => {
  return (
    <Container>
      <Shipping location={location} />
    </Container>
  )
}

export default shipping
