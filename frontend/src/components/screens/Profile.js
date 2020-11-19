import React, { useEffect } from "react"
import { Link, navigate } from "gatsby"

import { useDispatch, useSelector } from "react-redux"
import { USER_UPDATE_RESET } from "../../redux/constants/userConstants"

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
import ClearIcon from "@material-ui/icons/Clear"
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket"

import UpdateUser from "../UpdateUser"
import { Alert } from "@material-ui/lab"
import { listMyOrders } from "../../redux/actions/orderActions"
import Loader from "../Loader"

const useStyles = makeStyles(() => ({
  header: {
    fontSize: "1.6rem",
    color: "#676767",
    marginBottom: 10,
  },
  tableBackground: {
    "&:nth-of-type(odd)": {
      backgroundColor: "rgba(0,0,0,.05)",
    },
  },
  emptyContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 20,
  },
}))

const Profile = () => {
  const dispatch = useDispatch()
  const { userInfo } = useSelector(state => state.userLogin)
  const { loading, orders, error } = useSelector(state => state.orderListMy)
  const classes = useStyles()

  useEffect(() => {
    if (!userInfo) navigate("/login")
    if (!orders) dispatch(listMyOrders())
    return () => {
      dispatch({ type: USER_UPDATE_RESET })
    }
  }, [userInfo, orders])

  return (
    <>
      {loading && <Loader />}
      {userInfo && !loading && (
        <Grid container spacing={2}>
          <Grid item md={3} sm={12} xs={12}>
            <Typography variant="h2" className={classes.header}>
              UPDATE PROFILE
            </Typography>
            <UpdateUser />
          </Grid>
          <Grid item md={9} sm={12} xs={12}>
            <Typography variant="h2" className={classes.header}>
              MY ORDERS
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            {orders && orders.length > 0 ? (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>DATE</TableCell>
                      <TableCell>TOTAL</TableCell>
                      <TableCell>PAID</TableCell>
                      <TableCell>SHIPPED</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orders.map(item => (
                      <TableRow
                        key={item._id}
                        className={classes.tableBackground}
                      >
                        <TableCell>{item._id}</TableCell>
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
                          <Link to={`/order/${item._id}`}>
                            <Button variant="contained" color="primary">
                              Details
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <div className={classes.emptyContainer}>
                <ShoppingBasketIcon style={{ width: 120, height: 120 }} />
                <Alert
                  severity="info"
                  variant="standard"
                  style={{ alignItems: "center", backgroundColor: "#c1e3fc" }}
                >
                  You didn't order anything yet!
                </Alert>
                <Link to="/">
                  <Button
                    color="primary"
                    variant="contained"
                    style={{ marginTop: 20 }}
                  >
                    Browse products
                  </Button>
                </Link>
              </div>
            )}
          </Grid>
        </Grid>
      )}
    </>
  )
}

export default Profile
