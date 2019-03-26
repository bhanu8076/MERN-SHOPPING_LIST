//combine all of our reducers here
import { combineReducers } from "redux";
import itemReducer from "./itemReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";

export default combineReducers({
  //add new reducers here, this becomes the entire state object, item.items to access state arrays inside of it.
  item: itemReducer,
  error: errorReducer,
  auth: authReducer
});
