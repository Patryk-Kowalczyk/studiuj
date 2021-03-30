import React from "react";
import Box from "@material-ui/core/Box";
import {landingStyles} from "./styles/landingStyles";
import {Header, FirstPageContent} from "../components/landing";

export default function LandingPage() {
    const classes = landingStyles();
    return (
        <Box className={classes.root}>
            <Header/>
            <FirstPageContent/>
        </Box>
    );
}
