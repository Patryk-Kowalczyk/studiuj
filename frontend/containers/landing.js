import React from "react";
import Box from "@material-ui/core/Box";
import {containerStyles} from "../components/landing/styles/containerStyles";
import {Header, FirstContent} from "../components/landing";

export default function LandingPage() {
    const classes = containerStyles();
    return (
        <Box className={classes.root}>
            <Header/>
            <Box className={classes.firstContent}>
                <FirstContent/>
            </Box>
        </Box>
    );
}
