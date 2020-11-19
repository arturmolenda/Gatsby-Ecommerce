import {
  DISCOUNT_VALIDATE_FAIL,
  DISCOUNT_VALIDATE_REQUEST,
  DISCOUNT_VALIDATE_RESET,
  DISCOUNT_VALIDATE_SUCCESS,
} from "../constants/discountConstats"

export const discountApplyReducer = (state = {}, action) => {
  switch (action.type) {
    case DISCOUNT_VALIDATE_REQUEST:
      return {
        loading: true,
      }
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
