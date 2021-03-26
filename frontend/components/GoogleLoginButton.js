import React from "react";
import { Button, makeStyles } from "@material-ui/core";
import GoogleLogo from "./GoogleLogo";
import handleGoogleLogin from "../lib/handleGoogleLogin";

const useStyles = makeStyles((theme) => ({
  googleButton: {
    width: "100%",
    marginBottom: theme.spacing(1),
  },
}));

export default function GoogleLoginButton() {
  const classes = useStyles();
  return (
    <Button
      variant="contained"
      startIcon={<GoogleLogo />}
      onClick={handleGoogleLogin}
      className={classes.googleButton}
    >
      Zaloguj się przez Google
    </Button>
  );
}
