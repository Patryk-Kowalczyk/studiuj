import { Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import DashboardAuth from "../../layouts/PanelLayout/PanelAuth";

import PrimaryUserSettings from "../../components/settings/PrimaryUserSettings";
import EducationUserSettings from "../../components/settings/EducationUserSettings";
import PasswordChange from "../../components/settings/PasswordChange";

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

      {userData.provider === "default" ? <PasswordChange /> : null}

      <EducationUserSettings />
    </>
  );
}

userSettings.Layout = DashboardAuth;
