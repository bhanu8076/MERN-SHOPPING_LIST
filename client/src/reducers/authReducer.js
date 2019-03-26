import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: false,
  user: null
};

//takes in state which is equal to the initial state and then an action
export default function(state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      //runs while finding user
      return {
        ...state,
        isLoading: true
      };
    //runs every time anything happens to see if we're logged in or not
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoaded: false,
        user: action.payload
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      //set token as the payload
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        //this will have the user and the payload which we're sending back from the backend
        ...action.payload,
        isAuthenticated: true,
        isLoaded: false,
        user: action.payload
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false
      };
    default:
      return state;
  }
}
