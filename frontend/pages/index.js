import React from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import blueGrey from "@material-ui/core/colors/blueGrey";
import ButtonLink from "../components/ButtonLink";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    minHeight: "100vh",
    backgroundColor: theme.palette.primary.light,
    color: blueGrey[50],
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttons: {
    marginTop: theme.spacing(3),
  },
}));

function Home() {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Container>
        <Typography variant="h2" component="h1">
          Studiuj.pl
        </Typography>
        <Typography variant="h4">
          Z miłości do dzielenia się <b>wiedzą</b>
        </Typography>
        <ButtonGroup size="large" color="inherit" className={classes.buttons}>
          <ButtonLink href="/login">Zaloguj się</ButtonLink>
          <ButtonLink href="/register">Dołącz do nas</ButtonLink>
        </ButtonGroup>
      </Container>
    </Box>
  );
}

export default Home;
