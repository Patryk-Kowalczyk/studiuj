import { gql } from "@apollo/client";
import { useApollo } from "./apolloClient";
import { login as loginAction } from "../src/actions/auth";
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

  const logout = () => {
    localStorage.removeItem("user");
  };
  return {
    login,
    register,
    logout,
  };
}

export default authService;
