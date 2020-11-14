// import React from "react"
// import { Provider } from "react-redux"
import {
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware,
} from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { userLoginReducer, userRegisterReducer } from "./reducers/userReducers"
import { productListReducer } from "./reducers/productReducers"
const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  productList: productListReducer,
})

let userInfoFromStorage
if (typeof window !== "undefined") {
  userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null
}

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const createStore = reduxCreateStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default createStore
