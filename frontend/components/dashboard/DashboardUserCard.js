import React from "react";
import authService from "../../lib/authService";
import { useSelector } from "react-redux";

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
  Badge,
} from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import { useRouter } from "next/router";
import Link from "next/link";

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
  badge: {
    "& > span": {
      right: 5,
      top: 4,
      width: 10,
      height: 10,
    },
  },
}));

export default function DashboardUserCard({ userData }) {
  const classes = useStyles();
  const router = useRouter();
  const { logout } = authService();

  const handleLogout = async () => {
    router.push("/");
    await logout();
  };
  return (
    <Card className={classes.root} elevation={0}>
      <Avatar
        alt="User Image"
        src={
          (userData.avatar &&
            `${process.env.NEXT_PUBLIC_BACKEND_HOST}/${userData.avatar}`) ||
          ""
        }
      >
        {userData.name[0]}
      </Avatar>
      <div className={classes.nameIcons}>
        <Typography className={classes.name}>{userData.name}</Typography>
        <div>
          <Link href={`/user/${userData.uuid}`}>
            <IconButton
              aria-label="user-profile"
              size="small"
              className={classes.itemButton}
            >
              <PersonIcon />
            </IconButton>
          </Link>
          <Link href="/user/settings">
            <IconButton
              aria-label="user-settings"
              size="small"
              className={classes.itemButton}
            >
              <Badge
                color="primary"
                variant="dot"
                invisible={userData.profile ? true : false}
                className={classes.badge}
              >
                <SettingsIcon />
              </Badge>
            </IconButton>
          </Link>
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
