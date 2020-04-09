import { SET_USER } from "../types";

export const userInfo = (email, password) => (dispatch) => {
  dispatch({ type: SET_USER, payload: { email, password } });
};
