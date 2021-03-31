import React from "react";
import {Box, Typography} from "@material-ui/core";
import {BiPaperPlane} from "react-icons/bi";
import {RiCompasses2Fill, RiPencilLine, RiScissorsLine, RiRulerLine, RiBookOpenLine} from "react-icons/ri";
import {backgroundIcons, firstContentStyles} from "./styles";

export default function FirstContent() {
    const classes = firstContentStyles();
    const icons = backgroundIcons();
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
                        <Box className={classes.rightContent}>
                            <Box className={classes.contentArea}>
                                <Box className={classes.contentAreaText}>
                                    <p className={classes.contentAreaTextP}> #studiujznami</p>
                                    <div className={classes.contentAreaTextDiv1}>udzielaj się i zdobywaj reputację,
                                    </div>
                                    <div className={classes.contentAreaTextDiv1}>twórz spotkania i korzystaj z naszej
                                        platformy <span
                                            className={classes.contentAreaTextSpan}>korepetycji online</span>
                                    </div>
                                    <div className={classes.contentAreaTextDiv2}>dołącz już dziś i twórz z nami
                                        społeczność
                                    </div>
                                    <button className={classes.button}>zarejstruj konto</button>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>

            </Box>
            <BiPaperPlane className={icons.plane}/>
            <RiCompasses2Fill className={icons.compass}/>
            <RiPencilLine className={icons.pencil}/>
            <RiScissorsLine className={icons.scissors}/>
            <RiRulerLine className={icons.ruler}/>
            <RiBookOpenLine className={icons.book}/>
        </>
    )
}
