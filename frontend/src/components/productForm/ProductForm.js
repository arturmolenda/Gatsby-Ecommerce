import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@material-ui/core"
import React from "react"
import ImagesUpload from "./ImagesUpload"
import LabelField from "./LabelField"

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
  discountChange,
  labels,
  setLabels,
  showProduct,
  showProductChange,
}) => {
  return (
    <form style={{ display: "flex", flexDirection: "column" }}>
      <ImagesUpload images={images} setImages={setImages} />
      <TextField
        type="text"
        label="Name"
        variant="filled"
        margin="dense"
        value={name}
        onChange={nameChange}
      />
      <TextField
        type="number"
        label="Price"
        variant="filled"
        margin="dense"
        value={price}
        onChange={priceChange}
      />
      <TextField
        type="text"
        label="Category"
        variant="filled"
        margin="dense"
        value={category}
        onChange={categoryChange}
      />
      <TextField
        type="number"
        label="Count In Stock"
        variant="filled"
        margin="dense"
        value={qty}
        onChange={qtyChange}
      />
      <TextField
        type="text"
        label="Brand"
        variant="filled"
        margin="dense"
        value={brand}
        onChange={brandChange}
      />
      <TextField
        type="number"
        label="Discount in %"
        variant="filled"
        margin="dense"
        value={discount}
        onChange={discountChange}
      />
      <TextField
        type="text"
        label="Description"
        variant="filled"
        margin="normal"
        multiline
        value={description}
        onChange={descriptionChange}
      />
      <LabelField labels={labels} setLabels={setLabels} />
      <FormControlLabel
        control={
          <Checkbox checked={showProduct} onChange={showProductChange} />
        }
        label="Show Product"
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        style={{ marginTop: 15 }}
      >
        Save
      </Button>
    </form>
  )
}

export default ProductForm
