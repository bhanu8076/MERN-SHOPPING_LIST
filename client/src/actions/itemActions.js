import { GET_ITEMS, ADD_ITEM, DELETE_ITEM } from "./types";

//when getItems is run by the component with componentDidMount(), the action type below gets dispatched/returned to the reducer (itemReducer)
export const getItems = () => {
  return {
    //this is the action: action.type
    type: GET_ITEMS
  };
};

export const deleteItem = id => {
  return {
    //this is the action: action.type
    type: DELETE_ITEM,
    payload: id
  };
};

export const addItem = newItem => {
  return {
    //this is the action: action.type
    type: ADD_ITEM,
    payload: newItem
  };
};
