import React, { useEffect, useState } from "react"

import { navigate } from "gatsby"
import { Helmet } from "react-helmet"

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
  TablePagination,
  TableRow,
  Typography,
} from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete"
import SaveIcon from "@material-ui/icons/Save"
import { Alert } from "@material-ui/lab"

import Loader from "../../Loader"
import DeleteDialog from "../../DeleteDialog"
import SearchField from "../../SearchField"

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
    minWidth: 40,
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
  const [keyword, setKeyword] = useState("")
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const classes = useStyles()

  const dispatch = useDispatch()
  const { userInfo } = useSelector(state => state.userLogin)
  const {
    loading,
    users,
    page,
    totalRows,
    rowsSize,
    success,
    error,
  } = useSelector(state => state.userListAll)
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
      if (page && totalRows && keyword) {
        dispatch(listAllUsers(page, rowsPerPage, keyword))
      } else dispatch(listAllUsers())
    // eslint-disable-next-line
  }, [userInfo, updateSuccess, deleteSuccess])

  useEffect(() => {
    return () => {
      dispatch({ type: USER_LIST_ALL_RESET })
      resetAlerts()
    }
    // eslint-disable-next-line
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

  const changePageHandle = (e, newPage) => {
    dispatch(listAllUsers(newPage, rowsPerPage, keyword))
  }
  const changeRowsPerPageHandle = e => {
    setRowsPerPage(e.target.value)
    dispatch(listAllUsers(page, e.target.value, keyword))
  }
  const searchHandle = e => {
    if (e.key === "Enter") dispatch(listAllUsers(page, rowsPerPage, keyword))
  }

  return (
    <>
      <Helmet title="Admin Users" />
      <Grid container justify="center">
        {userInfo && userInfo.isAdmin && (
          <Grid item md={10} sm={12} xs={12}>
            <Typography variant="h1">USERS</Typography>

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
              <SearchField
                value={keyword}
                changeHandle={e => setKeyword(e.target.value)}
                searchHandle={searchHandle}
                placeholder="Find User..."
                whiteTheme
                disabled={loading}
              />
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
                  {!loading && (
                    <TableBody>
                      {users &&
                        users.length !== 0 &&
                        users.map((user, i) => (
                          <TableRow
                            key={user._id}
                            className={classes.tableBackground}
                          >
                            <TableCell>{user._id}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
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
                            <TableCell>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-evenly",
                                }}
                              >
                                <Button
                                  className={classes.iconBtn}
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
                                <Button
                                  className={classes.iconBtn}
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
                    count={totalRows || 0}
                    rowsPerPage={rowsSize || 5}
                    page={page || 0}
                    onChangePage={changePageHandle}
                    onChangeRowsPerPage={changeRowsPerPageHandle}
                  />
                )}
              </TableContainer>
            </>
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
    </>
  )
}

export default Users
