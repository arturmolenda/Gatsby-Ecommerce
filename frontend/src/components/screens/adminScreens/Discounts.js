import React, { useEffect, useState } from "react"
import { Link, navigate } from "gatsby"

import { useDispatch, useSelector } from "react-redux"
import {
  DISCOUNT_DELETE_RESET,
  DISCOUNT_LIST_ALL_RESET,
} from "../../../redux/constants/discountConstats"
import {
  deleteDiscount,
  listAllDiscounts,
} from "../../../redux/actions/discountActions"

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
import CloseIcon from "@material-ui/icons/Close"
import CheckIcon from "@material-ui/icons/Check"
import { Alert } from "@material-ui/lab"
import Loader from "../../Loader"
import DeleteDialog from "../../DeleteDialog"
import moment from "moment"

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

const Discounts = () => {
  const [discountToDelete, setDiscountToDelete] = useState(null)
  const classes = useStyles()
  const dispatch = useDispatch()
  const { userInfo } = useSelector(state => state.userLogin)
  const { loading, discounts, success, error } = useSelector(
    state => state.discountListAll
  )
  const {
    loading: deleteLoading,
    success: deleteSuccess,
    error: deleteError,
  } = useSelector(state => state.discountDelete)

  const resetDeleteAlert = () => dispatch({ type: DISCOUNT_DELETE_RESET })

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) navigate("/login")
    else if (
      !discounts ||
      (discounts.length === 0 && !success) ||
      deleteSuccess
    ) {
      dispatch(listAllDiscounts())
    }
  }, [userInfo, deleteSuccess])

  useEffect(() => {
    return () => {
      dispatch({ type: DISCOUNT_LIST_ALL_RESET })
      resetDeleteAlert()
    }
  }, [])
  const deleteHandle = () => {
    resetDeleteAlert()
    dispatch(deleteDiscount(discountToDelete))
    setDiscountToDelete(null)
  }

  return (
    <Grid container justify="center">
      <Grid item md={10} sm={12} xs={12}>
        <div className={classes.topContainer}>
          <Typography variant="h1">DISCOUNTS</Typography>
          <Link to="/admin/discounts/new">
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
            Coupon deleted
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
                  <TableCell>CODE</TableCell>
                  <TableCell>DISCOUNT</TableCell>
                  <TableCell>AMOUNT LEFT</TableCell>
                  <TableCell>EXPIRES</TableCell>
                  <TableCell>ACTIVE</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {discounts &&
                  discounts.length !== 0 &&
                  discounts.map(item => (
                    <TableRow
                      key={item._id}
                      className={classes.tableBackground}
                    >
                      <TableCell>{item._id}</TableCell>
                      <TableCell>{item.code}</TableCell>
                      <TableCell>
                        {item.isPercent ? `${item.amount}%` : `$${item.amount}`}
                      </TableCell>
                      <TableCell>{item.couponsAmount}</TableCell>
                      <TableCell>
                        {moment(item.expireDate).format("L")}
                      </TableCell>
                      <TableCell>
                        {item.expireDate < new Date() ? (
                          <CloseIcon color="secondary" />
                        ) : item.isActive ? (
                          <CheckIcon style={{ fill: "#33d460" }} />
                        ) : (
                          <CloseIcon color="secondary" />
                        )}
                      </TableCell>
                      <TableCell>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <Link to={`/admin/discounts/edit/${item._id}`}>
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
                            onClick={() => setDiscountToDelete(item._id)}
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
        open={discountToDelete}
        title={"Are you sure?"}
        description={"This action cannot be undone"}
        handleClose={() => setDiscountToDelete(null)}
        handleDelete={deleteHandle}
      />
    </Grid>
  )
}

export default Discounts
