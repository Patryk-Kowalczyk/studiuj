import { gql } from "@apollo/client";
import { useDispatch } from "react-redux";
import {
  login as loginAction,
  logout as logoutAction,
} from "../store/actions/auth";
import { useApollo } from "../graphql/apolloClient";
import {LOGIN, LOGOUT, REGISTER} from "../graphql/mutations/authMutations";

function authService() {
  const client = useApollo();
  const dispatch = useDispatch();

  const login = async (username, password) => {
    const result = await client
      .mutate({
        mutation: LOGIN,
        variables: { username, password },
      })
      .then((res) => {
        //console.log(res.data);
        dispatch(loginAction(res.data));
        localStorage.setItem("user", JSON.stringify(res.data));
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
    return result;
  };

  const register = async (name, email, password, password_confirmation) => {
    const result = await client
      .mutate({
        mutation: REGISTER,
        variables: { name, email, password, password_confirmation },
      })
      .then((res) => {
        return [true, ""];
      })
      .catch((err) => {
        console.log(err.graphQLErrors);
        if (
          typeof err.graphQLErrors[0]?.extensions?.validation["input.email"] !==
          undefined
        ) {
          return [false, "emailError"];
        }
      });
    return result;
  };
  const logout = async () => {
    const result = await client
      .mutate({
        mutation: LOGOUT,
      })
      .then((res) => {
        dispatch(logoutAction());

        localStorage.removeItem("user");
      })
      .catch((err) => {
        console.log(err);
      });
    return result;
  };
  return {
    login,
    register,
    logout,
  };
}

export default authService;
