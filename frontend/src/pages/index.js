import React from "react"
import Products from "../components/products/Products"
import { Container } from "@material-ui/core"

export default function Home() {
  return (
    <Container className={"main"}>
      <Products />
    </Container>
  )
}
