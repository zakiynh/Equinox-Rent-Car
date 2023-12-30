import swalToast from "../../helpers/swal";
import { GET_ORDER, ORDER_CAR, CANCEL_ORDER, EDIT_ORDER } from "./actionType";
const BASE_URL = "http://localhost:3000/api/orders";
import axios from "axios";

export const getOrder = (id) => {
  return {
    type: GET_ORDER,
  };
};

export function fetchOrder() {
  return async function (dispatch) {
    try {
      const response = await axios.get(BASE_URL);
      dispatch({
        type: GET_ORDER,
        payload: response.data,
      });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        swalToast("info", "No orders found!");
        dispatch({
          type: GET_ORDER,
          payload: [],
        });
      } else {
        console.error(error);
        swalToast("error", "Something went wrong!");
      }
    }
  };
}

export function orderCar(FormData) {
    return async function (dispatch) {
        try {
        const response = await axios.post(BASE_URL, FormData);
        dispatch({
            type: ORDER_CAR,
            payload: response.data,
        });
        swalToast("success", "Order created successfully!");
        } catch (error) {
        console.error("Server error response:", error.response);
        swalToast("error", "Something went wrong!");
        }
    };
}

export function cancelOrder(id) {
    return async function (dispatch) {
        try {
        const response = await axios.delete(`${BASE_URL}/${id}`);
        dispatch({
            type: CANCEL_ORDER,
            payload: response.data,
        });
        swalToast("success", "Order cancelled successfully!");
        dispatch(fetchOrder());
        } catch (error) {
        console.error("Server error response:", error.response);
        swalToast("error", "Something went wrong!");
        }
    };
}

export function updateOrder(id, FormData) {
    return async function (dispatch) {
        try {
        const response = await axios.put(`${BASE_URL}/${id}`, FormData);
        dispatch({
            type: EDIT_ORDER,
            payload: response.data,
        });
        swalToast("success", "Order updated successfully!");
        dispatch(fetchOrder());
        } catch (error) {
        console.error("Server error response:", error.response);
        swalToast("error", "Something went wrong!");
        }
    };
}