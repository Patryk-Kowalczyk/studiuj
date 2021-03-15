import React from "react";
import authService from "../lib/authService";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setMessage } from "../src/actions/message";
import { motion } from "framer-motion";
import Router from "next/router";

import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import LoadingButton from "../components/LoadingButton";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    overflow: "hidden",
  },
  imageSection: {
    backgroundColor: theme.palette.primary.light,
    backgroundRepeat: "no-repeat",
    clipPath: "circle(80.9% at 19% 57%)",
    position: "relative",
    [theme.breakpoints.down("md")]: {
      clipPath: "circle(80.9% at 6% 57%)",
    },
    [theme.breakpoints.down("sm")]: {
      clipPath: "circle(80.9% at 0% 57%)",
    },
  },
  image: {
    position: "absolute",
    width: "100%",
    height: "50%",
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-35%)",
  },
  gridBox: {
    display: "flex",
    alignItems: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide() {
  const classes = useStyles();
  const [loadingForm, setLoadingForm] = React.useState(false);
  const {
    register,
    handleSubmit,
    control,
    errors,
    setError,
    clearErrors,
  } = useForm();

  const { login } = authService();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    setLoadingForm(true);

    const isSuccess = await login(data.email, data.password);
    if (isSuccess) {
      Router.push("/user/dashboard");
      dispatch(setMessage("Pomyślnie się zalogowałeś."));
    } else {
      setError("serverError", "err");
      dispatch(setMessage("Nieprawidłowe dane. Spróbuj jeszcze raz."));
    }
    setLoadingForm(false);
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.imageSection}>
        <img
          src="/login_vector.svg"
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
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="email"
              control={control}
              defaultValue={""}
              render={(props) => (
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Adres email"
                  autoComplete="email"
                  onChange={(e) => {
                    props.onChange(e.target.value);
                    clearErrors();
                  }}
                  value={props.value}
                  error={errors.serverError ? true : false}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              defaultValue={""}
              render={(props) => (
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Hasło"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  ref={register}
                  onChange={(e) => {
                    props.onChange(e.target.value);
                    clearErrors();
                  }}
                  value={props.value}
                  error={errors.serverError ? true : false}
                />
              )}
            />
            <LoadingButton
              loading={loadingForm || false}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Zaloguj
            </LoadingButton>
            <Grid container spacing={3}>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Zapomniałeś hasła?
                </Link>
              </Grid>
              <Grid item xs>
                <Link href="#" variant="body2">
                  {"Nie masz jeszcze konta? Dołącz do nas!"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
