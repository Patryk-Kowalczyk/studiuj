import React from "react";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../src/actions/auth";
import { gql, useQuery } from "@apollo/client";
import Router from "next/router";
import DashboardContainer from "../../components/dashboard/DashboardContainer";
import { CircularProgress } from "@material-ui/core";

const GET_USERS = gql`
  query users {
    me {
      name
      email
    }
  }
`;

export default function Dashboard({ children }) {
  const { loading, error, data } = useQuery(GET_USERS);
  const dispatch = useDispatch();

  if (!loading && data) {
    const userInfo = data.me;
    dispatch(setUserInfo(userInfo));
  }
  if (!loading && error) {
    Router.push("/login");
  }
  if (!data) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  } else {
    return <DashboardContainer>{children}</DashboardContainer>;
  }
}
