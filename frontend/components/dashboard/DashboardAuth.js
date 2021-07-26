import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { gql, useQuery } from "@apollo/client";
import Router from "next/router";
import DashboardContainer from "./DashboardContainer";
import { CircularProgress } from "@material-ui/core";
import { setUserInfo } from "../../lib/store/actions/auth";

const GET_USERS = gql`
  query users {
    me {
      id
      uuid
      name
      email
      avatar
      provider
      profile {
        id
      }
    }
  }
`;

export default function Dashboard({ children }) {
  const { loading, error, data } = useQuery(GET_USERS);
  const dispatch = useDispatch();
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    if (data) {
      const userInfo = data.me;
      dispatch(setUserInfo(userInfo));
      setLoaded(true);
    }
  }, [data]);

  // if (!loading && data) {
  //   const userInfo = data.me;
  //   dispatch(setUserInfo(userInfo));
  // }
  if (!loading && error) {
    console.log(error.graphQLErrors);
    Router.push("/login");
  }

  if (!loaded) {
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
