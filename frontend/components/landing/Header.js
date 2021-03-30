import {Box, Typography} from "@material-ui/core";
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
                <Box>
                    <ButtonLink className={classes.buttonHeader} href="/login">logowanie</ButtonLink>
                    <ButtonLink className={classes.buttonHeader} href="/register">rejestrajca</ButtonLink>
                </Box>
            </Box>
        </Box>
    )
}
