import axios from "axios";
import { LOADING_DATA, SET_ACCOUNT } from "../types";

export const getAccountDetails = (accountId, history) => (dispatch) => {
  dispatch({ type: LOADING_DATA });

  axios
    .post(`/account/${accountId}`)
    .then((res) => {
      dispatch({ type: SET_ACCOUNT, payload: res.data });
      history.push("/account");
    })
    .catch((err) => {
      console.log(err);
    });
};
