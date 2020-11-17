import React from "react"
import Login from "../components/screens/Login"
import { Container } from "@material-ui/core"

const login = ({ location }) => {
  return (
    <Container className={"main"}>
      <Login location={location} />
    </Container>
  )
}

export default login
