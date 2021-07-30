//prettier-ignore
import {gql} from "@apollo/client";

export const LOGIN = gql`
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

export const REGISTER = gql`
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

export const LOGOUT = gql`
  mutation logout {
    logout {
      status
      message
    }
  }
`;