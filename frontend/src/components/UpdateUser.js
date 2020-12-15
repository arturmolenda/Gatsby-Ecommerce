import { Breadcrumbs, Button, makeStyles, TextField } from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateUserDetails } from "../redux/actions/userActions"
import Loader from "./Loader"

const useStyles = makeStyles(theme => ({
  breadcrumbs: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.primary.main,
    marginBottom: 10,
    color: "#cacaca",
    "& button": {
      margin: 0,
      color: "#cacaca",
      "&:hover": {
        color: "#fff",
      },
    },
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
  },
}))

const UpdateUser = () => {
  const [name, setName] = useState("")
  const [nameError, setNameError] = useState("")
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [newPasswordError, setNewPasswordError] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState("")
  const [confirmNewPasswordError, setConfirmNewPasswordError] = useState("")
  const [details, setDetails] = useState(true)
  const classes = useStyles()

  const dispatch = useDispatch()
  const { userInfo } = useSelector(state => state.userLogin)
  const { loading, success, error } = useSelector(state => state.userUpdate)

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name)
      setEmail(userInfo.email)
    }
  }, [userInfo])

  const validate = () => {
    let isValid = true
    if (details) {
      // eslint-disable-next-line
      const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (!regex.test(email.toLowerCase())) {
        isValid = false
        setEmailError("Please use full email address (i.e., john@example.com)")
      }
      if (name.trim() === "") {
        isValid = false
        setNameError("Name cannot be empty")
      }
    } else {
      if (newPassword.length < 7) {
        isValid = false
        setNewPasswordError("Must be at least 7 characters long")
      }
      if (confirmNewPassword === "") {
        isValid = false
        setConfirmNewPasswordError("Cannot be empty!")
      }
      if (newPassword !== confirmNewPassword) {
        isValid = false
        setConfirmNewPasswordError("Passwords do not match")
      }
    }
    if (password === "") {
      isValid = false
      setPasswordError("Cannot be empty")
    }
    return isValid
  }

  const emailChange = e => {
    setEmail(e.target.value)
    setEmailError("")
  }
  const passwordChange = e => {
    setPassword(e.target.value)
    setPasswordError("")
  }
  const nameChange = e => {
    setName(e.target.value)
    setNameError("")
  }
  const newPasswordChange = e => {
    setNewPassword(e.target.value)
    setNewPasswordError("")
  }
  const confirmNewPasswordChange = e => {
    setConfirmNewPassword(e.target.value)
    setConfirmNewPasswordError("")
  }

  const submitHandle = e => {
    e.preventDefault()
    const isValid = validate()
    if (isValid) {
      console.log("submit")
      if (details) dispatch(updateUserDetails({ name, email, password }))
      else dispatch(updateUserDetails({ newPassword, password }))
    }
  }

  return (
    <div>
      {/* eslint-disable-next-line */}
      <Breadcrumbs className={classes.breadcrumbs}>
        <Button
          disableRipple
          onClick={() => setDetails(true)}
          style={{ color: details && "#fff" }}
        >
          Details
        </Button>
        <Button
          disableRipple
          onClick={() => setDetails(false)}
          style={{ color: !details && "#fff" }}
        >
          Password
        </Button>
      </Breadcrumbs>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">Profile details updated!</Alert>}
      <form onSubmit={submitHandle} className={classes.formContainer}>
        {details ? (
          <>
            <TextField
              type="text"
              label="Name"
              variant="filled"
              margin="dense"
              error={Boolean(nameError)}
              helperText={nameError}
              value={name}
              onChange={nameChange}
            />
            <TextField
              type="email"
              label="Email"
              variant="filled"
              margin="dense"
              error={Boolean(emailError)}
              helperText={emailError}
              value={email}
              onChange={emailChange}
            />
            <TextField
              type="password"
              label="Current Password"
              variant="filled"
              margin="dense"
              error={Boolean(passwordError)}
              helperText={passwordError}
              value={password}
              onChange={passwordChange}
            />
          </>
        ) : (
          <>
            <TextField
              type="password"
              label="New Password"
              variant="filled"
              margin="dense"
              error={Boolean(newPasswordError)}
              helperText={newPasswordError}
              value={newPassword}
              onChange={newPasswordChange}
            />
            <TextField
              type="password"
              label="Cofirm New Password"
              variant="filled"
              margin="dense"
              error={Boolean(confirmNewPasswordError)}
              helperText={confirmNewPasswordError}
              value={confirmNewPassword}
              onChange={confirmNewPasswordChange}
            />
            <TextField
              type="password"
              label="Current Password"
              variant="filled"
              margin="dense"
              error={Boolean(passwordError)}
              helperText={passwordError}
              value={password}
              onChange={passwordChange}
            />
          </>
        )}
        <Button
          type="submit"
          color="primary"
          variant="contained"
          style={{ marginTop: 10, alignSelf: "flex-start" }}
          size="large"
          disabled={loading}
        >
          Update
          {loading && <Loader button />}
        </Button>
      </form>
    </div>
  )
}

export default UpdateUser
