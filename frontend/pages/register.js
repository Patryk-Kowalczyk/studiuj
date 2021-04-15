import React from "react";
import authService from "../lib/authService";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setMessage } from "../src/actions/message";
import { motion } from "framer-motion";
import GoogleLoginButton from "../components/GoogleLoginButton";
import Link from "next/link";

import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
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
    top: "55%",
    transform: "translate(-50%,-50%)",
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
  imageSectionInfo: {
    position: "absolute",
    width: "80%",
    left: "50%",
    top: "20%",
    transform: "translate(-50%,-35%)",
    color: "white",
  },
  link: {
    color: theme.palette.primary.main,
    cursor: "pointer",
    textDecoration: "none",
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
    reset,
  } = useForm({ reValidateMode: "onChange" });

  const { register: registerAuth } = authService();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    const name = `${data.first_name} ${data.last_name}`;
    if (data.password != data.password_confirmation) {
      setError("password_confirmation", "Passwords must be the same");
      return;
    }
    setLoadingForm(true);
    const [isSuccess, error] = await registerAuth(
      name,
      data.email,
      data.password,
      data.password_confirmation
    );
    if (isSuccess) {
      dispatch(setMessage("Pomyślnie udało Ci się utworzyć konto"));
      reset();
    } else {
      setError("email", error);
    }
    setLoadingForm(false);
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.imageSection}>
        <div className={classes.imageSectionInfo}>
          <Typography variant="h4" gutterBottom>
            Dołącz do naszej społeczności
          </Typography>
          <Typography variant="h5">Rozwijaj swoje umiejętności</Typography>
          <Typography variant="h5">Pomóż rozwijać się innym</Typography>
        </div>

        <img
          src="/images/register_vector.svg"
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
            <EmojiPeopleIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Dołącz do nas
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <Grid container className={classes.columns} spacing={2}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="first_name"
                  control={control}
                  defaultValue={""}
                  rules={{ pattern: /^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]+$/i }}
                  render={(props) => (
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="first_name"
                      label="Imię"
                      onChange={(e) => {
                        props.onChange(e.target.value);
                      }}
                      value={props.value}
                      error={errors.first_name ? true : false}
                      helperText={
                        errors.first_name
                          ? "Imię musi zawierać tylko litery"
                          : ""
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="last_name"
                  control={control}
                  defaultValue={""}
                  rules={{ pattern: /^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]+$/i }}
                  render={(props) => (
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="last_name"
                      label="Nazwisko"
                      onChange={(e) => {
                        props.onChange(e.target.value);
                      }}
                      value={props.value}
                      error={errors.last_name ? true : false}
                      helperText={
                        errors.last_name
                          ? "Nazwisko musi zawierać tylko litery"
                          : ""
                      }
                    />
                  )}
                />
              </Grid>
            </Grid>
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
                  type="email"
                  id="email"
                  label="Adres email"
                  autoComplete="email"
                  onChange={(e) => {
                    props.onChange(e.target.value);
                    clearErrors();
                  }}
                  value={props.value}
                  error={errors.email ? true : false}
                  helperText={
                    errors.email
                      ? "Istnieje już konto przypisane do tego emaila."
                      : ""
                  }
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              defaultValue={""}
              rules={{ minLength: 8, required: true }}
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
                  }}
                  value={props.value}
                  error={errors.password ? true : false}
                  helperText={
                    errors.password
                      ? "Hasło musi zawierać minimum 8 znakow"
                      : ""
                  }
                />
              )}
            />
            <Controller
              name="password_confirmation"
              control={control}
              defaultValue={""}
              render={(props) => (
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Powtórz hasło"
                  type="password"
                  id="password_confirmation"
                  autoComplete="current-password"
                  ref={register}
                  onChange={(e) => {
                    props.onChange(e.target.value);
                  }}
                  value={props.value}
                  error={errors.password_confirmation ? true : false}
                  helperText={
                    errors.password_confirmation
                      ? "Hasła muszą się zgadzać"
                      : ""
                  }
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
              Dołącz do nas!
            </LoadingButton>
            <GoogleLoginButton />
            <Grid container spacing={3}>
              <Grid item xs>
                <Link href="#" variant="body2">
                  <a className={classes.link}>Polityka prywatności</a>
                </Link>
              </Grid>
              <Grid item xs style={{ textAlign: "right" }}>
                <Link href="/login" variant="body2">
                  <a className={classes.link}>
                    {"Masz już konto? Zaloguj się"}
                  </a>
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
