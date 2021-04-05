import {Box} from "@material-ui/core";
import {secondContentStyles, BackgroundIcons} from "./styles";
import React from "react";

export default function SecondContent() {
    const classes = secondContentStyles();
    return (
        <Box className={classes.bgc}>
            <Box className={classes.maxWidthBox}>

                <Box className={classes.content}>
                    <img src="/images/info_vector.svg" alt="info" className={classes.image}/>
                    <Box className={classes.text}>
                        <p className={classes.p}> #kimjestesmy</p>
                        <h1>Jak dokładnie działamy?</h1>


                    </Box>
                </Box>
                <Box className={classes.content}>
                    <img src="/images/help_vector.svg" alt="info" className={classes.image}/>
                </Box>
                <Box className={classes.content}>
                    <img src="/images/world_vector.svg" alt="info" className={classes.image}/>
                </Box>
                <BackgroundIcons/>
            </Box>
        </Box>
    )
}
