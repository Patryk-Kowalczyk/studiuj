import React from "react";
import { gql, useQuery } from "@apollo/client";
import Router from "next/router";
import Skeleton from "@material-ui/lab/Skeleton";
import DashboardContainer from "../../components/DashboardContainer";

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
  console.log(error, data);
  if (!loading && error) {
    Router.push("/login");
  }
  if (!data) {
    return (
      <>
        <Skeleton variant="rect" width={"50%"} height={200} />
        <Skeleton variant="text" />
        <Skeleton variant="text" />
        <Skeleton variant="text" />
      </>
    );
  } else {
    return (
      <DashboardContainer>
        <h1>Dashboard</h1>
      </DashboardContainer>
    );
  }
}
