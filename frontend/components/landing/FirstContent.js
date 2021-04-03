import {Box, Typography} from "@material-ui/core";
import {BackgroundIcons, firstContentStyles} from "./styles";
import {SiWechat, SiInstagram, SiFacebook, SiTwitter} from "react-icons/si";
import {motion} from "framer-motion";
import React from "react";
import Grid from "@material-ui/core/Grid";

export default function FirstContent() {
    const classes = firstContentStyles();
    return (
        <Box className={classes.bgc}>
            <Box className={classes.maxWidthBox}>
                <Box className={classes.leftSide}>
                    <div className={classes.circle}>
                        <img src="/images/kosmos_vector.svg" alt="kosmos" className={classes.image}/>
                    </div>
                </Box>
                <Box className={classes.rightSide}>
                    <Typography className={classes.h1}>
                        "Inwestowanie w wiedzę, zawsze przynosi największe zyski" - Bejnamin Franklin
                    </Typography>
                    <Box className={classes.rightContent}>
                        <p className={classes.p}> #studiujznami</p>
                        udzielaj się i zdobywaj reputację,<br/>
                        twórz spotkania i korzystaj z naszej platformy <span className={classes.span}>
                        korepetycji online</span>
                        <div className={classes.divWeight}>dołącz już dziś i twórz z nami
                            społeczność
                        </div>
                        <button className={classes.button}>zarejestruj konto</button>
                    </Box>
                </Box>
                <BackgroundIcons/>
                <Box className={classes.socialMediaContainer}>
                    <SiFacebook className={classes.hover}/>
                    <SiInstagram className={classes.hover}/>
                    <SiTwitter className={classes.hover}/>
                </Box>
            </Box>

            <Box className={classes.messageContainer}>
                <SiWechat className={classes.messageButton}/>
            </Box>

        </Box>
    )
}
