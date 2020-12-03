import React from "react"

import { makeStyles, fade } from "@material-ui/core/styles"
import { InputBase } from "@material-ui/core"
import SearchIcon from "@material-ui/icons/Search"

const useStyles = makeStyles(theme => ({
  search: {
    position: "relative",
    backgroundColor: props =>
      fade(theme.palette.common.white, props.whiteTheme ? 1 : 0.15),
    "&:hover": {
      backgroundColor: props =>
        fade(theme.palette.common.white, props.whiteTheme ? 0.65 : 0.25),
    },
    marginRight: theme.spacing(2),
    width: "auto",
    maxWidth: props => (props.whiteTheme ? "30%" : "auto"),
    borderRadius: props => (props.whiteTheme ? 25 : theme.shape.borderRadius),
    marginBottom: props => props.whiteTheme && 10,
    display: "inline-block",
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
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  whiteThemeInput: {
    padding: "16px 8px 16px 0",
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
  },
}))

const SearchField = ({
  value,
  changeHandle,
  searchHandle,
  placeholder = "Search...",
  disabled,
  whiteTheme,
}) => {
  const classes = useStyles({ whiteTheme })
  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder={placeholder}
        value={value}
        onChange={changeHandle}
        onKeyPress={searchHandle}
        classes={{
          root: classes.inputRoot,
          input: `${classes.inputInput} ${
            whiteTheme && classes.whiteThemeInput
          }`,
        }}
        inputProps={{ "aria-label": "search" }}
        disabled={disabled}
      />
    </div>
  )
}

export default SearchField
