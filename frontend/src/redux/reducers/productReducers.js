import {
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_RESET,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_RESET,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_IMAGE_UPLOAD_FAIL,
  PRODUCT_IMAGE_UPLOAD_REQUEST,
  PRODUCT_IMAGE_UPLOAD_RESET,
  PRODUCT_IMAGE_UPLOAD_SUCCESS,
  PRODUCT_LIST_ALL_FAIL,
  PRODUCT_LIST_ALL_REQUEST,
  PRODUCT_LIST_ALL_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "../constants/productConstants"

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] }
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload, success: true }
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const productListAllReducer = (
  state = { products: [], loading: true },
  action
) => {
  switch (action.type) {
    case PRODUCT_LIST_ALL_REQUEST:
      return { loading: true, products: [] }
    case PRODUCT_LIST_ALL_SUCCESS:
      return { loading: false, products: action.payload, success: true }
    case PRODUCT_LIST_ALL_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: action.payload }
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true }
    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload }
    case PRODUCT_DELETE_RESET:
      return {}
    default:
      return state
  }
}

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: true }
    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload }
    case PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case PRODUCT_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const productImageUploadReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_IMAGE_UPLOAD_REQUEST:
      return { loading: true }
    case PRODUCT_IMAGE_UPLOAD_SUCCESS:
      return { loading: false, success: true }
    case PRODUCT_IMAGE_UPLOAD_FAIL:
      return { loading: false, error: action.payload }
    case PRODUCT_IMAGE_UPLOAD_RESET:
      return {}
    default:
      return state
  }
}
