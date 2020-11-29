import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_RESET,
  USER_LIST_ALL_REQUEST,
  USER_LIST_ALL_SUCCESS,
  USER_LIST_ALL_FAIL,
  USER_UPDATE_ADMIN_REQUEST,
  USER_UPDATE_ADMIN_SUCCESS,
  USER_UPDATE_ADMIN_FAIL,
  USER_UPDATE_ADMIN_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_RESET,
  USER_LIST_ALL_RESET,
} from "../constants/userConstants"

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true }
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true }
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload }
    case USER_LOGOUT:
      return { userInfo: null }
    default:
      return state
  }
}

export const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true }
    case USER_UPDATE_SUCCESS:
      return { loading: false, success: true }
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case USER_UPDATE_RESET:
      return {}
    default:
      return state
  }
}

export const userListAllReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_ALL_REQUEST:
      return { loading: true }
    case USER_LIST_ALL_SUCCESS:
      return { loading: false, users: action.payload }
    case USER_LIST_ALL_FAIL:
      return { loading: false, error: action.payload }
    case USER_LIST_ALL_RESET:
      return {}
    default:
      return state
  }
}

export const userUpdateAdminReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_ADMIN_REQUEST:
      return { loading: action.payload }
    case USER_UPDATE_ADMIN_SUCCESS:
      return { loading: false, success: true }
    case USER_UPDATE_ADMIN_FAIL:
      return { loading: false, error: action.payload }
    case USER_UPDATE_ADMIN_RESET:
      return {}
    default:
      return state
  }
}

export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: action.payload }
    case USER_DELETE_SUCCESS:
      return { loading: false, success: true }
    case USER_DELETE_FAIL:
      return { loading: false, error: action.payload }
    case USER_DELETE_RESET:
      return {}
    default:
      return state
  }
}
