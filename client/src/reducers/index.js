//combine all of our reducers here
import { combineReducers } from "redux";
import itemReducer from "./itemReducer";

export default combineReducers({
  //add new reducers here, this becomes the entire state object, item.items to access state arrays inside of it.
  item: itemReducer
});
