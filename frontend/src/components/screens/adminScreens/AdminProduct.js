import React, { useEffect, useState } from "react"
import { Link, navigate } from "gatsby"

import { useDispatch, useSelector } from "react-redux"
import {
  createProduct,
  listProducts,
  uploadProductImage,
} from "../../../redux/actions/productActions"

import { Button, Grid, makeStyles, Typography } from "@material-ui/core"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"

import ProductForm from "../../productForm/ProductForm"
import ProductCard from "../../products/ProductCard"
import Loader from "../../Loader"
import Product from "../Product"
import { Alert } from "@material-ui/lab"
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_IMAGE_UPLOAD_RESET,
} from "../../../redux/constants/productConstants"

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
  const [formError, setFormError] = useState(false)
  const [validationLoading, setValidationLoading] = useState(false)
  const [formData, setFormData] = useState([])
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
  const [discount, setDiscount] = useState({
    amount: 0,
    expireDate: new Date().toISOString().substring(0, 10),
    totalPrice: null,
  })
  const [description, setDescription] = useState("Sample Description")
  const [showProduct, setShowProduct] = useState(true)
  const classes = useStyles()
  const dispatch = useDispatch()
  const { userInfo } = useSelector(state => state.userLogin)
  const {
    loading: listProductsLoading,
    products,
    success: listProductsSuccess,
  } = useSelector(state => state.productList)

  const {
    loading: uploadLoading,
    error: uploadError,
    success: uploadSuccess,
  } = useSelector(state => state.productImageUpload)
  const {
    loading: createLoading,
    error: createError,
    product: createdProduct,
    success: createSuccess,
  } = useSelector(state => state.productCreate)

  const product = {
    name,
    price,
    images,
    brand,
    rating: 0,
    numReviews: 0,
    countInStock: qty,
    description,
    labels,
    discount,
    category,
    showProduct,
  }

  const dispatchCurrentProduct = () =>
    dispatch(
      createProduct({
        name,
        price,
        images,
        brand,
        countInStock: qty,
        description,
        labels,
        discount,
        category,
        showProduct,
      })
    )

  const resetReducers = () => {
    dispatch({ type: PRODUCT_IMAGE_UPLOAD_RESET })
    dispatch({ type: PRODUCT_CREATE_RESET })
  }

  useEffect(() => {
    if (
      !products ||
      (products.length === 0 && !listProductsSuccess && !listProductsLoading)
    )
      dispatch(listProducts())
  }, [, createdProduct, product, createSuccess])

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) navigate("/login")

    if (createSuccess) {
      if (formData.length === 0) {
        resetReducers()
        dispatch(listProducts())
        navigate(`/admin/products/edit/${createdProduct}`)
      } else {
        dispatch(uploadProductImage(formData))
      }
    }
    if (uploadSuccess) {
      if (id) {
        dispatch(listProducts())
        resetReducers()
      } else {
        dispatch(listProducts())
        navigate(`/admin/products/edit/${createdProduct}`)
        resetReducers()
      }
    }
  }, [
    userInfo,
    createSuccess,
    formData,
    createdProduct,
    id,
    product,
    uploadSuccess,
  ])

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
        if (
          productToEdit.discount &&
          productToEdit.discount.amount &&
          productToEdit.discount.expireDate
        ) {
          setDiscount(productToEdit.discount)
        }
        setDescription(productToEdit.description)
        setShowProduct(productToEdit.show)
        setFormData([])
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

  const submitHandle = async e => {
    e.preventDefault()
    setFormError(false)
    setValidationLoading(true)
    let formData = []
    const isFormValid = new Promise((resolve, reject) => {
      images.map(async (imgObj, i) => {
        if (imgObj.formData) {
          formData.push(imgObj.formData)
          if (i + 1 === images.length) resolve()
        }
        if (!imgObj.local && !imgObj.blob && !imgObj.formData) {
          const validateImg = new Image()
          validateImg.src = imgObj.image
          validateImg.onerror = () => {
            setFormError(true)
            setImages(prevImages => {
              prevImages[i].error =
                "Image does not exist in given url! can't proceed"
              return [...prevImages]
            })
            reject()
          }
          validateImg.onload = () => {
            if (i + 1 === images.length) resolve()
          }
        }
      })
    })
    console.log(isFormValid)
    // if
    await isFormValid
      .then(() => {
        setFormError(false)
        setValidationLoading(false)
        if (formData.length !== 0) setFormData(formData)
        dispatchCurrentProduct()
      })
      .catch(() => setValidationLoading(false))
  }

  return (
    <>
      <Link to={"/admin/products"}>
        <Button startIcon={<ArrowBackIcon />} style={{ marginBottom: 10 }}>
          Go back
        </Button>
      </Link>
      {listProductsLoading ? (
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
              <form
                onSubmit={submitHandle}
                style={{ display: "flex", flexDirection: "column" }}
              >
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
                  setDiscount={setDiscount}
                  description={description}
                  descriptionChange={e => setDescription(e.target.value)}
                  labels={labels}
                  setLabels={setLabels}
                  showProduct={showProduct}
                  showProductChange={e => setShowProduct(e.target.checked)}
                />
                {formError && (
                  <Alert severity="error">There's an error in your form!</Alert>
                )}
                {createError && <Alert severity="error">{createError}</Alert>}
                {uploadError && <Alert severity="error">{uploadError}</Alert>}
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  style={{ marginTop: 15 }}
                  disabled={createLoading || uploadLoading || validationLoading}
                >
                  Save
                  {(createLoading || uploadLoading || validationLoading) && (
                    <Loader button />
                  )}
                </Button>
              </form>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  )
}

export default AdminProduct
