import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_RESET,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS
} from "../constants/cart.constants";

export const cartReducer = (state = {orderItems: [], shippingAddress: {}}, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload

      const existItem = state.orderItems.find(x => x.product === item.product)

      if (existItem) {
        return {
          ...state,
          orderItems: state.orderItems.map(x => x.product === existItem.product ? item : x)
        }
      } else {
        return {
          ...state,
          orderItems: [...state.orderItems, item]
        }
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        orderItems: state.orderItems.filter(x => x.product !== action.payload)
      }
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload
      }
      case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload
      }
    case CART_RESET :
      return { ...state, orderItems : []}
    default:
      return state
  }
}


