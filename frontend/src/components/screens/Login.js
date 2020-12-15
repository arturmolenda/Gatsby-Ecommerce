import React, { useEffect, useState } from "react"
import { Link, navigate } from "gatsby"
import { Helmet } from "react-helmet"

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

const Login = ({ location, productReviewLogin }) => {
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const dispatch = useDispatch()
  const { loading, error, userInfo } = useSelector(state => state.userLogin)

  const redirect =
    location && location.search ? `/${location.search.split("=")[1]}` : "/"

  const gridProps = productReviewLogin
    ? { lg: 12, md: 12, sm: 12, xs: 12 }
    : { lg: 4, md: 6, sm: 8, xs: 8 }

  useEffect(() => {
    if (userInfo && !productReviewLogin) navigate(redirect)
  }, [dispatch, userInfo, productReviewLogin, redirect])

  const validate = () => {
    let returnVal = true
    // eslint-disable-next-line
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
      <Helmet title="Login" />
      {redirect === "/shipping" && <Steps activeStep={0} />}
      <Grid container justify="center">
        <Grid item {...gridProps}>
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
        <Grid item {...gridProps}>
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
