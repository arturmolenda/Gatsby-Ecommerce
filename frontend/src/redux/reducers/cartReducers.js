import {
  CART_ADD_ITEM_REQUEST,
  CART_REMOVE_ITEM,
  CART_DELETE_ITEMS,
  CART_ADD_ITEM_SUCCESS,
} from "../constants/cartConstants"

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM_REQUEST:
      return { ...state, productId: action.payload }
    case CART_ADD_ITEM_SUCCESS:
      const item = action.payload
      console.log(item)
      const existItem = state.cartItems.find(x => x.product === item.product)
      console.log(existItem)
      if (existItem) {
        return {
          ...state,
          productId: null,
          cartItems: state.cartItems.map(x =>
            x.product === existItem.product ? item : x
          ),
        }
      } else
        return {
          ...state,
          productId: null,
          cartItems: [...state.cartItems, item],
        }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(x => x.product !== action.payload),
      }
    case CART_DELETE_ITEMS:
      return { ...state, cartItems: [] }
    default:
      return state
  }
}
