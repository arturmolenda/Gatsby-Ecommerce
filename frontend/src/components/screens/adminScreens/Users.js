import React, { useEffect, useState } from "react"

import { Link, navigate } from "gatsby"

import { useDispatch, useSelector } from "react-redux"
import { addToCart, removeFromCart } from "../../../redux/actions/cartActions"

import {
  Button,
  Card,
  Checkbox,
  Collapse,
  Grid,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete"
import SaveIcon from "@material-ui/icons/Save"
import { Alert } from "@material-ui/lab"
import { listAllUsers } from "../../../redux/actions/userActions"
import Loader from "../../Loader"

const useStyles = makeStyles(() => ({
  tableHeadText: {
    "& td": {
      fontWeight: 600,
    },
  },
  tableBackground: {
    "&:nth-of-type(odd)": {
      backgroundColor: "rgba(0,0,0,.05)",
    },
  },
  iconBtn: {
    display: "inline-block",
    minWidth: 40,

    "& .MuiButton-contained.Mui-disabled": {
      boxShadow:
        " 0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
    },
    "&:first-child": {
      marginRight: 16,
    },
  },
}))

const Users = () => {
  const [updatedUsers, setUpdatedUsers] = useState([])
  const classes = useStyles()

  const dispatch = useDispatch()
  const { userInfo } = useSelector(state => state.userLogin)
  const { loading, users, error } = useSelector(state => state.userListAll)

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) navigate("/login")
    else if (!users || users.length === 0) dispatch(listAllUsers())
  }, [userInfo])

  // useEffect(() => {
  //   if (users && users.length !== 0) {
  //     setUsersData(() => {
  //       const obj = users.map(x => )
  //     })
  //   }
  // }, [users])

  const changeHandle = (e, i) => {
    // if(e.target.checked !== users[i].isAdmin){
    setUpdatedUsers(prevState => {
      prevState[users[i]._id] = e.target.checked
      return { ...prevState }
    })
    // }
  }
  console.log(updatedUsers)

  return (
    userInfo &&
    userInfo.isAdmin && (
      <Grid container justify="center">
        <Grid item md={10} sm={12} xs={12}>
          <Typography variant="h1">USERS</Typography>
          {loading ? (
            <Loader />
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow className={classes.tableHeadText}>
                    <TableCell>ID</TableCell>
                    <TableCell>NAME</TableCell>
                    <TableCell>EMAIL</TableCell>
                    <TableCell>ADMIN</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users &&
                    users.length !== 0 &&
                    users.map((user, i) => {
                      console.log(user, user.isAdmin)
                      return (
                        <TableRow className={classes.tableBackground}>
                          <TableCell>{user._id}</TableCell>
                          <TableCell>{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            {console.log(user.isAdmin)}
                            <Checkbox
                              color="secondary"
                              defaultChecked={user.isAdmin}
                              onChange={e => changeHandle(e, i)}
                            />
                          </TableCell>
                          <TableCell align="justify">
                            <Tooltip title="Save" placement="top">
                              <span className={classes.iconBtn}>
                                <Button
                                  color="primary"
                                  variant="contained"
                                  size="small"
                                  disabled={
                                    !(
                                      typeof updatedUsers[user._id] !==
                                        "undefined" &&
                                      updatedUsers[user._id] !== user.isAdmin
                                    )
                                  }
                                >
                                  <SaveIcon />
                                </Button>
                              </span>
                            </Tooltip>
                            <Tooltip title="Delete" placement="top">
                              <span className={classes.iconBtn}>
                                <Button
                                  color="secondary"
                                  variant="contained"
                                  size="small"
                                >
                                  <DeleteIcon />
                                </Button>
                              </span>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Grid>
      </Grid>
    )
  )
}

export default Users
