import React from "react"
import Login from "../components/screens/Login"
import { Container } from "@material-ui/core"

const login = () => {
  return (
    <Container className={"main"}>
      <Login />
    </Container>
  )
}

export default login
