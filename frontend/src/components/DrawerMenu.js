import React, { useState } from "react"
import { Link } from "gatsby"

import {
  Badge,
  Collapse,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core"
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart"
import ExpandLess from "@material-ui/icons/ExpandLess"
import ExpandMore from "@material-ui/icons/ExpandMore"
const useStyles = makeStyles(theme => ({
  drawer: {
    "& .MuiDrawer-paper": {
      background: "#efefef",
      minWidth: 200,
    },
  },
  title: {
    marginBottom: 15,
    fontWeight: 600,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}))

const DrawerMenu = ({
  open,
  closeHandle,
  itemsLength,
  isLoggedIn,
  isAdmin,
  logoutHandle,
}) => {
  const [adminOpen, setAdminOpen] = useState(false)
  const classes = useStyles()

  const logout = () => {
    closeHandle()
    logoutHandle()
  }
  return (
    <Drawer
      anchor={"left"}
      open={open}
      onClose={closeHandle}
      className={classes.drawer}
    >
      <List>
        <Typography variant="h6" align="center" className={classes.title}>
          <Link to="/" onClick={closeHandle}>
            Gatsby Store
          </Link>
        </Typography>
        <Link to="/cart">
          <ListItem button onClick={closeHandle}>
            <ListItemText
              primary={
                <>
                  <span>Cart</span>
                  <Badge
                    color="secondary"
                    variant="dot"
                    badgeContent={itemsLength}
                  >
                    <ShoppingCartIcon
                      style={{ width: ".8em", height: ".8em", marginLeft: 5 }}
                    />
                  </Badge>
                </>
              }
            />
          </ListItem>
        </Link>

        {isAdmin && (
          <>
            <Divider />
            <ListItem
              button
              onClick={() => setAdminOpen(prevState => !prevState)}
            >
              <ListItemText primary="Admin" />
              {adminOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>

            <Collapse in={adminOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Link to="/admin/users" onClick={closeHandle}>
                  <ListItem button className={classes.nested}>
                    <ListItemText primary={"Users"} />
                  </ListItem>
                </Link>
                <Link to="/admin/products" onClick={closeHandle}>
                  <ListItem button className={classes.nested}>
                    <ListItemText primary={"Products"} />
                  </ListItem>
                </Link>
                <Link to="/admin/orders" onClick={closeHandle}>
                  <ListItem button className={classes.nested}>
                    <ListItemText primary={"Orders"} />
                  </ListItem>
                </Link>
                <Link to="/admin/discounts" onClick={closeHandle}>
                  <ListItem button className={classes.nested}>
                    <ListItemText primary={"Discounts"} />
                  </ListItem>
                </Link>
              </List>
            </Collapse>
          </>
        )}
        {isLoggedIn ? (
          <>
            <Divider />
            <Link to="/profile" onClick={closeHandle}>
              <ListItem button>
                <ListItemText primary={"Profile"} />
              </ListItem>
            </Link>
            <ListItem button onClick={logout}>
              <ListItemText primary={"Logout"} />
            </ListItem>
          </>
        ) : (
          <Link to="/login" onClick={closeHandle}>
            <ListItem button>
              <ListItemText primary={"Login"} />
            </ListItem>
          </Link>
        )}
      </List>
    </Drawer>
  )
}

export default DrawerMenu
