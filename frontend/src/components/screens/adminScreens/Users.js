import React, { useEffect, useState } from "react"

import { navigate } from "gatsby"

import { useDispatch, useSelector } from "react-redux"
import {
  deleteUser,
  listAllUsers,
  updateUserPermissions,
} from "../../../redux/actions/userActions"
import {
  USER_DELETE_RESET,
  USER_LIST_ALL_RESET,
  USER_UPDATE_ADMIN_RESET,
} from "../../../redux/constants/userConstants"

import {
  Button,
  Checkbox,
  Grid,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete"
import SaveIcon from "@material-ui/icons/Save"
import { Alert } from "@material-ui/lab"

import Loader from "../../Loader"
import DeleteDialog from "../../DeleteDialog"

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
  alert: {
    marginBottom: 8,
  },
}))

const Users = () => {
  const [updatedUsers, setUpdatedUsers] = useState([])
  const [userToDelete, setUserToDelete] = useState(null)
  const classes = useStyles()

  const dispatch = useDispatch()
  const { userInfo } = useSelector(state => state.userLogin)
  const { loading, users, success, error } = useSelector(
    state => state.userListAll
  )
  const {
    loading: updateLoading,
    success: updateSuccess,
    error: updateError,
  } = useSelector(state => state.userUpdateAdmin)
  const {
    loading: deleteLoading,
    success: deleteSuccess,
    error: deleteError,
  } = useSelector(state => state.userDelete)

  const resetAlerts = () => {
    dispatch({ type: USER_UPDATE_ADMIN_RESET })
    dispatch({ type: USER_DELETE_RESET })
  }

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) navigate("/login")
    else if (
      !users ||
      (users.length === 0 && !success) ||
      updateSuccess ||
      deleteSuccess
    )
      dispatch(listAllUsers())
  }, [userInfo, updateSuccess, deleteSuccess])

  useEffect(() => {
    return () => {
      dispatch({ type: USER_LIST_ALL_RESET })
      resetAlerts()
    }
  }, [])

  const changeHandle = (e, i) => {
    setUpdatedUsers(prevState => {
      prevState[users[i]._id] = e.target.checked
      return { ...prevState }
    })
  }

  const updatePermissionsHandle = (userId, isAdmin) => {
    resetAlerts()
    dispatch(updateUserPermissions(userId, isAdmin))
  }

  const deleteHandle = () => {
    resetAlerts()
    dispatch(deleteUser(userToDelete))
    setUserToDelete(null)
  }

  console.log(updatedUsers)
  return (
    <Grid container justify="center">
      {userInfo && userInfo.isAdmin && (
        <Grid item md={10} sm={12} xs={12}>
          <Typography variant="h1">USERS</Typography>

          {loading ? (
            <Loader />
          ) : (
            <>
              {error && (
                <Alert className={classes.alert} severity="error">
                  {error}
                </Alert>
              )}
              {updateError && (
                <Alert className={classes.alert} severity="error">
                  {updateError}
                </Alert>
              )}
              {updateSuccess && (
                <Alert className={classes.alert} severity="success">
                  User updated!
                </Alert>
              )}
              {deleteError && (
                <Alert className={classes.alert} severity="error">
                  {deleteError}
                </Alert>
              )}
              {deleteSuccess && (
                <Alert className={classes.alert} severity="success">
                  User deleted!
                </Alert>
              )}
              <TableContainer component={Paper} style={{ marginTop: 10 }}>
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
                                defaultChecked={
                                  typeof updatedUsers[user._id] !== "undefined"
                                    ? updatedUsers[user._id]
                                    : user.isAdmin
                                }
                                onChange={e => changeHandle(e, i)}
                                disabled={user._id === userInfo._id}
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
                                      ) || updateLoading === user._id
                                    }
                                    onClick={() =>
                                      updatePermissionsHandle(
                                        user._id,
                                        updatedUsers[user._id]
                                      )
                                    }
                                  >
                                    <SaveIcon />
                                    {updateLoading === user._id && (
                                      <Loader button />
                                    )}
                                  </Button>
                                </span>
                              </Tooltip>
                              <Tooltip title="Delete" placement="top">
                                <span className={classes.iconBtn}>
                                  <Button
                                    color="secondary"
                                    variant="contained"
                                    size="small"
                                    disabled={
                                      user._id === userInfo._id ||
                                      deleteLoading === user._id
                                    }
                                    onClick={() => setUserToDelete(user._id)}
                                  >
                                    <DeleteIcon />
                                    {deleteLoading === user._id && (
                                      <Loader button />
                                    )}
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
            </>
          )}
        </Grid>
      )}
      <DeleteDialog
        title={"Are you sure?"}
        description={"This action cannot be undone"}
        open={Boolean(userToDelete)}
        handleClose={() => setUserToDelete(null)}
        handleDelete={deleteHandle}
      />
    </Grid>
  )
}

export default Users
