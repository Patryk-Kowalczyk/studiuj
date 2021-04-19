import React from "react";
import { gql } from "@apollo/client";
import { useApollo } from "../../../lib/apolloClient";
import {
  Avatar,
  Button,
  Card,
  Divider,
  Grid,
  Typography,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../../src/actions/auth";
import useStyles from "./styles/Styles";
import { useForm } from "react-hook-form";
import ControlledInput from "../../ControlledInput";
import LoadingButton from "../../LoadingButton";

import AttachFileIcon from "@material-ui/icons/AttachFile";
import SaveIcon from "@material-ui/icons/Save";

const CHANGE_USER_PRIMARY_INFO = gql`
  mutation ChangeUserPrimaryInfo(
    $name: String!
    $email: String!
    $avatar: Upload
  ) {
    ChangeUserPrimaryInfo(name: $name, email: $email, avatar: $avatar) {
      name
      email
      avatar
    }
  }
`;

export default function PrimaryUserSettings({ user }) {
  const classes = useStyles();
  const client = useApollo();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    control,
    errors,
    setError,
    clearErrors,
  } = useForm();

  const [newAvatar, setNewAvatar] = React.useState(null);
  const [loadingForm, setLoadingForm] = React.useState(false);

  const [first_name, last_name] = user.name.split(" ");

  const onSubmit = async (data) => {
    setLoadingForm(true);
    const name = data.first_name + " " + data.last_name;
    const avatar = data.avatar[0] || null;

    await client
      .mutate({
        mutation: CHANGE_USER_PRIMARY_INFO,
        variables: { name, email: data.email, avatar: avatar },
      })
      .then((res) => {
        dispatch(setUserInfo(res.data.ChangeUserPrimaryInfo));
        setLoadingForm(false);
      })
      .catch((err) => {
        console.log(err.graphQLErrors);
        setLoadingForm(false);
      });
  };

  return (
    <Card className={classes.root}>
      <Typography variant="h6" component="h3">
        Twoje dane osobowe oraz zdjęcie.
      </Typography>
      <Divider />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1}>
          <Grid item xs={7} md={8}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <ControlledInput
                  name="email"
                  control={control}
                  id="email"
                  defaultValue={user.email}
                  label="Adres email"
                  autoComplete="email"
                  error={errors.serverError ? true : false}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <ControlledInput
                  name="first_name"
                  control={control}
                  id="first_name"
                  label="Imię"
                  rules={{ pattern: /^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]+$/i }}
                  autoComplete="first_name"
                  defaultValue={first_name}
                  error={errors.first_name ? true : false}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <ControlledInput
                  name="last_name"
                  control={control}
                  id="last_name"
                  label="Nazwisko"
                  defaultValue={last_name}
                  autoComplete="last_name"
                  error={errors.last_name ? true : false}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={5} md={4} className={classes.avatarSection}>
            <Avatar
              src={
                newAvatar ||
                (user.avatar && `${process.env.BACKEND_HOST}/${user.avatar}`) ||
                ""
              }
              className={classes.avatar}
            >
              {user.name[0]}
            </Avatar>
            <Typography variant="caption">
              Zdjęcie musi być kwadratowe i ważyć maksymalnie 512KB
            </Typography>
            <input
              accept="image/*"
              className={classes.input}
              hidden
              id="avatar"
              type="file"
              name="avatar"
              ref={register}
              onChange={(e) => {
                setNewAvatar(URL.createObjectURL(e.target.files[0]) || null);
              }}
            />
            <label htmlFor="avatar">
              <Button
                variant="outlined"
                color="primary"
                component="span"
                className={classes.button}
                startIcon={<AttachFileIcon />}
              >
                Wybierz
              </Button>
            </label>
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
          Zatwierdź
        </LoadingButton>
      </form>
    </Card>
  );
}
