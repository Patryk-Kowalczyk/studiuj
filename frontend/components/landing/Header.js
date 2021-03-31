import {Box, Typography} from "@material-ui/core";
import {motion} from "framer-motion";
import ButtonLink from "../ButtonLink";
import React from "react";
import {BsBookHalf} from "react-icons/bs";
import {headerStyles} from "./styles";

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
                        style={{fontSize: "27px"}}>S</span>tudiuj.pl</Typography>
                </Box>
                <Box>
                    <ButtonLink className={classes.navigationHeader} href="/login">logowanie</ButtonLink>
                    <ButtonLink className={classes.navigationHeader} href="/register">rejestracja</ButtonLink>
                </Box>
            </Box>
        </Box>
    )
}
