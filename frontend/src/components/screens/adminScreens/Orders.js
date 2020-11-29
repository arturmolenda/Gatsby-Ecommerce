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
import InfoIcon from "@material-ui/icons/Info"
import DeleteIcon from "@material-ui/icons/Delete"
import ClearIcon from "@material-ui/icons/Clear"
import { Alert } from "@material-ui/lab"
import Image from "../../Image"
import Loader from "../../Loader"
import DeleteDialog from "../../DeleteDialog"
import { deleteOrder, listAllOrders } from "../../../redux/actions/orderActions"
import {
  ORDER_DELETE_RESET,
  ORDER_LIST_ALL_RESET,
} from "../../../redux/constants/orderConstants"

const useStyles = makeStyles(() => ({
  tableBackground: {
    "&:nth-of-type(odd)": {
      backgroundColor: "rgba(0,0,0,.05)",
    },
  },
  alert: {
    marginBottom: 8,
  },
  iconBtn: {
    minWidth: 40,
    "&:first-child": {
      marginRight: 16,
    },
  },
}))

const Orders = () => {
  const [orderToDelete, setOrderToDelete] = useState(null)
  const classes = useStyles()
  const dispatch = useDispatch()
  const { userInfo } = useSelector(state => state.userLogin)
  const { loading, orders, success, error } = useSelector(
    state => state.orderListAll
  )
  const {
    loading: deleteLoading,
    success: deleteSuccess,
    error: deleteError,
  } = useSelector(state => state.orderDelete)

  const resetDeleteAlert = () => {
    dispatch({ type: ORDER_DELETE_RESET })
  }

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) navigate("/login")
    else if (!orders || (orders.length === 0 && !success) || deleteSuccess)
      dispatch(listAllOrders())
  }, [userInfo, deleteSuccess])

  useEffect(() => {
    return () => {
      dispatch({ type: ORDER_LIST_ALL_RESET })
      resetDeleteAlert()
    }
  }, [])

  const deleteHandle = () => {
    setOrderToDelete(null)
    resetDeleteAlert()
    if (orderToDelete) dispatch(deleteOrder(orderToDelete))
  }

  return (
    <Grid container justify="center">
      <Grid item md={10} sm={12} xs={12}>
        <Typography variant="h1">ORDERS</Typography>
        {deleteSuccess && (
          <Alert severity="info" className={classes.alert}>
            Order deleted!
          </Alert>
        )}
        {error && (
          <Alert severity="error" className={classes.alert}>
            {error}
          </Alert>
        )}
        {deleteError && (
          <Alert severity="error" className={classes.alert}>
            {deleteError}
          </Alert>
        )}
        {loading ? (
          <Loader />
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>USER</TableCell>
                  <TableCell>DATE</TableCell>
                  <TableCell>TOTAL</TableCell>
                  <TableCell>PAID</TableCell>
                  <TableCell>SHIPPED</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders &&
                  orders.length > 0 &&
                  orders.map(item => (
                    <TableRow
                      key={item._id}
                      className={classes.tableBackground}
                    >
                      <TableCell>{item._id}</TableCell>
                      <TableCell>{item.user.name}</TableCell>
                      <TableCell>{item.createdAt.substring(0, 10)}</TableCell>
                      <TableCell>${item.totalPrice}</TableCell>
                      <TableCell>
                        {item.isPaid ? (
                          item.paidAt.substring(0, 10)
                        ) : (
                          <ClearIcon color="secondary" />
                        )}
                      </TableCell>
                      <TableCell>
                        {item.shipped ? (
                          item.shippedAt.substring(0, 10)
                        ) : (
                          <ClearIcon color="secondary" />
                        )}
                      </TableCell>
                      <TableCell>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <Link to={`/order/${item._id}`}>
                            <Button
                              className={classes.iconBtn}
                              color="primary"
                              variant="contained"
                              size="small"
                            >
                              <InfoIcon />
                            </Button>
                          </Link>
                          <Button
                            className={classes.iconBtn}
                            color="secondary"
                            variant="contained"
                            size="small"
                            onClick={() => setOrderToDelete(item._id)}
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
        open={orderToDelete}
        title={"Are you sure?"}
        description={"This action cannot be undone"}
        handleClose={() => setOrderToDelete(null)}
        handleDelete={deleteHandle}
      />
    </Grid>
  )
}

export default Orders
