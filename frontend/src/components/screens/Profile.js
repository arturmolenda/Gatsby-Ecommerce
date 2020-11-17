import React, { useEffect } from "react"
import { Link, navigate } from "gatsby"

import { useDispatch, useSelector } from "react-redux"
import { USER_UPDATE_RESET } from "../../redux/constants/userConstants"

import {
  Button,
  Grid,
  makeStyles,
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

const DUMMY_ORDERS = [
  {
    _id: "5f9e66b255397f21445a7255",
    createdAt: "2020-11-01T07:41:38.858+00:00",
    totalPrice: 1859.98,
    isPaid: true,
    paidAt: "2020-11-11T08:04:54.677+00:00",
    deliverySent: true,
    deliverySentAt: "2020-11-02T09:09:02.661+00:00",
  },
  {
    _id: "5f9e66b255397f21445a7255",
    createdAt: "2020-11-20T08:04:54.677+00:00",
    totalPrice: 1859.98,
    isPaid: true,
    paidAt: "2020-11-05T08:04:54.677+00:00",
    deliverySent: false,
    deliverySentAt: null,
  },
  {
    _id: "5f9e66b255397f21445a7255",
    createdAt: "2020-11-01T09:09:02.661+00:00",
    totalPrice: 100.1,
    isPaid: false,
    paidAt: null,
    deliverySent: false,
    deliverySentAt: null,
  },
]

const Profile = () => {
  const dispatch = useDispatch()
  const { userInfo } = useSelector(state => state.userLogin)
  const classes = useStyles()

  useEffect(() => {
    if (!userInfo) navigate("/login")
    return () => {
      dispatch({ type: USER_UPDATE_RESET })
    }
  }, [userInfo])

  return (
    <>
      {userInfo && (
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
            {DUMMY_ORDERS.length > 0 ? (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>DATE</TableCell>
                      <TableCell>TOTAL</TableCell>
                      <TableCell>PAID</TableCell>
                      <TableCell>DELIVERED</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {DUMMY_ORDERS.map(item => (
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
                          {item.deliverySent ? (
                            item.deliverySentAt.substring(0, 10)
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
