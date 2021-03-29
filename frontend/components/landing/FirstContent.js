import React from "react";
import {firstContentStyles} from "./styles/firstContentStyles";
import {Box} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

export default function FirstContent() {
    const classes = firstContentStyles();
    return (
        <>
            <Box className={classes.leftSideBox}>
                <img
                    src="/images/kosmos_vector.svg"
                    alt="login page image"
                    className={classes.image}
                />
            </Box>
            <Box className={classes.rightSideBox}></Box>

        </>
    )
}
