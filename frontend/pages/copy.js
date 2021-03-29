import React from "react";
import {motion} from "framer-motion";
import {
    Box,
    Button,
    ButtonGroup,
    Container,
    Typography,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import ButtonLink from "../components/ButtonLink";

const useStyles = makeStyles((theme) => ({
        root: {
            height: "100vh",
            overflow: "hidden",

        },
        imageSection: {
            backgroundColor: theme.palette.primary.light,
            backgroundRepeat: "no-repeat",
            position: "relative",
            clipPath: "ellipse(75% 33% at 0% 47%)",
            overflow: "hidden",


        },
        image: {
            position: "absolute",
            width: "100%",
            height: "50%",
            left: "50%",
            top: "50%",
            transform: "translate(-60%,-55%)",
        },
        image2: {
            position: "absolute",
            width: "40%",
            height: "50%",
            left: "50%",
            top: "50%",
        },
        gridBox: {
            display: "flex",
            alignItems: "center",
        },
        paper: {
            margin: theme.spacing(4, 2),
            display: "flex",
            width: "100%",
            height: "100%",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            backgroundColor: theme.palette.primary.light,
            clipPath: "ellipse(100% 33% at 100% 76%)",


        },
        avatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.primary.main,
        },
        form: {
            width: "100%",
            marginTop: theme.spacing(1),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
        link: {
            color: theme.palette.primary.main,
            cursor: "pointer",
            textDecoration: "none",
        },
        navBox: {
            position: "fixed",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
            backgroundColor: theme.palette.primary.main,

            right: "0",
            top: "0",
            width: "100%",
            height: "12%",
            clipPath: "ellipse(35% 67% at 50% 33%)",

        },
        text: {
            color: "white",
        },
        textFixed: {
            position: "fixed",
            bottom: "8%",
            left: "20px",
            width: "50%"
        },
        textFixed1: {
            position: "fixed",
            top: "25%",
            right: "0",
            width: "50%"
        }
    }))
;

export default function SignInSide() {
    const classes = useStyles();


    return (
        <>
            <Grid container component="main" className={classes.root}>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    className={classes.imageSection}
                    component={motion.div}

                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 0.9}}
                >
                    <img
                        src="/images/kosmos_vector.svg"
                        alt="login page image"
                        className={classes.image}
                    />
                </Grid>
                <Grid
                    item
                    xs={2}
                    sm={9}
                    md={5}
                    className={classes.gridBox}
                    component={motion.div}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 0.9}}
                >
                    <div className={classes.paper}>
                        <img
                            src="/images/reading_vector.svg"
                            alt="login page image"
                            className={classes.image2}
                        />


                    </div>
                </Grid>
                <Box className={classes.navBox}
                     component={motion.div}

                     initial={{opacity: 0}}
                     animate={{opacity: 1}}
                     transition={{duration: 0.9}}>
                    <Typography variant="h3" component="h3" className={classes.text}>
                        Studiuj.pl
                    </Typography>
                    <ButtonGroup variant={"text"} size="large" className={classes.text}>
                        <ButtonLink className={classes.text} href="/login">Zaloguj się</ButtonLink>
                        <ButtonLink className={classes.text} href="/register">Dołącz do nas</ButtonLink>
                    </ButtonGroup>
                </Box>

            </Grid>
            <Typography variant="h5"
                        className={classes.textFixed}
                        component={motion.div}
                        initial={{x: -400, opacity: 0}}
                        animate={{x: 0, opacity: 1}}
                        transition={{duration: 0.6}}>
                Wznieś swoje umiejętności na wyższy poziom. Kliknij w strzałkę aby dowiedzieć się więcej.
            </Typography>
            <Typography variant="h4"
                        className={classes.textFixed1}
                        component={motion.div}
                        initial={{x: 400, opacity: 0}}
                        animate={{x: 0, opacity: 1}}
                        transition={{duration: 0.6}}>
                Z miłości do dzielenia się <b>wiedzą</b>
            </Typography>
        </>
    );
}
