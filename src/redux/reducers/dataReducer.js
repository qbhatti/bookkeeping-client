import { LOADING_DATA, SET_ACCOUNT } from "../types";

const initialState = {
  account: {},
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };

    case SET_ACCOUNT:
      return {
        ...state,
        account: action.payload,
        loading: false
      };

    default:
      return state;
  }
};
