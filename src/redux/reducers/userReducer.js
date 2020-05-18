import {
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  SET_USER
} from "../types";

const initialState = {
  authenticated: false,
  loading: false,
  credentials: {},
  accounts: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true
      };
    case SET_UNAUTHENTICATED:
      return initialState;

    case LOADING_USER:
      return {
        ...state,
        loading: true
      };
    case SET_USER:
      return {
        authenticated: true,
        loading: false,
        ...action.payload // {credentials, accounts}
      };
    default:
      return state;
  }
};
