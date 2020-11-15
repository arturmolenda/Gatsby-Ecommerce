import {
  CART_ADD_ITEM_REQUEST,
  CART_ADD_ITEM_SUCCESS,
  CART_REMOVE_ITEM,
} from "../constants/cartConstants"

import axios from "axios"

export const addToCart = (id, qty) => async (dispatch, getState) => {
  dispatch({ type: CART_ADD_ITEM_REQUEST, payload: id })
  const { data } = await axios.get(`/api/products?id=${id}`)
  console.log(data)
  console.log(getState())
  dispatch({
    type: CART_ADD_ITEM_SUCCESS,
    payload: {
      product: data._id,
      name: data.name,
      image: data.images[0].image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  })
  console.log(getState())
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = id => async (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  })
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}
