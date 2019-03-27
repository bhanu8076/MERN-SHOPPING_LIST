import axios from "axios";
import { returnErrors } from "./errorActions";

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from "./types";

//Check token & load user
//since we are using an asycnhronous request we're gonna need to call dispatch here
// we want to get parts of the state such as the token part of the state so we add getState into the parameters passed in
export const loadUser = () => (dispatch, getState) => {
  // User loading
  //this is gonna call the auth reducer case for USER_LOADING
  dispatch({ type: USER_LOADING });

  //axios returns a promise
  //we use axios to send the token to a certain endpoint
  axios //................ pass in getState
    .get("/api/auth/user", tokenConfig(getState))
    .then(res =>
      dispatch({
        //the type is what we evaluate with the switch statement
        type: USER_LOADED,
        //an object with the user data and the token itself
        payload: res.date
      })
    )
    .catch(err => {
      //returnErrors just returns an object with type and stuff like that, it takes in parameters of a message, a status and a apossible id (which we dont need).
      dispatch(returnErrors(err.response.data, err.response.status));
      //if there's an error set the state as per AUTH_ERROR switch case.
      dispatch({
        type: AUTH_ERROR
      });
    });
};

//Register User
//destructure the object right here
export const register = ({ name, email, password }) => dispatch => {
  // Headers (takes an ovject in an object like so)
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({ name, email, password });

  //Once we have the headers and body, we wanna send an axios request to the relevant endpoint with the header & body we just declared. This will give us a promise back with a repsponse.
  axios
    .post("/api/users", body, config)
    .then(res =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      //have to import returnErrors above.  it takes in parameters of a message, a status and a apossible id (which we need to check for in RegisterModal before submitting).
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
      dispatch({
        type: REGISTER_FAIL
      });
    });
};
//Setup config/headers and token. Now anyttime we want to sent the token to a certain endpoint we simply send tokenConfig(getState)
export const tokenConfig = getState => {
  //get token from local storage (in the initialState of authReducer.js)
  const token = getState().auth.token;

  //we need to add the token to the headers. With axios we add an object and add a headers object inside of that.
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };
  //If token exists, add it to header 'x-auth-token' property
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};

//logout action
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

//Login User
//destructure the object right here
export const login = ({ email, password }) => dispatch => {
  // Headers (takes an ovject in an object like so)
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({ email, password });

  //Once we have the headers and body, we wanna send an axios request to the relevant endpoint with the header & body we just declared. This will give us a promise back with a repsponse.
  axios
    .post("/api/auth", body, config)
    .then(res =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      //have to import returnErrors above.  it takes in parameters of a message, a status and a apossible id (which we need to check for in RegisterModal before submitting).
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      );
      dispatch({
        type: LOGIN_FAIL
      });
    });
};
