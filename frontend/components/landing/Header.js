import {Box, ButtonGroup, Typography} from "@material-ui/core";
import {motion} from "framer-motion";
import ButtonLink from "../ButtonLink";
import React from "react";
import {headerStyles} from "./styles/headerStyles";
import {BsBookHalf} from "react-icons/bs";

export default function Header() {
    const classes = headerStyles();
    return (
        <Box className={classes.headerBox}
             component={motion.div}
             initial={{opacity: 0}}
             animate={{opacity: 1}}
             transition={{duration: 0.9}}>
            <Box className={classes.boxMaxWidth}>
                <Box className={classes.logoBox}>
                    <Typography className={classes.logo}> <BsBookHalf/></Typography>
                    <Typography className={classes.logoText}> <span
                        className={classes.colorS}>S</span>tudiuj.pl</Typography>
                </Box>
                <ButtonGroup variant={"text"} size="large" className={classes.text}>
                    <ButtonLink className={classes.text} href="/login">Zaloguj się</ButtonLink>
                    <ButtonLink className={classes.text} href="/register">Dołącz do nas</ButtonLink>
                </ButtonGroup>
            </Box>
        </Box>
    )
}
