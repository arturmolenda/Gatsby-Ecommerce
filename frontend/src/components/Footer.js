import React from "react"
import { Container, Typography } from "@material-ui/core"

const Footer = () => {
  return (
    <Container>
      <Typography variant="body2" align="center">
        © {new Date().getFullYear()} Gatsby Store by Artur Molenda
      </Typography>
    </Container>
  )
}

export default Footer
