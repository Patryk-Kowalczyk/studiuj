import React from "react";
import { motion } from "framer-motion";
import ForgotPasswordDialog from "../components/login/ForgotPasswordDialog";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import LoginForm from "../components/login/LoginForm";
import {useStyles} from "../components/login/styles/loginPageStyles";

export default function SignInSite() {
  const classes = useStyles();
  const [openedForgotPasswordDialog, setOpenedForgotPasswordDialog] =
      React.useState(false);
  const handleClickOpen = () => {
    setOpenedForgotPasswordDialog(true);
  };

  const handleClose = () => {
    setOpenedForgotPasswordDialog(false);
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        className={classes.imageSection}
        component={motion.div}
      >
        <img
          src="/images/login_vector.svg"
          alt="login page image"
          className={classes.image}
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        className={classes.gridBox}
        component={motion.div}
        initial={{ x: 400, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Zaloguj się
          </Typography>
        <LoginForm handleClickOpen={handleClickOpen}/>
        </div>
      </Grid>
      <ForgotPasswordDialog
        open={openedForgotPasswordDialog}
        handleClose={handleClose}
      />
    </Grid>
  );
}
