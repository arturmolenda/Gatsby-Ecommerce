import React, { useEffect, useState } from "react"
import { Link, navigate } from "gatsby"

import { useDispatch, useSelector } from "react-redux"
import {
  deleteProduct,
  listAllProducts,
} from "../../../redux/actions/productActions"
import { PRODUCT_DELETE_RESET } from "../../../redux/constants/productConstants"

import {
  Button,
  Grid,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"
import AddIcon from "@material-ui/icons/Add"
import { Alert } from "@material-ui/lab"
import Image from "../../Image"
import Loader from "../../Loader"
import DeleteDialog from "../../DeleteDialog"

const useStyles = makeStyles(() => ({
  tableBackground: {
    "&:nth-of-type(odd)": {
      backgroundColor: "rgba(0,0,0,.05)",
    },
  },
  iconBtn: {
    minWidth: 40,
    "&:first-child": {
      marginRight: 16,
    },
  },
  alert: {
    marginBottom: 8,
  },
  topContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
}))

const Products = () => {
  const [productToDelete, setProductToDelete] = useState(null)
  const classes = useStyles()
  const dispatch = useDispatch()
  const { userInfo } = useSelector(state => state.userLogin)
  const { loading, products, error } = useSelector(
    state => state.productListAll
  )
  const {
    loading: deleteLoading,
    success: deleteSuccess,
    error: deleteError,
  } = useSelector(state => state.productDelete)

  const resetDeleteAlert = () => dispatch({ type: PRODUCT_DELETE_RESET })

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) navigate("/login")
    else if (!products || products.length === 0 || deleteSuccess) {
      dispatch(listAllProducts())
    }
  }, [userInfo, deleteSuccess])

  useEffect(() => {
    return () => {
      resetDeleteAlert()
    }
  }, [])
  const deleteHandle = () => {
    resetDeleteAlert()
    dispatch(deleteProduct(productToDelete))
    setProductToDelete(null)
  }

  return (
    <Grid container justify="center">
      <Grid item md={10} sm={12} xs={12}>
        <div className={classes.topContainer}>
          <Typography variant="h1">PRODUCTS</Typography>
          <Link to="/admin/products/new">
            <Button variant="contained" color="primary" startIcon={<AddIcon />}>
              CREATE NEW
            </Button>
          </Link>
        </div>
        {error && (
          <Alert className={classes.alert} severity="error">
            {error}
          </Alert>
        )}
        {deleteError && (
          <Alert className={classes.alert} severity="error">
            {deleteError}
          </Alert>
        )}
        {deleteSuccess && (
          <Alert className={classes.alert} severity="success">
            Product deleted
          </Alert>
        )}
        {loading ? (
          <Loader />
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Brand</TableCell>
                  <TableCell>Product</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>In stock</TableCell>
                  <TableCell>Rating</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products &&
                  products.length !== 0 &&
                  products.map(item => (
                    <TableRow
                      key={item._id}
                      className={classes.tableBackground}
                    >
                      <TableCell style={{ width: 100, padding: 8 }}>
                        <Link to={`/product/${item._id}?goBack=admin/products`}>
                          {item.images.length !== 0 && (
                            <Image
                              alt={item.name}
                              filename={item.images[0].image}
                              customStyle={{ borderRadius: 6 }}
                            />
                          )}
                        </Link>
                      </TableCell>
                      <TableCell>{item.brand}</TableCell>
                      <TableCell>
                        <Link
                          className="underline"
                          to={`/product/${item._id}?backLink=admin/products`}
                        >
                          {item.name}
                        </Link>
                      </TableCell>
                      <TableCell>${item.price}</TableCell>
                      <TableCell>{item.countInStock}</TableCell>
                      <TableCell>
                        {item.rating}/{item.numReviews}
                      </TableCell>
                      <TableCell>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <Link to={`/admin/products/edit/${item._id}`}>
                            <Button
                              className={classes.iconBtn}
                              color="primary"
                              variant="contained"
                              size="small"
                            >
                              <EditIcon />
                            </Button>
                          </Link>
                          <Button
                            className={classes.iconBtn}
                            color="secondary"
                            variant="contained"
                            size="small"
                            onClick={() => setProductToDelete(item._id)}
                            disabled={deleteLoading === item._id}
                          >
                            <DeleteIcon />
                            {deleteLoading === item._id && <Loader button />}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Grid>
      <DeleteDialog
        open={productToDelete}
        title={"Are you sure?"}
        description={"This action cannot be undone"}
        handleClose={() => setProductToDelete(null)}
        handleDelete={deleteHandle}
      />
    </Grid>
  )
}

export default Products
