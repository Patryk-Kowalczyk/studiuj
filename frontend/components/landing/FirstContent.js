import React from "react";
import {firstContentStyles} from "./styles/firstContentStyles";
import {Box, Typography} from "@material-ui/core";

export default function FirstContent() {
    const classes = firstContentStyles();
    return (
        <Box className={classes.headerBox}>
            <Box className={classes.boxMaxWidth}>
                <Box className={classes.leftSideBox}>
                    <div className={classes.circle}>
                        <img
                            src="/images/kosmos_vector.svg"
                            alt="login page image"
                            className={classes.image}
                        />
                    </div>
                </Box>
                <Box className={classes.rightSideBox}>
                    <Typography className={classes.h1}>
                        {`"Inwestowanie w wiedzę, zawsze 
                        przynosi
                        największe zyski" - Bejnamin Franklin`}
                    </Typography>
                </Box>

            </Box>
        </Box>

    )
}
