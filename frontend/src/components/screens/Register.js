import React, { useEffect, useState } from "react"
import { Link, navigate } from "gatsby"
import { useDispatch, useSelector } from "react-redux"
import { register } from "../../redux/actions/userActions"

import {
  Button,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import VisibilityIcon from "@material-ui/icons/Visibility"
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff"

import Loader from "../Loader"

const Login = () => {
  const [name, setName] = useState("")
  const [nameError, setNameError] = useState("")
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [confirmPasswordError, setConfirmPasswordError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const dispatch = useDispatch()
  const { loading, error, userInfo } = useSelector(state => state.userRegister)
  const { userInfo: userLoggedIn } = useSelector(state => state.userLogin)

  useEffect(() => {
    if (userInfo || userLoggedIn) navigate("/")
  }, [dispatch, userInfo])

  const validate = () => {
    let returnVal = true
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (name === "") {
      returnVal = false
      setNameError("Name cannot be empty!")
    }
    if (!regex.test(email.toLowerCase())) {
      returnVal = false
      setEmailError("Please use full email address (i.e., john@example.com)")
    } else {
      returnVal = returnVal ? returnVal : false
      setEmailError("")
    }
    if (password.length >= 7) {
      returnVal = returnVal ? returnVal : false
      setPasswordError("")
    } else {
      returnVal = false
      setPasswordError("Must be at least 7 characters long")
    }
    if (password !== confirmPassword) {
      returnVal = false
      setConfirmPasswordError("Passwords do not match")
    } else if (confirmPassword === "") {
      returnVal = false
      setConfirmPasswordError("Cannot be empty!")
    }
    return returnVal
  }
  const submitHandle = e => {
    e.preventDefault()
    const isValidated = validate()
    if (isValidated) {
      dispatch(register(name, email, password))
    }
  }

  const emailChange = e => {
    setEmailError("")
    setEmail(e.target.value)
  }
  const passwordChange = e => {
    setPasswordError("")
    setPassword(e.target.value)
  }
  const nameChange = e => {
    setNameError("")
    setName(e.target.value)
  }
  const confirmPasswordChange = e => {
    if (confirmPasswordError === "Passwords do not match") {
      if (password === e.target.value) setConfirmPasswordError("")
    } else setConfirmPasswordError("")
    setConfirmPassword(e.target.value)
  }
  return (
    <>
      <Grid container justify="center">
        <Grid item lg={4} md={6} sm={8} xs={8}>
          <form onSubmit={submitHandle} style={{ display: "grid" }}>
            <Typography variant="h1">SIGN UP</Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <TextField
              type="text"
              label="Name *"
              variant="filled"
              margin="dense"
              error={Boolean(nameError)}
              helperText={nameError}
              value={name}
              onChange={nameChange}
            />
            <TextField
              type="email"
              label="Email *"
              variant="filled"
              margin="dense"
              error={Boolean(emailError)}
              helperText={emailError}
              value={email}
              onChange={emailChange}
            />
            <TextField
              type={showPassword ? "text" : "password"}
              label="Password *"
              variant="filled"
              margin="dense"
              error={Boolean(passwordError)}
              helperText={passwordError}
              value={password}
              onChange={passwordChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      style={{ padding: 8 }}
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(prevVal => !prevVal)}
                    >
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              type={showConfirmPassword ? "text" : "password"}
              label="Confirm Password *"
              variant="filled"
              margin="dense"
              error={Boolean(confirmPasswordError)}
              helperText={confirmPasswordError}
              value={confirmPassword}
              onChange={confirmPasswordChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      style={{ padding: 8 }}
                      aria-label="toggle password visibility"
                      onClick={() =>
                        setShowConfirmPassword(prevVal => !prevVal)
                      }
                    >
                      {showConfirmPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              style={{ marginTop: 10 }}
            >
              Register
              {loading && <Loader button />}
            </Button>
          </form>
        </Grid>
      </Grid>

      <Divider style={{ margin: 40 }} />
      <Grid container justify="center">
        <Grid item lg={4} md={6} sm={8} xs={8}>
          <Typography variant="h1">HAVE AN ACCOUNT?</Typography>
          <Link to="/login">
            <Button fullWidth variant="outlined">
              LOGIN
            </Button>
          </Link>
        </Grid>
      </Grid>
    </>
  )
}

export default Login
