import {Box} from "@material-ui/core";
import {fourthContentStyles, BackgroundIcons} from "./styles";
import FlipCard from "./FlipCard";
import React from "react";

export default function FourthContent() {
    const classes = fourthContentStyles();
    return (
        <Box className={classes.bgc}>
            <Box className={classes.maxWidthBox}>
                <span className={classes.p}>#faq</span>
                <h1 className={classes.h1}> Najczęsciej zadawane <span className={classes.span}>pytania</span></h1>
                <FlipCard/>
                <FlipCard/>
                <FlipCard/>
                <FlipCard/>
                <FlipCard/>
                <FlipCard/>
                <FlipCard/>
                <FlipCard/>
                <FlipCard/>
                <div className={classes.margin}/>
                <BackgroundIcons none/>
            </Box>
        </Box>
    )
}
