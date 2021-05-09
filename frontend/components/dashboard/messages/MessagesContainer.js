import React from "react";
import { Grid, Paper } from "@material-ui/core";
import ChatsList from "../../../components/dashboard/messages/ChatsList";
import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "calc(100% - 64px)",
    padding: theme.spacing(2),
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
  },
}));

const MessagesContainer = ({ children }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Grid container className={classes.grid}>
        <Grid item xs={12} md={4} className={classes.chatsColumn}>
          <ChatsList />
        </Grid>
        <Grid item xs={12} md={8}>
          {children}
        </Grid>
      </Grid>
    </Paper>
  );
};
export default MessagesContainer;
