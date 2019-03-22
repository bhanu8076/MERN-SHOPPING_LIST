//actions get sent here, so we need to change them and check type, then we send them to the React component (ShoppinList) where they are mapped to props and outputted.

import uuid from "uuid";
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM } from "../actions/types";
const initialState = {
  items: [
    {
      id: uuid(),
      name: "Eggs"
    },
    {
      id: uuid(),
      name: "Milk"
    },
    {
      id: uuid(),
      name: "Steak"
    },
    {
      id: uuid(),
      name: "Water"
    }
  ]
};

//export the state from above & export the action that will have a type attached to it.
export default function(state = initialState, action) {
  //if action.type is GET_ITEMS... (from itemActions.js)
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state
      };
    case DELETE_ITEM:
      return {
        ...state,
        // filter i.e. keep all the items that return true, action.payload is id (set in actions)
        items: state.items.filter(item => item.id !== action.payload)
      };
    case ADD_ITEM:
      return {
        ...state,
        //we use the spread operator because we can't mutate the state we have to make a copy of it first and add to it.
        items: [action.payload, ...state.items]
      };
    //just return the state by default
    default:
      return state;
  }
}
