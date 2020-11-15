import { FormControl, InputLabel, Select } from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import React from "react"
import Loader from "./Loader"

const QtySelect = ({
  countInStock,
  label,
  value,
  changeHandle,
  loading,
  maxWidth,
}) =>
  countInStock >= 1 ? (
    <FormControl variant="outlined" fullWidth={maxWidth}>
      {label && <InputLabel>{label}</InputLabel>}
      <Select
        style={{ backgroundColor: "rgba(0,0,0,0.05)" }}
        native
        label={label}
        value={value}
        onChange={changeHandle}
        disabled={loading}
      >
        {countInStock >= 5
          ? [...Array(5).keys()].map(val => (
              <option key={val} value={val + 1}>
                {val + 1}
              </option>
            ))
          : [...Array(countInStock + 1).keys()].map(val => (
              <option key={val} value={val + 1}>
                {val + 1}
              </option>
            ))}
      </Select>
      {loading && <Loader button />}
    </FormControl>
  ) : (
    <Alert severity="warning">Out of stock</Alert>
  )

export default QtySelect
