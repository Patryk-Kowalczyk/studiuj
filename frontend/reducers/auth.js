import { LOGIN, LOGOUT, REGISTER } from "../actions/types";

const ISSERVER = typeof window === "undefined";

const user = !ISSERVER ? JSON.parse(localStorage.getItem("user")) : "";

const inistalState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

function authReducer(state = inistalState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };

    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };

    case REGISTER:
      return {
        ...state,
        isLoggedIn: false,
      };
    default:
      return state;
  }
}

export default authReducer;
