import axios from "axios";
import {
  LOADING_DATA,
  SET_ACCOUNT,
  LOADING_UI,
  ADD_ACCOUNT,
  CLEAR_ERRORS,
  SET_ERRORS
} from "../types";

export const getAccountDetails = (accountId) => (dispatch) => {
  dispatch({ type: LOADING_DATA });

  axios
    .post(`/account/${accountId}`)
    .then((res) => {
      dispatch({ type: SET_ACCOUNT, payload: res.data });
      // history.push({
      //   pathname: "/account",
      //   state: { accountId: accountId }
      // });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addNewAccount = (accountData) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/account", accountData)
    .then((res) => {
      dispatch({ type: ADD_ACCOUNT, payload: res.data });
      dispatch(clearErrors());
    })
    .catch((err) => {
      console.log(err.response.data);
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

export const addTransaction = (transactionData) => (dispatch) => {
  console.log(transactionData);
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
