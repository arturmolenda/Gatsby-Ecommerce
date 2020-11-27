import {
  Button,
  Checkbox,
  FormControlLabel,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core"
import React from "react"
import ImagesUpload from "./ImagesUpload"
import LabelField from "./LabelField"

const useStyles = makeStyles(() => ({
  header: {
    fontSize: "1.2rem",
    color: "#676767",
    marginTop: 20,
  },
}))

const ProductForm = ({
  name,
  nameChange,
  price,
  priceChange,
  images,
  setImages,
  category,
  categoryChange,
  qty,
  qtyChange,
  brand,
  brandChange,
  description,
  descriptionChange,
  discount,
  setDiscount,
  labels,
  setLabels,
  showProduct,
  showProductChange,
}) => {
  const classes = useStyles()
  const updateDiscount = (e, name) => {
    setDiscount(prevState => {
      prevState[name] = e.target.value
      if (name === "amount" && e.target.value > 0) {
        prevState.totalPrice = (
          parseFloat(price) -
          (parseFloat(price) * (e.target.value / 100)).toFixed(2)
        ).toFixed(2)
      }
      return { ...prevState }
    })
  }
  const updatePrice = e => {
    priceChange(e)
    if (discount.amount > 0) {
      setDiscount(prevState => {
        prevState.totalPrice = (
          parseFloat(e.target.value) -
          (parseFloat(e.target.value) * (discount.amount / 100)).toFixed(2)
        ).toFixed(2)
      })
    }
  }

  console.log(discount)
  return (
    <>
      <Typography variant="h3" className={classes.header}>
        IMAGES
      </Typography>
      <ImagesUpload images={images} setImages={setImages} />
      <Typography variant="h3" className={classes.header}>
        PRODUCT DETAILS
      </Typography>
      <TextField
        required
        type="text"
        label="Name"
        variant="filled"
        margin="dense"
        value={name}
        onChange={nameChange}
      />
      <TextField
        required
        type="number"
        label="Price"
        variant="filled"
        margin="dense"
        value={price}
        onChange={e => updatePrice(e)}
      />
      <TextField
        required
        type="text"
        label="Category"
        variant="filled"
        margin="dense"
        value={category}
        onChange={categoryChange}
      />
      <TextField
        required
        type="number"
        label="Count In Stock"
        variant="filled"
        margin="dense"
        value={qty}
        onChange={qtyChange}
      />
      <TextField
        required
        type="text"
        label="Brand"
        variant="filled"
        margin="dense"
        value={brand}
        onChange={brandChange}
      />
      <TextField
        required
        type="text"
        label="Description"
        variant="filled"
        margin="normal"
        multiline
        value={description}
        onChange={descriptionChange}
      />
      <Typography variant="h3" className={classes.header}>
        DISCOUNT
      </Typography>
      <TextField
        type="number"
        label="Discount in %"
        variant="filled"
        margin="dense"
        value={discount.amount}
        onChange={e => updateDiscount(e, "amount")}
      />
      <TextField
        label="Discount expire date"
        variant="filled"
        type="date"
        disablePast
        value={discount.expireDate}
        onChange={e => updateDiscount(e, "expireDate")}
        InputLabelProps={{
          shrink: true,
        }}
      />

      <Typography variant="h3" className={classes.header}>
        LABELS
      </Typography>
      <LabelField labels={labels} setLabels={setLabels} />
      <FormControlLabel
        control={
          <Checkbox checked={showProduct} onChange={showProductChange} />
        }
        label="Show Product"
      />
    </>
  )
}

export default ProductForm
