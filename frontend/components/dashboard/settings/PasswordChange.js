import { Card, Divider, Grid, Typography } from "@material-ui/core";
import React from "react";
import ControlledInput from "../../ControlledInput";
import useStyles from "./styles/Styles";
import { useForm } from "react-hook-form";
import SaveIcon from "@material-ui/icons/Save";
import LoadingButton from "../../LoadingButton";
import { gql, useMutation } from "@apollo/client";
import { setMessage } from "../../../src/actions/message";
import { useDispatch } from "react-redux";

const UPDATE_PASSWORD = gql`
  mutation updatePassword(
    $old_password: String!
    $password: String!
    $password_confirmation: String!
  ) {
    updatePassword(
      input: {
        old_password: $old_password
        password: $password
        password_confirmation: $password_confirmation
      }
    ) {
      status
      message
    }
  }
`;

export default function PasswordChange() {
  const classes = useStyles();
  const [loadingForm, setLoadingForm] = React.useState(false);
  const [updatePassword] = useMutation(UPDATE_PASSWORD);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    control,
    errors,
    setError,
    clearErrors,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setLoadingForm(true);
    if (data.password != data.password_confirmation) {
      setError("password_confirmation", "Passwords must be the same");
      setLoadingForm(false);
      return;
    }
    await updatePassword({
      variables: {
        old_password: data.old_password,
        password: data.password,
        password_confirmation: data.password_confirmation,
      },
    })
      .then((res) => {
        console.log(res);
        dispatch(setMessage("Pomyślnie zmieniono hasło"));
        reset();
      })
      .catch((err) => {
        console.log(err);
        console.log(err.graphQLErrors);
        setError("old_password", "Bad password");
      });
    setLoadingForm(false);
  };
  return (
    <Card className={classes.root}>
      <Typography variant="h6" component="h3">
        Zmień hasło
      </Typography>
      <Typography variant="caption">
        W tej sekcji możesz zmienić hasło do swojego konta.
      </Typography>
      <Divider />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          <Grid item xs={12}>
            <ControlledInput
              name="old_password"
              control={control}
              id="old_password"
              label="Stare hasło"
              required
              autoComplete="old_password"
              defaultValue={""}
              clearErrors={clearErrors}
              error={errors.old_password ? true : false}
              type="password"
              helperText={
                errors.old_password
                  ? "Podałeś złe hasło. Spróbuj jeszcze raz"
                  : ""
              }
            />
          </Grid>

          <Grid item xs={12}>
            <ControlledInput
              name="password"
              control={control}
              id="password"
              label="Nowe hasło"
              rules={{ minLength: 8 }}
              required
              autoComplete="password"
              defaultValue={""}
              error={errors.password ? true : false}
              type="password"
              clearErrors={clearErrors}
              helperText={
                errors.password ? "Hasło musi zawierać minimum 8 znakow" : ""
              }
            />
          </Grid>

          <Grid item xs={12}>
            <ControlledInput
              name="password_confirmation"
              control={control}
              id="password_confirmation"
              label="Potwierdź hasło"
              required
              autoComplete="password_confirmation"
              defaultValue={""}
              error={errors.password_confirmation ? true : false}
              type="password"
              clearErrors={clearErrors}
              helperText={
                errors.password_confirmation ? "Hasła muszą być takie same" : ""
              }
            />
          </Grid>
        </Grid>
        <LoadingButton
          loading={loadingForm || false}
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<SaveIcon />}
        >
          Zmień
        </LoadingButton>
      </form>
    </Card>
  );
}
