import React, { useEffect } from "react"
import { Link, navigate } from "gatsby"

import { useDispatch, useSelector } from "react-redux"
import {
  listProducts,
  listTopRatedProducts,
} from "../../redux/actions/productActions"

import { Button, Grid, Typography } from "@material-ui/core"
import { Alert, Pagination } from "@material-ui/lab"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"
import ProductCard from "../products/ProductCard"
import ProductSkeleton from "../ProductSkeleton"
import Carousel from "../products/Carousel"
import Loader from "../Loader"

const Products = props => {
  const dispatch = useDispatch()
  const { loading, error, products, page: currentPage, pages } = useSelector(
    state => state.productList
  )
  const {
    loading: topLoading,
    error: topError,
    products: topProducts,
  } = useSelector(state => state.productTopRated)

  const keyword = props.keyword
  const page = props.pageNumber

  useEffect(() => {
    dispatch(listTopRatedProducts(4))
    dispatch(listProducts(page, keyword))
  }, [dispatch, page, keyword])

  const pageChangeHandle = (e, pageNum) => {
    if (keyword) navigate(`/search/${keyword}/page/${pageNum}`)
    else if (pageNum === 1) navigate("/")
    else navigate(`/page/${pageNum}`)
  }
  return (
    <div
      style={{
        marginTop: topProducts && !topError && !keyword && !page && -30,
      }}
    >
      {keyword && (
        <Link to={"/"}>
          <Button startIcon={<ArrowBackIcon />} style={{ marginBottom: 10 }}>
            Browse all products
          </Button>
        </Link>
      )}

      {topLoading ? (
        <Loader contained />
      ) : (
        !topError &&
        !keyword &&
        !page && (
          <Grid container spacing={3}>
            <Grid item sm={12} xs={12}>
              <Carousel products={topProducts} />
            </Grid>
          </Grid>
        )
      )}
      <Typography variant="h1">
        {keyword ? "SHOWING SEARCH RESULTS" : "LATEST PRODUCTS"}
      </Typography>
      {loading ? (
        <Grid container spacing={3}>
          {[...Array(10).keys()].map(num => (
            <Grid item xs={6} sm={4} md={3} key={num}>
              <ProductSkeleton />
            </Grid>
          ))}
        </Grid>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <>
          <Grid container spacing={3}>
            {products.length !== 0 &&
              products.map(product => (
                <Grid item xs={6} sm={4} md={3} key={product._id}>
                  <ProductCard key={product._id} product={product} />
                </Grid>
              ))}
          </Grid>
          {pages > 1 && (
            <Pagination
              count={pages}
              page={currentPage}
              onChange={pageChangeHandle}
              style={{ marginTop: 20 }}
            />
          )}
        </>
      )}
    </div>
  )
}

export default Products
