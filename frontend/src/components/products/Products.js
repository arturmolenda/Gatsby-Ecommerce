import React, { useEffect, useState } from "react"

import { useDispatch, useSelector } from "react-redux"
import { listProducts } from "../../redux/actions/productActions"

import { Grid, Typography } from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import ProductCard from "./ProductCard"
import Loader from "../Loader"
import ProductSkeleton from "../ProductSkeleton"
const Products = () => {
  const dispatch = useDispatch()
  const { loading, error, products, success } = useSelector(
    state => state.productList
  )
  useEffect(() => {
    if (products.length === 0 && !success) {
      dispatch(listProducts())
    }
  }, [dispatch, success])
  return (
    <>
      <Typography variant="h1">LATEST PRODUCTS</Typography>
      {loading ? (
        <Grid container spacing={3}>
          {[...Array(20).keys()].map(num => (
            <Grid item xs={6} sm={4} md={3} key={num}>
              <ProductSkeleton />
            </Grid>
          ))}
        </Grid>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Grid container spacing={3}>
          {products.length !== 0 &&
            products.map(product => (
              <Grid item xs={6} sm={4} md={3} key={product._id}>
                <ProductCard key={product._id} product={product} />
              </Grid>
            ))}
        </Grid>
      )}
    </>
  )
}

export default Products
