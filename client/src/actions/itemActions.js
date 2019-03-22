import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from "./types";
import axios from "axios";
//when one of the actions below is run by the component with e.g. componentDidMount(), the action type below gets dispatched/returned to the reducer (itemReducer)

//we need to add in dispatch, this is where thunk allows us to make an asynchonous request. We're gonna use this dispatch to send the type along with the data that we get from our request
export const getItems = () => dispatch => {
  //we call this to set loading to true before the axios request loads
  dispatch(setItemsLoading());
  axios
    // we added that proxy in package.json to not have to write out full address
    //we are making a request to the GET endpoint we created in our routes, we then get the data and send it as a payload to the dispatcher
    .get("/api/items")
    .then(res =>
      dispatch({
        type: GET_ITEMS,
        payload: res.data
      })
    );

  // PRE MONGODB
  // return {
  //   //this is the action: action.type
  //   type: GET_ITEMS
  // };
};

//return axios into dispatch, return that into item
export const addItem = item => dispatch => {
  axios.post("/api/items", item).then(res =>
    dispatch({
      type: ADD_ITEM,
      //returns that new json item that we add in routes
      payload: res.data
    })
  );
};
//Pre MONGODB
// export const addItem = newItem => {
//   return {
//     //this is the action: action.type
//     type: ADD_ITEM,
//     payload: newItem
//   };
// };

export const deleteItem = id => dispatch => {
  axios.delete(`/api/items/${id}`).then(res =>
    dispatch({
      type: DELETE_ITEM,
      payload: id
    })
  );
  // return {
  //   //this is the action: action.type
  //   type: DELETE_ITEM,
  //   payload: id
  // };
};

export const setItemsLoading = () => {
  return {
    //this is the action: action.type all this does is set it from false to true.
    type: ITEMS_LOADING
  };
};
