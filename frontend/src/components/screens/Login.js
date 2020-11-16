import React, { useEffect, useState } from "react"
import { Link, navigate } from "gatsby"

import { useDispatch, useSelector } from "react-redux"
import { login } from "../../redux/actions/userActions"

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
import Steps from "../Steps"

const Login = ({ location }) => {
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const dispatch = useDispatch()
  const { loading, error, userInfo } = useSelector(state => state.userLogin)

  console.log(location)
  const redirect = location.search ? `/${location.search.split("=")[1]}` : "/"

  useEffect(() => {
    if (userInfo) navigate(redirect)
  }, [dispatch, userInfo])

  const validate = () => {
    let returnVal = true
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!regex.test(email.toLowerCase())) {
      returnVal = false
      setEmailError("Please use full email address (i.e., john@example.com)")
    } else {
      returnVal = returnVal ? returnVal : false
      setEmailError("")
    }
    if (password === "") {
      returnVal = false
      setPasswordError("Cannot be empty!")
    }
    return returnVal
  }
  const submitHandle = e => {
    e.preventDefault()
    const validation = validate()
    if (validation) {
      dispatch(login(email, password))
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
  return (
    <>
      {redirect === "/shipping" && <Steps activeStep={0} />}
      <Grid container justify="center">
        <Grid item lg={4} md={6} sm={8} xs={8}>
          <form onSubmit={submitHandle} style={{ display: "grid" }}>
            <Typography variant="h1">SIGN IN</Typography>
            {error && <Alert severity="error">{error}</Alert>}
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
              type={showPassword ? "text" : "password"}
              label="Password"
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
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              style={{ marginTop: 10 }}
            >
              Login
              {loading && <Loader button />}
            </Button>
          </form>
        </Grid>
      </Grid>

      <Divider style={{ margin: 40 }} />
      <Grid container justify="center">
        <Grid item lg={4} md={6} sm={8} xs={8}>
          <Typography variant="h1">NEW CUSTOMER?</Typography>
          <Link
            to={redirect === "/" ? "/register" : `/register${location.search}`}
          >
            <Button fullWidth variant="outlined">
              Register
            </Button>
          </Link>
        </Grid>
      </Grid>
    </>
  )
}

export default Login
