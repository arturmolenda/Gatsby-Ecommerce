import React, { useState } from "react"

import { useDispatch, useSelector } from "react-redux"
import { logout } from "../redux/actions/userActions"

import { makeStyles, fade } from "@material-ui/core/styles"
import { Link, navigate } from "gatsby"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart"
import {
  Badge,
  ClickAwayListener,
  MenuItem,
  Paper,
  Popper,
  InputBase,
} from "@material-ui/core"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import SearchIcon from "@material-ui/icons/Search"

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
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}))

const Navbar = () => {
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
        <Toolbar style={{ justifyContent: "space-between" }}>
          <div style={{ display: "flex" }}>
            <Typography variant="h6" className={classes.title}>
              <Link to="/">Gatsby Store</Link>
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
                onKeyPress={searchHandle}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
          </div>
          <div>
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
                  <>
                    <Button
                      className={classes.link}
                      color="inherit"
                      onClick={e => setAdminAnchorEl(e.currentTarget)}
                      endIcon={<ExpandMoreIcon />}
                    >
                      admin
                    </Button>
                    <Popper
                      anchorEl={adminAnchorEl}
                      open={Boolean(adminAnchorEl)}
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
                      <ClickAwayListener
                        onClickAway={() => setAdminAnchorEl(null)}
                      >
                        <Paper style={{ minWidth: 150, padding: "8px 0" }}>
                          <Link to="/admin/users">
                            <MenuItem onClick={() => setAdminAnchorEl(null)}>
                              Users
                            </MenuItem>
                          </Link>
                          <Link to="/admin/products">
                            <MenuItem onClick={() => setAdminAnchorEl(null)}>
                              Products
                            </MenuItem>
                          </Link>
                          <Link to="/admin/orders">
                            <MenuItem onClick={() => setAdminAnchorEl(null)}>
                              Orders
                            </MenuItem>
                          </Link>
                          <Link to="/admin/discounts">
                            <MenuItem onClick={() => setAdminAnchorEl(null)}>
                              Discounts
                            </MenuItem>
                          </Link>
                        </Paper>
                      </ClickAwayListener>
                    </Popper>
                  </>
                )}
                <Button
                  className={classes.link}
                  color="inherit"
                  onClick={e => setAnchorEl(e.currentTarget)}
                  endIcon={<ExpandMoreIcon />}
                >
                  {userInfo.name}
                </Button>
                <Popper
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
    </div>
  )
}
export default Navbar
