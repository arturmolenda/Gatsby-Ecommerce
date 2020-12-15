import axios from "axios"
import { CART_DELETE_ITEMS } from "../constants/cartConstants"
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_LIST_ALL_REQUEST,
  ORDER_LIST_ALL_SUCCESS,
  ORDER_LIST_ALL_FAIL,
  ORDER_SHIP_REQUEST,
  ORDER_SHIP_SUCCESS,
  ORDER_SHIP_FAIL,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DELETE_FAIL,
} from "../constants/orderConstants"

export const createOrder = order => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.post(`/api/orders`, order, config)

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    })
    setTimeout(() => {
      localStorage.removeItem("cartItems")
      dispatch({ type: CART_DELETE_ITEMS })
    }, 1000)
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getOrderDetails = id => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(`/api/orders/${id}`, config)

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listMyOrders = (page = "", rowsSize = 5) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: ORDER_LIST_MY_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(
      `/api/orders/myorders?pageNumber=${page}&rowsSize=${rowsSize}`,
      config
    )

    dispatch({
      type: ORDER_LIST_MY_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const payOrder = (orderId, paymentResult) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: ORDER_PAY_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.put(
      `/api/orders/${orderId}/pay`,
      paymentResult,
      config
    )

    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const shipOrder = (orderId, tracking) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_SHIP_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    await axios.put(`/api/orders/${orderId}/ship`, { tracking }, config)

    dispatch({
      type: ORDER_SHIP_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: ORDER_SHIP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listAllOrders = (page = "", rowsSize = 5, keyword = "") => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: ORDER_LIST_ALL_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    }
    const { data } = await axios.get(
      `/api/orders/all?pageNumber=${page}&keyword=${keyword}&rowsSize=${rowsSize}`,
      config
    )

    dispatch({ type: ORDER_LIST_ALL_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ORDER_LIST_ALL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteOrder = orderId => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DELETE_REQUEST, payload: orderId })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    }
    await axios.delete(`/api/orders/${orderId}`, config)

    dispatch({
      type: ORDER_DELETE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: ORDER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
