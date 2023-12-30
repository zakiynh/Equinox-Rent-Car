import { GET_CAR } from "../actions/actionType";

const initialState = {
    car: [],
};

export default function carReducer(state = initialState, action) {
    switch (action.type) {
        case GET_CAR:
            return {
                ...state,
                car: action.payload,
            };
        default:
            return state;
    }
}