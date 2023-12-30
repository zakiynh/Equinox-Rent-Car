import swalToast from "../../helpers/swal";
import { GET_CAR } from "./actionType";
const BASE_URL = "http://localhost:3000/api/cars";
import axios from "axios";

export const getCar = (id) => {
  return {
    type: GET_CAR,
  };
};

export function fetchCar() {
  return async function (dispatch) {
    try {
      const response = await axios.get(BASE_URL);
      dispatch({
        type: GET_CAR,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
      swalToast("error","Something went wrong!");
    }
  };
}
