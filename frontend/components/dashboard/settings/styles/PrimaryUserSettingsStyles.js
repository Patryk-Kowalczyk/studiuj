import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
    width: "100%",
    borderRadius: theme.spacing(2),
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
    marginTop: theme.spacing(3),
  },
  avatarSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));
