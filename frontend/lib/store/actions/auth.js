import { LOGIN, LOGOUT, REGISTER, SET_USER_INFO } from "./types";

export const login = (user) => (dispatch) => {
  dispatch({
    type: LOGIN,
    payload: { user: user },
  });
};

export const setUserInfo = (userInfo) => (dispatch) => {
  dispatch({
    type: SET_USER_INFO,
    payload: { userInfo },
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
