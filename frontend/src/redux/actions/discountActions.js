import axios from "axios"
import {
  DISCOUNT_VALIDATE_FAIL,
  DISCOUNT_VALIDATE_REQUEST,
  DISCOUNT_VALIDATE_SUCCESS,
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
