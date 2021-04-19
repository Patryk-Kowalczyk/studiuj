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
    margin: `${theme.spacing(2)}px 0`,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 240,
  },
  schools: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  schoolItem: {
    margin: `${theme.spacing(1)}px 0`,
  },
  schoolItemCheckbox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  university: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  centeredFields: {
    "& > *": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  autocomplete: {
    marginTop: theme.spacing(1),
  },
}));
