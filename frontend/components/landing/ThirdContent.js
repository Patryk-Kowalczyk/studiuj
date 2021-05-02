import {Box} from "@material-ui/core";
import {thirdContentStyles, BackgroundIcons} from "./styles";
import StepperThird from "./Stepper";
import React from "react";

export default function ThirdContent() {
    const classes = thirdContentStyles();
    return (
        <Box className={classes.bgc}>
            <Box className={classes.maxWidthBox}>
                <h1 className={classes.h1}><span className={classes.span}>Sukces</span> w 3 krokach </h1>
                <StepperThird/>
                <BackgroundIcons none/>
            </Box>
        </Box>
    )
}
