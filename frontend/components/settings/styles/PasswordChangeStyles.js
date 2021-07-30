import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
    width: "100%",
    borderRadius: theme.spacing(2),
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
    marginTop: theme.spacing(3),
  },
}));
