import React from "react";
import { gql, useQuery } from "@apollo/client";
import Router from "next/router";
import Skeleton from "@material-ui/lab/Skeleton";

const GET_USERS = gql`
  query users {
    me {
      name
      email
    }
  }
`;

export default function Dashboard() {
  const { loading, error, data } = useQuery(GET_USERS);
  if (!loading && error) {
    Router.push("/login");
  }
  if (data) {
    return <h1>Dashboard</h1>;
  } else {
    return (
      <>
        <Skeleton variant="rect" width={"50%"} height={200} />
        <Skeleton variant="text" />
        <Skeleton variant="text" />
        <Skeleton variant="text" />
      </>
    );
  }
}
