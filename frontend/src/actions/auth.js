import { LOGIN, LOGOUT, REGISTER } from "./types";

export const login = (user) => (dispatch) => {
  dispatch({
    type: LOGIN,
    payload: { user: user },
  });
};

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};

export const register = () => (dispatch) => {
  dispatch({
    type: REGISTER,
  });
};
