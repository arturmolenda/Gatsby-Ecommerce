import React, { useEffect, useState } from "react"
import { Link, navigate } from "gatsby"

import { useDispatch, useSelector } from "react-redux"
import { listProducts } from "../../../redux/actions/productActions"

import { Button, Grid, makeStyles, Typography } from "@material-ui/core"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"

import ProductForm from "../../productForm/ProductForm"
import ProductCard from "../../products/ProductCard"
import Loader from "../../Loader"
import Product from "../Product"

const useStyles = makeStyles(theme => ({
  sampleProduct: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  secondaryHeader: {
    fontSize: "1.6rem",
    color: "#676767",
    marginBottom: 10,
  },
}))

const AdminProduct = ({ id }) => {
  const [name, setName] = useState("Sample Name")
  const [price, setPrice] = useState(1337.99)
  const [images, setImages] = useState([
    {
      image: "",
      description: "",
      local: false,
    },
  ])
  const [labels, setLabels] = useState([
    {
      labelText: "",
      color: "",
      bgColor: "",
    },
  ])
  const [category, setCategory] = useState("Category")
  const [qty, setQty] = useState(21)
  const [brand, setBrand] = useState("Brand")
  const [discount, setDiscount] = useState(0)
  const [description, setDescription] = useState("Sample Description")
  const [showProduct, setShowProduct] = useState(false)
  const classes = useStyles()
  const dispatch = useDispatch()
  const { userInfo } = useSelector(state => state.userLogin)
  const { loading, products } = useSelector(state => state.productList)

  const product = {
    name,
    price,
    images,
    brand,
    rating: 0,
    numReviews: 0,
    countInStock: qty,
    description,
  }

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) navigate("/login")
    if (!products || products.length === 0) dispatch(listProducts())
  }, [userInfo])

  useEffect(() => {
    if (id && products.length !== 0) {
      const productToEdit = products.find(x => x._id === id)
      if (productToEdit) {
        setName(productToEdit.name)
        setPrice(productToEdit.price)
        setLabels(productToEdit.labels)
        setCategory(productToEdit.category)
        setQty(productToEdit.countInStock)
        setBrand(productToEdit.brand)
        setDiscount(productToEdit.discount)
        setDescription(productToEdit.description)
        setShowProduct(productToEdit.show)
        if (productToEdit.images.length !== 0) {
          setImages(() => {
            const newImages = productToEdit.images.map(img => {
              img.local = true
              return img
            })
            return newImages
          })
        }
      }
    }
  }, [products, id])

  const deleteLabel = i => {
    console.log("delete", i)
  }

  return (
    <>
      <Link to={"/admin/products"}>
        <Button startIcon={<ArrowBackIcon />} style={{ marginBottom: 10 }}>
          Go back
        </Button>
      </Link>
      {loading ? (
        <Loader />
      ) : (
        <Grid
          container
          justify="center"
          alignItems="center"
          direction="column"
          wrap="nowrap"
        >
          <Grid container justify="center">
            <Typography
              variant="h2"
              className={classes.secondaryHeader}
              align="center"
            >
              PRODUCT PAGE PREVIEW
            </Typography>
            <Product previewProduct={product} />
          </Grid>

          <Grid
            container
            spacing={2}
            justify="center"
            style={{ margin: "50px 0" }}
          >
            <Grid item xs={12}>
              <Typography
                variant="h2"
                className={classes.secondaryHeader}
                align="center"
              >
                PRODUCT CARD PREVIEW
              </Typography>
            </Grid>
            {products.length !== 0 && (
              <Grid item xs={6} sm={4} md={3}>
                <ProductCard product={products[0]} disableLink sampleProduct />
              </Grid>
            )}
            <Grid item xs={6} sm={4} md={3}>
              <ProductCard product={product} disableLink />
            </Grid>
            {products.length !== 0 && (
              <Grid item xs={6} sm={4} md={3} className={classes.sampleProduct}>
                <ProductCard product={products[1]} disableLink sampleProduct />
              </Grid>
            )}
          </Grid>
          <Grid container justify="center">
            <Grid item md={5} sm={8} xs={12}>
              <Typography variant="h1" align="center">
                CREATE NEW PRODUCT
              </Typography>
              <ProductForm
                name={name}
                nameChange={e => setName(e.target.value)}
                price={price}
                priceChange={e => setPrice(e.target.value)}
                images={images}
                setImages={setImages}
                category={category}
                categoryChange={e => setCategory(e.target.value)}
                qty={qty}
                qtyChange={e => setQty(e.target.value)}
                brand={brand}
                brandChange={e => setBrand(e.target.value)}
                discount={discount}
                discountChange={e => setDiscount(e.target.value)}
                description={description}
                descriptionChange={e => setDescription(e.target.value)}
                labels={labels}
                setLabels={setLabels}
                deleteLabel={deleteLabel}
                showProduct={showProduct}
                showProductChange={e => setShowProduct(e.target.checked)}
              />
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  )
}

export default AdminProduct
