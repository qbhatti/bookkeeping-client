import axios from "axios";
import {
  LOADING_USER,
  SET_USER,
  LOADING_UI,
  CLEAR_ERRORS,
  SET_ERRORS
} from "../types";

export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios
    .post("/login", userData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/home");
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const getUserData = () => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .get("/user")
    .then((res) => {
      dispatch({ type: SET_USER, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
};
const setAuthorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem("FBIdToken", FBIdToken);
  axios.defaults.headers.common["Authorization"] = FBIdToken;
};
