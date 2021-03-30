import React from "react";
import {firstContentStyles} from "./styles/firstContentStyles";
import {Box, Typography} from "@material-ui/core";
import {BiPaperPlane} from "react-icons/bi";
import {RiCompasses2Fill, RiPencilLine, RiScissorsLine, RiRulerLine, RiBookOpenLine} from "react-icons/ri";

export default function FirstContent() {
    const classes = firstContentStyles();
    return (
        <>
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
            <BiPaperPlane className={classes.plane}/>
            <RiCompasses2Fill className={classes.compass}/>
            <RiPencilLine className={classes.pencil}/>
            <RiScissorsLine className={classes.scissors}/>
            <RiRulerLine className={classes.ruler}/>
            <RiBookOpenLine className={classes.book}/>
        </>
    )
}
