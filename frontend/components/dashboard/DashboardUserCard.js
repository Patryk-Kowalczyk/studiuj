import React from "react";
import authService from "../../lib/authService";

import SettingsIcon from "@material-ui/icons/Settings";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import {
  Avatar,
  Card,
  CardContent,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "rgba(255,255,255,.05)",
    display: "flex",
    alignItems: "center",
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  nameIcons: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    marginLeft: theme.spacing(1),
  },
  name: {
    color: grey[400],
    fontSize: ".8rem",
  },
  itemButton: {
    color: theme.palette.lightFont.main,
  },
}));

export default function DashboardUserCard({ userData }) {
  const classes = useStyles();
  const router = useRouter();
  const { logout } = authService();

  const handleLogout = () => {
    router.push("/");
    logout();
  };

  return (
    <Card className={classes.root} elevation={0}>
      <Avatar alt="User Image" src="/images/default-user-image.png" />
      <div className={classes.nameIcons}>
        <Typography className={classes.name}>{userData.name}</Typography>
        <div>
          <IconButton
            aria-label="user-profile"
            size="small"
            className={classes.itemButton}
          >
            <PersonIcon />
          </IconButton>
          <IconButton
            aria-label="user-settings"
            size="small"
            className={classes.itemButton}
          >
            <SettingsIcon />
          </IconButton>
          <IconButton
            aria-label="logout"
            size="small"
            className={classes.itemButton}
            onClick={handleLogout}
          >
            <ExitToAppIcon />
          </IconButton>
        </div>
      </div>
    </Card>
  );
}
