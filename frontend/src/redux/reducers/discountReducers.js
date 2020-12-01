import {
  DISCOUNT_VALIDATE_FAIL,
  DISCOUNT_VALIDATE_REQUEST,
  DISCOUNT_VALIDATE_RESET,
  DISCOUNT_VALIDATE_SUCCESS,
  DISCOUNT_LIST_ALL_REQUEST,
  DISCOUNT_LIST_ALL_SUCCESS,
  DISCOUNT_LIST_ALL_FAIL,
  DISCOUNT_LIST_ALL_RESET,
  DISCOUNT_CREATE_REQUEST,
  DISCOUNT_CREATE_SUCCESS,
  DISCOUNT_CREATE_FAIL,
  DISCOUNT_CREATE_RESET,
  DISCOUNT_UPDATE_REQUEST,
  DISCOUNT_UPDATE_SUCCESS,
  DISCOUNT_UPDATE_FAIL,
  DISCOUNT_UPDATE_RESET,
  DISCOUNT_DELETE_REQUEST,
  DISCOUNT_DELETE_SUCCESS,
  DISCOUNT_DELETE_FAIL,
  DISCOUNT_DELETE_RESET,
  DISCOUNT_DETAILS_REQUEST,
  DISCOUNT_DETAILS_SUCCESS,
  DISCOUNT_DETAILS_FAIL,
  DISCOUNT_DETAILS_RESET,
} from "../constants/discountConstats"

export const discountApplyReducer = (state = {}, action) => {
  switch (action.type) {
    case DISCOUNT_VALIDATE_REQUEST:
      return { loading: true }
    case DISCOUNT_VALIDATE_SUCCESS:
      return { loading: false, couponInfo: action.payload }
    case DISCOUNT_VALIDATE_FAIL:
      return { loading: false, error: action.payload }
    case DISCOUNT_VALIDATE_RESET:
      return {}
    default:
      return state
  }
}

export const discountListAllReducer = (state = { discounts: [] }, action) => {
  switch (action.type) {
    case DISCOUNT_LIST_ALL_REQUEST:
      return { loading: true }
    case DISCOUNT_LIST_ALL_SUCCESS:
      return { loading: false, discounts: action.payload }
    case DISCOUNT_LIST_ALL_FAIL:
      return { loading: false, error: action.payload }
    case DISCOUNT_LIST_ALL_RESET:
      return { loading: true }
    default:
      return state
  }
}

export const discountCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case DISCOUNT_CREATE_REQUEST:
      return { loading: true }
    case DISCOUNT_CREATE_SUCCESS:
      return { loading: false, success: action.payload }
    case DISCOUNT_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case DISCOUNT_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const discountUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case DISCOUNT_UPDATE_REQUEST:
      return { loading: true }
    case DISCOUNT_UPDATE_SUCCESS:
      return { loading: false, success: true }
    case DISCOUNT_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case DISCOUNT_UPDATE_RESET:
      return {}
    default:
      return state
  }
}

export const discountDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DISCOUNT_DELETE_REQUEST:
      return { loading: action.payload }
    case DISCOUNT_DELETE_SUCCESS:
      return { loading: false, success: true }
    case DISCOUNT_DELETE_FAIL:
      return { loading: false, error: action.payload }
    case DISCOUNT_DELETE_RESET:
      return {}
    default:
      return state
  }
}

export const discountDetailsReducer = (
  state = { discount: {}, loading: true },
  action
) => {
  switch (action.type) {
    case DISCOUNT_DETAILS_REQUEST:
      return { loading: true }
    case DISCOUNT_DETAILS_SUCCESS:
      return { loading: false, discountInfo: action.payload }
    case DISCOUNT_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case DISCOUNT_DETAILS_RESET:
      return { loading: true }
    default:
      return state
  }
}
