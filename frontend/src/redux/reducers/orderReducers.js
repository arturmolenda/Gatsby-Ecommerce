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
  ORDER_LIST_MY_RESET,
  ORDER_CREATE_RESET,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_RESET,
  ORDER_LIST_ALL_REQUEST,
  ORDER_LIST_ALL_SUCCESS,
  ORDER_LIST_ALL_FAIL,
  ORDER_LIST_ALL_RESET,
  ORDER_SHIP_REQUEST,
  ORDER_SHIP_SUCCESS,
  ORDER_SHIP_FAIL,
  ORDER_SHIP_RESET,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DELETE_FAIL,
  ORDER_DELETE_RESET,
  ORDER_DETAILS_RESET,
} from "../constants/orderConstants"

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        loading: true,
      }
    case ORDER_CREATE_SUCCESS:
      return { loading: false, success: true, order: action.payload }
    case ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case ORDER_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const orderDetailsReducer = (
  state = { loading: true, order: {} },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case ORDER_DETAILS_SUCCESS:
      return { loading: false, order: action.payload }
    case ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case ORDER_DETAILS_RESET:
      return { loading: true, order: {} }
    default:
      return state
  }
}

export const orderListMyReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_MY_REQUEST:
      return { loading: true }
    case ORDER_LIST_MY_SUCCESS:
      return {
        loading: false,
        orders: action.payload.orders,
        page: action.payload.page,
        totalRows: action.payload.rows,
        rowsSize: action.payload.rowsSize,
        success: true,
      }
    case ORDER_LIST_MY_FAIL:
      return { loading: false, error: action.payload }
    case ORDER_LIST_MY_RESET:
      return {}
    default:
      return state
  }
}

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return {
        loading: true,
      }
    case ORDER_PAY_SUCCESS:
      return { loading: false, success: true }
    case ORDER_PAY_FAIL:
      return { loading: false, error: action.payload }
    case ORDER_PAY_RESET:
      return {}
    default:
      return state
  }
}

export const orderListAllReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_ALL_REQUEST:
      return {
        loading: true,
      }
    case ORDER_LIST_ALL_SUCCESS:
      return {
        loading: false,
        success: true,
        orders: action.payload.orders,
        page: action.payload.page,
        totalRows: action.payload.rows,
        rowsSize: action.payload.rowsSize,
      }
    case ORDER_LIST_ALL_FAIL:
      return { loading: false, error: action.payload }
    case ORDER_LIST_ALL_RESET:
      return {}
    default:
      return state
  }
}

export const orderShipReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_SHIP_REQUEST:
      return { loading: true }
    case ORDER_SHIP_SUCCESS:
      return { loading: false, success: true }
    case ORDER_SHIP_FAIL:
      return { loading: false, error: action.payload }
    case ORDER_SHIP_RESET:
      return {}
    default:
      return state
  }
}

export const orderDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELETE_REQUEST:
      return { loading: action.payload }
    case ORDER_DELETE_SUCCESS:
      return { loading: false, success: true }
    case ORDER_DELETE_FAIL:
      return { loading: false, error: action.payload }
    case ORDER_DELETE_RESET:
      return {}
    default:
      return state
  }
}
