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
                        <p className={classes.p}> #thegoodfather</p>
                        <h1 className={classes.h1}> U<span className={classes.span}>ratujemy</span> Cię z opresji</h1>
                        <p className={classes.pContent}>Sesja depresja... każdy student zna to powiedzenie. Potrzebujesz
                            pomocy z projektem lub zadaniem? Zadaj pytanie lub dodaj ogłoszenie. Umów termin i popraw
                            swoją sytuację. Jeśli przypomniało Ci się w święta, w nocy lub w innym niewygodnym
                            terminie to skorzystaj z naszej usługi <span
                                className={classes.span}>help24</span>.
                        </p>
                    </Box>
                    <img src="/images/help_vector.svg" alt="info" className={classes.image}/>
                </Box>
                <Box className={classes.content}>
                    <img src="/images/world_vector.svg" alt="info" className={classes.image}/>
                    <Box className={classes.text}>
                        <p className={classes.p}> #globalvillage</p>
                        <h1 className={classes.h1}><span className={classes.span}>Gdzie</span>kolwiek <span
                            className={classes.span}>jesteś</span></h1>
                        <p className={classes.pContent}>
                            Zarabiaj z dowolnego miejsca na ziemi. Pracuj wygodnie lub uzyskuj pomoc z
                            dowolnych zagadnień. Studiujesz w innym kraju i nie masz pomysłu skąd uzyskać pomoc? <span
                            className={classes.span}>Nic straconego!</span>.
                        </p>
                    </Box>
                </Box>
            </Box>
            <BackgroundIcons/>
        </Box>
    )
}
