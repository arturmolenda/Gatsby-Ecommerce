import {
  CART_ADD_ITEM_REQUEST,
  CART_ADD_ITEM_SUCCESS,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/cartConstants"

import axios from "axios"
import { DISCOUNT_VALIDATE_RESET } from "../constants/discountConstats"

export const addToCart = (id, qty) => async (dispatch, getState) => {
  dispatch({ type: CART_ADD_ITEM_REQUEST, payload: id })
  const { data } = await axios.get(`/api/products?id=${id}`)
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
  dispatch({ type: DISCOUNT_VALIDATE_RESET })
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = id => async (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  })
  dispatch({ type: DISCOUNT_VALIDATE_RESET })
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = address => async (dispatch, getState) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: address,
  })
  localStorage.setItem("shippingAddress", JSON.stringify(address))
}

export const savePaymentMethod = paymentMethod => async (
  dispatch,
  getState
) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: paymentMethod,
  })
  localStorage.setItem("paymentMethod", JSON.stringify(paymentMethod))
}
