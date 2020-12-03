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
  TablePagination,
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
import SearchField from "../../SearchField"

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
  const [keyword, setKeyword] = useState("")
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const classes = useStyles()
  const dispatch = useDispatch()
  const { userInfo } = useSelector(state => state.userLogin)
  const {
    loading,
    orders,
    page,
    totalRows,
    rowsSize,
    success,
    error,
  } = useSelector(state => state.orderListAll)
  const {
    loading: deleteLoading,
    success: deleteSuccess,
    error: deleteError,
  } = useSelector(state => state.orderDelete)

  console.log(totalRows, rowsSize, page)

  const resetDeleteAlert = () => {
    dispatch({ type: ORDER_DELETE_RESET })
  }

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) navigate("/login")
    else if (!orders || (orders.length === 0 && !success) || deleteSuccess) {
      if (page && totalRows && keyword) {
        dispatch(listAllOrders(page, rowsPerPage, keyword))
      } else dispatch(listAllOrders())
    }
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

  const changePageHandle = (e, newPage) => {
    dispatch(listAllOrders(newPage, rowsPerPage, keyword))
  }
  const changeRowsPerPageHandle = e => {
    console.log(e.target.value)
    setRowsPerPage(e.target.value)
    dispatch(listAllOrders(page, e.target.value, keyword))
  }
  const searchHandle = e => {
    if (e.key === "Enter") dispatch(listAllOrders(page, rowsPerPage, keyword))
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
        <SearchField
          value={keyword}
          changeHandle={e => setKeyword(e.target.value)}
          searchHandle={searchHandle}
          placeholder="Find Order..."
          whiteTheme
          disabled={loading}
        />
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
            {!loading && (
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
            )}
          </Table>
          {loading ? (
            <div style={{ padding: "20px 0" }}>
              <Loader contained />
            </div>
          ) : (
            <TablePagination
              rowsPerPageOptions={[5, 15, 50]}
              component="div"
              count={totalRows}
              rowsPerPage={rowsSize}
              page={page}
              onChangePage={changePageHandle}
              onChangeRowsPerPage={changeRowsPerPageHandle}
            />
          )}
        </TableContainer>
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
