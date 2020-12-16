import axios from "axios"
import {
  DISCOUNT_VALIDATE_FAIL,
  DISCOUNT_VALIDATE_REQUEST,
  DISCOUNT_VALIDATE_SUCCESS,
  DISCOUNT_LIST_ALL_REQUEST,
  DISCOUNT_LIST_ALL_SUCCESS,
  DISCOUNT_LIST_ALL_FAIL,
  DISCOUNT_CREATE_REQUEST,
  DISCOUNT_CREATE_SUCCESS,
  DISCOUNT_CREATE_FAIL,
  DISCOUNT_UPDATE_REQUEST,
  DISCOUNT_UPDATE_SUCCESS,
  DISCOUNT_UPDATE_FAIL,
  DISCOUNT_DELETE_REQUEST,
  DISCOUNT_DELETE_SUCCESS,
  DISCOUNT_DELETE_FAIL,
  DISCOUNT_DETAILS_REQUEST,
  DISCOUNT_DETAILS_SUCCESS,
  DISCOUNT_DETAILS_FAIL,
} from "../constants/discountConstats"

export const applyDiscount = (coupon, price) => async (dispatch, getState) => {
  try {
    dispatch({ type: DISCOUNT_VALIDATE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.post(
      `/api/discounts`,
      { coupon, price },
      config
    )

    dispatch({
      type: DISCOUNT_VALIDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: DISCOUNT_VALIDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listAllDiscounts = (
  page = "",
  rowsSize = 5,
  keyword = ""
) => async (dispatch, getState) => {
  try {
    dispatch({ type: DISCOUNT_LIST_ALL_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(
      `/api/discounts?pageNumber=${page}&keyword=${keyword}&rowsSize=${rowsSize}`,
      config
    )

    dispatch({
      type: DISCOUNT_LIST_ALL_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: DISCOUNT_LIST_ALL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createDiscount = discount => async (dispatch, getState) => {
  try {
    dispatch({ type: DISCOUNT_CREATE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.post(`/api/discounts/new`, discount, config)

    dispatch({ type: DISCOUNT_CREATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: DISCOUNT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateDiscount = (discount, id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DISCOUNT_UPDATE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    await axios.put(`/api/discounts/${id}`, discount, config)

    dispatch({ type: DISCOUNT_UPDATE_SUCCESS })
  } catch (error) {
    dispatch({
      type: DISCOUNT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteDiscount = id => async (dispatch, getState) => {
  try {
    dispatch({ type: DISCOUNT_DELETE_REQUEST, payload: id })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    await axios.delete(`/api/discounts/${id}`, config)

    dispatch({
      type: DISCOUNT_DELETE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: DISCOUNT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getDiscountDetails = id => async (dispatch, getState) => {
  try {
    dispatch({ type: DISCOUNT_DETAILS_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(`/api/discounts?id=${id}`, config)

    dispatch({
      type: DISCOUNT_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: DISCOUNT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
