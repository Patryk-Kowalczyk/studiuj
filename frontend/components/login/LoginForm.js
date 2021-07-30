import {Controller, useForm} from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import LoadingButton from "../common/LoadingButton";
import GoogleLoginButton from "./GoogleLoginButton";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import React from "react";
import authService from "../../lib/services/authService";
import {useDispatch} from "react-redux";
import Router from "next/router";
import {setMessage} from "../../lib/store/actions/message";
import {useStyles} from "./styles/loginPageStyles";

function LoginForm({handleClickOpen}) {
    const classes = useStyles();
    const [loadingForm, setLoadingForm] = React.useState(false);
    const { register, handleSubmit, control, errors, setError, clearErrors } =
        useForm();

    const { login } = authService();
    const dispatch = useDispatch();

    // Login
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
    return <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
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
                    error={!!errors.serverError}
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
                    error={!!errors.serverError}
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
        <GoogleLoginButton />
        <Grid container spacing={3}>
            <Grid item xs>
                <Typography
                    variant="body2"
                    onClick={handleClickOpen}
                    className={classes.link}
                >
                    Zapomniałeś hasła?
                </Typography>
            </Grid>
            <Grid item xs style={{ textAlign: "right" }}>
                <Link
                    href="/register"
                    variant="body2"
                    style={{ textAlign: "right" }}
                >
                    <a className={classes.link}>
                        Nie masz jeszcze konta? Dołącz do nas!
                    </a>
                </Link>
            </Grid>
        </Grid>
    </form>
}

export default LoginForm;