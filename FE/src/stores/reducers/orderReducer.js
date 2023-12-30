import { GET_ORDER, ORDER_CAR, CANCEL_ORDER, EDIT_ORDER } from "../actions/actionType";

const initialState = {
  order: [],
};

export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ORDER:
    case ORDER_CAR:
    case EDIT_ORDER:
      return {
        ...state,
        order: action.payload,
      };
    case CANCEL_ORDER:
      return {
        ...state,
        order: state.order.filter((order) => order.id !== action.payload.id),
      };
    default:
      return state;
  }
}
