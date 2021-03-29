import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import {containerStyles} from "../components/landing/styles/containerStyles";
import {Header} from "../components/landing";

export default function LandingPage() {
    const classes = containerStyles();
    return (
        <Box className={classes.root}>
            <Header/>
            <Box className={classes.firstContent}>
                <div>Tekst</div>
                <div>Tekst</div>
            </Box>
        </Box>
    );
}
