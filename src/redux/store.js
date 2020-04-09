import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import userReducers from "./reducers/userReducers";

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
  user: userReducers,
});

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
