import React from "react";
import { useDispatch } from "react-redux";
import { useQuery } from "@apollo/client";
import Router from "next/router";
import PanelContainer from "./PanelContainer";
import { CircularProgress } from "@material-ui/core";
import { setUserInfo } from "../../lib/store/actions/auth";
import {LOGGED_USER} from "../../lib/graphql/queries/authQueries";

export default function PanelAuth({ children }) {
  const { loading, error, data } = useQuery(LOGGED_USER);
  const dispatch = useDispatch();
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    if (data) {
      const userInfo = data.me;
      dispatch(setUserInfo(userInfo));
      setLoaded(true);
    }
  }, [data]);

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
    return <PanelContainer>{children}</PanelContainer>;
  }
}
