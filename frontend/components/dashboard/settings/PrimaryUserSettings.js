import React from "react";
import {
  Avatar,
  Button,
  Card,
  Divider,
  Grid,
  Typography,
} from "@material-ui/core";
import useStyles from "./styles/PrimaryUserSettingsStyles";
import { useForm } from "react-hook-form";
import ControlledInput from "../../ControlledInput";
import AttachFileIcon from "@material-ui/icons/AttachFile";

export default function PrimaryUserSettings({ user }) {
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    control,
    errors,
    setError,
    clearErrors,
  } = useForm();
  const [newAvatar, setNewAvatar] = React.useState(null);
  const [imie, nazwisko] = user.name.split(" ");

  return (
    <Card className={classes.root}>
      <Typography variant="h6" component="h3">
        Twoje dane osobowe oraz zdjęcie.
      </Typography>
      <Divider />
      <form>
        <Grid container spacing={1}>
          <Grid item xs={8}>
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
              <Grid item xs={6}>
                <ControlledInput
                  name="imie"
                  control={control}
                  id="imie"
                  label="Imię"
                  autoComplete="imie"
                  defaultValue={imie}
                  error={errors.imie ? true : false}
                />
              </Grid>
              <Grid item xs={6}>
                <ControlledInput
                  name="Nazwisko"
                  control={control}
                  id="nazwisko"
                  label="Nazwisko"
                  defaultValue={nazwisko}
                  autoComplete="nazwisko"
                  error={errors.nazwisko ? true : false}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={4} className={classes.avatarSection}>
            <Avatar src={newAvatar || ""} className={classes.avatar}>
              A
            </Avatar>
            <Typography variant="caption">
              Zdjęcie musi być kwadratowe i ważyć maksymalnie 512KB
            </Typography>
            <input
              accept="image/*"
              className={classes.input}
              hidden
              id="button-file"
              type="file"
              onChange={(e) => {
                setNewAvatar(URL.createObjectURL(e.target.files[0]) || null);
              }}
            />
            <label htmlFor="button-file">
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
        <Button variant="contained" color="primary" className={classes.button}>
          Zatwierdź
        </Button>
      </form>
    </Card>
  );
}
