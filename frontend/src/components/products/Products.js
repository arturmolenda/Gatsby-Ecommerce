import React, { useEffect, useState } from "react"
import axios from "axios"
import ProductCard from "./ProductCard"
import { Grid, Typography } from "@material-ui/core"
const Products = () => {
  const [products, setProducts] = useState([])
  useEffect(() => {
    async function getProducts() {
      const { data } = await axios.get("/api/products")
      setProducts(data)
    }
    getProducts()
  }, [])
  return (
    <>
      <Typography variant="h4" component="h1" style={{ marginBottom: 15 }}>
        LATEST PRODUCTS
      </Typography>
      <Grid container spacing={3}>
        {products.length !== 0 &&
          products.map(product => (
            <Grid item xs={6} sm={4} md={3}>
              <ProductCard key={product._id} product={product} />
            </Grid>
          ))}
      </Grid>
    </>
  )
}

export default Products
