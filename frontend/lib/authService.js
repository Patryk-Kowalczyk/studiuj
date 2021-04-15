import { gql } from "@apollo/client";
import { useApollo } from "./apolloClient";
import { useRouter } from "next/router";
import {
  login as loginAction,
  logout as logoutAction,
} from "../src/actions/auth";
import { useDispatch } from "react-redux";

//prettier-ignore
const LOGIN = gql`
mutation login(
    $username: String!
    $password: String!
){
  login(input: {
    username: $username,
    password: $password
  }) {
    access_token
  }
}
`;

const REGISTER = gql`
  mutation register(
    $name: String!
    $email: String!
    $password: String!
    $password_confirmation: String!
  ) {
    register(
      input: {
        name: $name
        email: $email
        password: $password
        password_confirmation: $password_confirmation
      }
    ) {
      tokens {
        access_token
      }
      status
    }
  }
`;

const LOGOUT = gql`
  mutation logout {
    logout {
      status
      message
    }
  }
`;

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
        const isEmailError =
          err.graphQLErrors[0].extensions.validation["input.email"] || false;
        if (isEmailError) {
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
