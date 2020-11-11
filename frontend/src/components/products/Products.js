import React, { useEffect, useState } from "react"
import axios from "axios"
import ProductCard from "./ProductCard"
import { Grid, Typography } from "@material-ui/core"
const Products = () => {
  const [products, setProducts] = useState([])
  console.log("products")
  useEffect(() => {
    console.log("here")
    async function getProducts() {
      const { data } = await axios.get("/api/products")
      console.log(data)
      setProducts(data)
    }
    getProducts()
  }, [])
  return (
    <>
      <Typography variant="h1">LATEST PRODUCTS</Typography>
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
