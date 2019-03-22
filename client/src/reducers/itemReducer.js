//actions get sent here, so we need to change them and check type, then we send them to the React component (ShoppinList) where they are mapped to props and outputted.

//Remove these when connecting to MongoDB
//import uuid from "uuid";
import {
  GET_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  ITEMS_LOADING
} from "../actions/types";
const initialState = {
  items: [
    //Remove these when connecting to MongoDB
    // {
    //   id: uuid(),
    //   name: "Eggs"
    // },
    // {
    //   id: uuid(),
    //   name: "Milk"
    // },
    // {
    //   id: uuid(),
    //   name: "Steak"
    // },
    // {
    //   id: uuid(),
    //   name: "Water"
    // }
  ],
  loading: false
};

//export the state from above & export the action that will have a type attached to it.
export default function(state = initialState, action) {
  //if action.type is GET_ITEMS... (from itemActions.js)
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        //get the new items, right now items is blank.. so we're making a copy of the current state and we're adding these new items which come from the action.payload
        items: action.payload,
        //we call this to set loading to false after the axios request loads
        loading: false
      };
    case DELETE_ITEM:
      return {
        ...state,
        // filter i.e. keep all the items that return true, action.payload is id (set in actions)
        items: state.items.filter(item => item._id !== action.payload)
      };
    case ADD_ITEM:
      return {
        ...state,
        //we use the spread operator because we can't mutate the state we have to make a copy of it first and add to it.
        items: [action.payload, ...state.items]
      };
    case ITEMS_LOADING:
      return {
        ...state,
        //change loading to true
        loading: true
      };
    //just return the state by default
    default:
      return state;
  }
}
