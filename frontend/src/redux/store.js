import {
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware,
} from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import {
  userDeleteReducer,
  userListAllReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateAdminReducer,
  userUpdateReducer,
} from "./reducers/userReducers"
import {
  productListAllReducer,
  productListReducer,
  productDeleteReducer,
  productCreateReducer,
  productImageUploadReducer,
  productUpdateReducer,
  productDetailsReducer,
  productTopRatedReducer,
  productReviewCreateReducer,
} from "./reducers/productReducers"
import { cartReducer } from "./reducers/cartReducers"
import {
  discountApplyReducer,
  discountListAllReducer,
  discountCreateReducer,
  discountUpdateReducer,
  discountDeleteReducer,
  discountDetailsReducer,
} from "./reducers/discountReducers"
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderListMyReducer,
  orderPayReducer,
  orderListAllReducer,
  orderShipReducer,
  orderDeleteReducer,
} from "./reducers/orderReducers"
const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userUpdate: userUpdateReducer,
  userListAll: userListAllReducer,
  userUpdateAdmin: userUpdateAdminReducer,
  userDelete: userDeleteReducer,
  productList: productListReducer,
  productListAll: productListAllReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productImageUpload: productImageUploadReducer,
  productDetails: productDetailsReducer,
  productTopRated: productTopRatedReducer,
  productReviewCreate: productReviewCreateReducer,
  cart: cartReducer,
  discountApply: discountApplyReducer,
  discountListAll: discountListAllReducer,
  discountCreate: discountCreateReducer,
  discountUpdate: discountUpdateReducer,
  discountDelete: discountDeleteReducer,
  discountDetails: discountDetailsReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderListMy: orderListMyReducer,
  orderPay: orderPayReducer,
  orderListAll: orderListAllReducer,
  orderShip: orderShipReducer,
  orderDelete: orderDeleteReducer,
})

let userInfoFromStorage,
  cartItemsFromStorage,
  shippingAddressFromStorage,
  paymentMethodFromStorage
if (typeof window !== "undefined") {
  userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null

  cartItemsFromStorage = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : []

  shippingAddressFromStorage = localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress"))
    : {}

  paymentMethodFromStorage = localStorage.getItem("paymentMethod")
    ? JSON.parse(localStorage.getItem("paymentMethod"))
    : null
}

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage,
  },
}

const middleware = [thunk]

const createStore = reduxCreateStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default createStore
