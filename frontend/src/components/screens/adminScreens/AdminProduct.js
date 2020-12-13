import React, { useEffect, useState } from "react"
import { Link, navigate } from "gatsby"

import { useDispatch, useSelector } from "react-redux"
import {
  createProduct,
  getProductDetails,
  listProducts,
  updateProduct,
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
  const { loading, product, error } = useSelector(state => state.productDetails)

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
  const {
    loading: updateLoading,
    error: updateError,
    success: updateSuccess,
  } = useSelector(state => state.productUpdate)

  const previewProduct = {
    name,
    price,
    images,
    brand,
    rating: (product && product.rating) || 0,
    numReviews: (product && product.numReviews) || 0,
    reviews: (product && product.reviews) || [],
    countInStock: qty,
    description,
    labels,
    discount,
    category,
  }

  const dispatchCurrentProduct = () => {
    if (id) {
      dispatch(
        updateProduct(
          {
            name,
            price,
            images,
            brand,
            countInStock: qty,
            description,
            labels,
            discount,
            category,
            show: showProduct,
          },
          id
        )
      )
    } else {
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
          show: showProduct,
        })
      )
    }
  }

  const resetReducers = () => {
    dispatch({ type: PRODUCT_IMAGE_UPLOAD_RESET })
    dispatch({ type: PRODUCT_CREATE_RESET })
  }

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) navigate("/login")
    if (id && !product && !createSuccess && !updateSuccess) {
      dispatch(getProductDetails(id))
      dispatch(listProducts())
    } else if (product && id && product._id !== id)
      dispatch(getProductDetails(id))
  }, [userInfo, id, product])

  useEffect(() => {
    if (createSuccess || updateSuccess) {
      if (formData.length === 0) {
        resetReducers()
        dispatch(getProductDetails(id))
        if (!id) navigate(`/admin/products/edit/${createdProduct}`)
      } else {
        dispatch(uploadProductImage(formData))
        resetReducers()
        setFormData([])
      }
    }
    if (uploadSuccess) {
      if (id) {
        dispatch(getProductDetails(id))
        resetReducers()
      } else {
        navigate(`/admin/products/edit/${createdProduct}`)
        resetReducers()
      }
    }
  }, [createSuccess, updateSuccess, uploadSuccess])

  useEffect(() => {
    if (id && product && product._id === id) {
      setName(product.name)
      setPrice(product.price)
      setLabels(product.labels)
      setCategory(product.category)
      setQty(product.countInStock)
      setBrand(product.brand)
      if (
        product.discount &&
        product.discount.amount &&
        product.discount.expireDate
      ) {
        setDiscount({
          ...product.discount,
          expireDate: product.discount.expireDate.substring(0, 10),
        })
      }
      setDescription(product.description)
      setShowProduct(product.show)
      setFormData([])
      if (product.images.length !== 0) {
        setImages(() => {
          const newImages = product.images.map(img => {
            img.local = true
            return img
          })
          return newImages
        })
      }
    }
  }, [product, id])

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
        } else if (imgObj.local) {
          if (i + 1 === images.length) resolve()
        }
      })
    })
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
      {listProductsLoading || loading ? (
        <Loader />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
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
            <Product previewProduct={previewProduct} />
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
              <ProductCard product={previewProduct} disableLink />
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
                {id ? "EDIT PRODUCT" : "CREATE NEW PRODUCT"}
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
                  setDescription={setDescription}
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
                {updateError && <Alert severity="error">{updateError}</Alert>}
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  style={{ marginTop: 15 }}
                  disabled={
                    createLoading ||
                    uploadLoading ||
                    validationLoading ||
                    updateLoading
                  }
                >
                  Save
                  {(createLoading ||
                    uploadLoading ||
                    validationLoading ||
                    updateLoading) && <Loader button />}
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
