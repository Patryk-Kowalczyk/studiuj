import { Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import DashboardAuth from "../../components/dashboard/DashboardAuth";

import PrimaryUserSettings from "../../components/dashboard/settings/PrimaryUserSettings";

export default function userSettings() {
  const userData = useSelector((state) => state.auth.user.data);
  return (
    <>
      <Typography variant="h4" component="h2">
        Ustawienia użytkownika
      </Typography>
      <Typography variant="caption" display="block" gutterBottom>
        Ustaw podstawowe informacje dotyczące Twojego profilu.
      </Typography>
      <PrimaryUserSettings user={userData} />
    </>
  );
}

userSettings.Layout = DashboardAuth;
