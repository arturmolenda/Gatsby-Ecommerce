import React, { useState } from "react"

import { useDispatch, useSelector } from "react-redux"
import { logout } from "../redux/actions/userActions"

import { makeStyles } from "@material-ui/core/styles"
import { Link } from "gatsby"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart"
import { Badge, Menu, MenuItem } from "@material-ui/core"
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    margin: "0 3px",
    color: "#d0d0d0",
    "&:hover": {
      color: "#fff",
    },
  },
}))

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const classes = useStyles()
  const dispatch = useDispatch()
  const { userInfo } = useSelector(state => state.userLogin)
  const { cartItems } = useSelector(state => state.cart)

  const logoutHandle = () => dispatch(logout())

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to="/">Gatsby Store</Link>
          </Typography>
          <Link className={classes.link} to="/cart">
            <Button
              color="inherit"
              startIcon={
                <Badge
                  color="secondary"
                  variant="dot"
                  badgeContent={cartItems.length}
                >
                  <ShoppingCartIcon style={{ width: ".8em", height: ".8em" }} />
                </Badge>
              }
            >
              CART
            </Button>
          </Link>
          {userInfo ? (
            <>
              <Button
                className={classes.link}
                color="inherit"
                onClick={e => setAnchorEl(e.currentTarget)}
              >
                {userInfo.name}
              </Button>
              <Menu
                onClose={() => setAnchorEl(null)}
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                getContentAnchorEl={null}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <div style={{ minWidth: 150 }}>
                  <Link to="/profile">
                    <MenuItem>Profile</MenuItem>
                  </Link>
                  <MenuItem onClick={logoutHandle}>Logout</MenuItem>
                </div>
              </Menu>
            </>
          ) : (
            <>
              <Link className={classes.link} to="/login">
                <Button color="inherit">Login</Button>
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}
export default Navbar
