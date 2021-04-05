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
                        <p className={classes.p}> #whoweare</p>
                        <h1 className={classes.h1}>Jak <span className={classes.span}>dokładnie działamy</span>?</h1>
                        <p className={classes.pContent}>
                            Portal skierowany jest do osób kształcących się na <span
                            className={classes.spanUnderline}>studiach</span> oraz w <span
                            className={classes.spanUnderline}>szkołach średnich</span>.
                            Przedmioty, kierunki, specjalizacje są odpowiednio <span
                            className={classes.span}>skategoryzowane</span>. Korzystanie z platformy
                            zapewni Ci lepsze zrozumienie i ułatwi postepy w edukacji.
                        </p>
                    </Box>
                </Box>
                <Box className={classes.content}>
                    <Box className={classes.text}>
                        <p className={classes.p}> #thegoodgather</p>
                        <h1>Uratujemy cię z opresji</h1>
                    </Box>
                    <img src="/images/help_vector.svg" alt="info" className={classes.image}/>
                </Box>
                <Box className={classes.content}>
                    <img src="/images/world_vector.svg" alt="info" className={classes.image}/>
                    <Box className={classes.text}>
                        <p className={classes.p}> #globalvillage</p>
                        <h1>Gdziekolwiek jesteś</h1>
                    </Box>
                </Box>
                <BackgroundIcons/>
            </Box>
        </Box>
    )
}
