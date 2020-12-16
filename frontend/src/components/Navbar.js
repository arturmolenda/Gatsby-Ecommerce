import React, { useState } from "react"

import { useDispatch, useSelector } from "react-redux"
import { logout } from "../redux/actions/userActions"

import { makeStyles } from "@material-ui/core/styles"
import { Link, navigate } from "gatsby"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import {
  Badge,
  ClickAwayListener,
  MenuItem,
  Paper,
  Popper,
} from "@material-ui/core"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart"
import MenuIcon from "@material-ui/icons/Menu"
import SearchField from "./SearchField"
import DrawerMenu from "./DrawerMenu"

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  toolbar: {
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      padding: "0 0 0 6px",
    },
  },
  header: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      justifyContent: "space-between",
    },
  },
  title: {
    flexGrow: 1,
    marginRight: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
    },
  },
  link: {
    margin: "0 3px",
    color: "#d0d0d0",
    "&:hover": {
      color: "#fff",
    },
  },
  menuBtn: {
    display: "none",
    minWidth: 36,
    maxWidth: 36,
    marginRight: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      display: "inline-flex",
    },
    "&:hover": {
      backgroundColor: "rgb(255 255 255 / 10%)",
    },
  },
  menuItems: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}))

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [adminAnchorEl, setAdminAnchorEl] = useState(null)
  const [keyword, setKeyword] = useState("")
  const classes = useStyles()
  const dispatch = useDispatch()
  const { userInfo } = useSelector(state => state.userLogin)
  const { cartItems } = useSelector(state => state.cart)

  const logoutHandle = () => {
    dispatch(logout())
    setAnchorEl(null)
  }

  const searchHandle = e => {
    if (e.key === "Enter") {
      if (keyword.trim() === "") navigate("/")
      else navigate(`/search/${keyword}`)
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <div className={classes.header}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Button
                className={classes.menuBtn}
                onClick={() => setDrawerOpen(true)}
              >
                <MenuIcon style={{ fill: "#fff" }} />
              </Button>
              <Typography variant="h6" className={classes.title}>
                <Link to="/">Gatsby Store</Link>
              </Typography>
            </div>
            <SearchField
              value={keyword}
              changeHandle={e => setKeyword(e.target.value)}
              searchHandle={searchHandle}
            />
          </div>
          <div className={classes.menuItems}>
            <Link className={classes.link} to="/cart">
              <Button
                color="inherit"
                startIcon={
                  <Badge
                    color="secondary"
                    variant="dot"
                    badgeContent={cartItems.length}
                  >
                    <ShoppingCartIcon
                      style={{ width: ".8em", height: ".8em" }}
                    />
                  </Badge>
                }
              >
                CART
              </Button>
            </Link>
            {userInfo ? (
              <>
                {userInfo.isAdmin && (
                  <Button
                    className={classes.link}
                    color="inherit"
                    onClick={e => setAdminAnchorEl(e.currentTarget)}
                    endIcon={<ExpandMoreIcon />}
                  >
                    admin
                  </Button>
                )}
                <Button
                  className={classes.link}
                  color="inherit"
                  onClick={e => setAnchorEl(e.currentTarget)}
                  endIcon={<ExpandMoreIcon />}
                >
                  {userInfo.name.length > 19
                    ? `${userInfo.name.substring(0, 19)}...`
                    : userInfo.name}
                </Button>
                <Popper
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  style={{ zIndex: 1 }}
                >
                  <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
                    <Paper style={{ minWidth: 150, padding: "8px 0" }}>
                      <Link to="/profile">
                        <MenuItem onClick={() => setAnchorEl(null)}>
                          Profile
                        </MenuItem>
                      </Link>
                      <MenuItem onClick={logoutHandle}>Logout</MenuItem>
                    </Paper>
                  </ClickAwayListener>
                </Popper>
              </>
            ) : (
              <>
                <Link className={classes.link} to="/login">
                  <Button color="inherit">Login</Button>
                </Link>
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
      <Popper
        anchorEl={adminAnchorEl}
        open={Boolean(adminAnchorEl)}
        style={{ zIndex: 1 }}
      >
        <ClickAwayListener onClickAway={() => setAdminAnchorEl(null)}>
          <Paper style={{ minWidth: 150, padding: "8px 0" }}>
            <Link to="/admin/users">
              <MenuItem onClick={() => setAdminAnchorEl(null)}>Users</MenuItem>
            </Link>
            <Link to="/admin/products">
              <MenuItem onClick={() => setAdminAnchorEl(null)}>
                Products
              </MenuItem>
            </Link>
            <Link to="/admin/orders">
              <MenuItem onClick={() => setAdminAnchorEl(null)}>Orders</MenuItem>
            </Link>
            <Link to="/admin/discounts">
              <MenuItem onClick={() => setAdminAnchorEl(null)}>
                Discounts
              </MenuItem>
            </Link>
          </Paper>
        </ClickAwayListener>
      </Popper>
      <DrawerMenu
        open={drawerOpen}
        closeHandle={() => setDrawerOpen(false)}
        itemsLength={cartItems.length}
        isLoggedIn={userInfo}
        isAdmin={userInfo && userInfo.isAdmin}
        logoutHandle={logoutHandle}
      />
    </div>
  )
}
export default Navbar
