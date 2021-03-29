import React from "react";
import {firstContentStyles} from "./styles/firstContentStyles";
import {Box} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

export default function FirstContent() {
    const classes = firstContentStyles();
    return (
        <>
            <Box className={classes.leftSideBox}>
                <Box className={classes.sizes}></Box>
                <div className={classes.circle}>
                    <img
                        src="/images/kosmos_vector.svg"
                        alt="login page image"
                        className={classes.image}
                    />
                </div>
            </Box>
            <Box className={classes.rightSideBox}></Box>

        </>
    )
}
