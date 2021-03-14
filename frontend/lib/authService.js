import { gql, useMutation } from "@apollo/client";
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
        return true;
      })
      .catch((err) => {
        return false;
      });
    return result;

    // return axios
    //   .post(API_URL + "auth/login", {
    //     email: id,
    //     password: password,
    //     status: status,
    //   })
    //   .then((response) => {
    //     if (response.data.access_token) {
    //       localStorage.setItem("user", JSON.stringify(response.data));
    //     }
    //     return response.data;
    //   });
  };

  const logout = () => {
    localStorage.removeItem("user");
  };
  return {
    login,
    logout,
  };
}

export default authService;
