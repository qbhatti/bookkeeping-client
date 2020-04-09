import { SET_USER } from "../types";

const initialState = {
  email: "",
  password: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        email: action.payload.email,
        password: action.payload.password,
      };
    default:
      return state;
  }
};
