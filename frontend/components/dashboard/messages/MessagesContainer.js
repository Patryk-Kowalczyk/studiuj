import React from "react";
import { Box, Grid, Paper } from "@material-ui/core";
import ChatsList from "../../../components/dashboard/messages/ChatsList";
import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "calc(100% - 64px)",
    padding: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2, 1),
    },
  },
  chatsColumn: {
    height: "100%",
    position: "relative",
    paddingRight: theme.spacing(1),
    overflowY: "auto",
    "&::before": {
      content: '""',
      position: "absolute",
      display: "block",
      top: 0,
      bottom: 0,
      right: 0,
      width: 2,
      backgroundColor: grey[300],
    },
  },
  grid: {
    height: "100%",
    display: "grid",
    gridTemplateColumns: "200px 1fr",
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "60px 1fr",
    },
  },
}));

const MessagesContainer = ({ children }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Box className={classes.grid}>
        <Box className={classes.chatsColumn}>
          <ChatsList />
        </Box>
        <Box>{children}</Box>
      </Box>
    </Paper>
  );
};
export default MessagesContainer;
