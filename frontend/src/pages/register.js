import React from "react"
import Register from "../components/screens/Register"
import { Container } from "@material-ui/core"
const register = ({ location }) => {
  return (
    <Container className={"main"}>
      <Register location={location} />
    </Container>
  )
}

export default register
