import { combineReducers, createStore } from "redux";
import reducerBook from "./reducers/reducerBook";

const rootReducer = combineReducers({
  bookReducer: reducerBook,
});

const store = createStore(rootReducer);

export default store;