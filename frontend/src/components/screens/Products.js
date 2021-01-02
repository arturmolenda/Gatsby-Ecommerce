import React, { useEffect } from "react"
import { Link, navigate } from "gatsby"
import { Helmet } from "react-helmet"

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
  const page =
    typeof props.pageNumber === "undefined" ? 1 : Number(props.pageNumber)

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
    <>
      <Helmet title="Welcome to the Gatsby Store!" />
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

        {topLoading
          ? !topError && !keyword && page === 1 && <Loader contained />
          : !topError &&
            !keyword &&
            page === 1 && (
              <Grid container spacing={3} style={{ marginTop: -35 }}>
                <Grid item sm={12} xs={12}>
                  <Carousel products={topProducts} />
                </Grid>
              </Grid>
            )}
        <Typography variant="h1">
          {keyword
            ? page === 1
              ? "SHOWING SEARCH RESULTS"
              : `SHOWING SEARCH RESULTS | ${page}`
            : page === 1
            ? "LATEST PRODUCTS"
            : `PAGE ${page}`}
        </Typography>
        {loading ? (
          <Grid container spacing={3}>
            {[...Array(8).keys()].map(num => (
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
                    <ProductCard
                      key={product._id}
                      product={product}
                      keyword={keyword}
                      pageNum={page}
                    />
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
    </>
  )
}

export default Products
