import {Box, ButtonGroup, Typography} from "@material-ui/core";
import {motion} from "framer-motion";
import ButtonLink from "../ButtonLink";
import React from "react";
import {headerStyles} from "./styles/headerStyles";

export default function Header() {
    const classes = headerStyles();
    return (
        <Box className={classes.headerBox}
             component={motion.div}
             initial={{opacity: 0}}
             animate={{opacity: 1}}
             transition={{duration: 0.9}}>
            <Typography variant="h3" component="h3" className={classes.text}>
                Studiuj.pl
            </Typography>
            <ButtonGroup variant={"text"} size="large" className={classes.text}>
                <ButtonLink className={classes.text} href="/login">Zaloguj się</ButtonLink>
                <ButtonLink className={classes.text} href="/register">Dołącz do nas</ButtonLink>
            </ButtonGroup>
        </Box>
    )
}
