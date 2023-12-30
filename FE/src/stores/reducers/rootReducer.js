import { combineReducers } from "redux";
import carReducer from "./carReducer";
import orderReducer from "./orderReducer";

const rootReducer = combineReducers({
    cars: carReducer,
    orders: orderReducer,
})

export default rootReducer;