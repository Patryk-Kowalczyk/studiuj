import {Box, Typography} from "@material-ui/core";
import {BackgroundIcons, firstContentStyles} from "./styles";

export default function FirstContent() {
    const classes = firstContentStyles();
    return (
        <>
            <Box className={classes.bgc}>
                <Box className={classes.maxWidth_Grid}>
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
                            <Box className={classes.contentArea}>
                                <p className={classes.contentAreaTextP}> #studiujznami</p>
                                <div className={classes.contentAreaTextDiv1}>udzielaj się i zdobywaj reputację,<br/>
                                    twórz spotkania i korzystaj z naszej platformy <span
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
            <BackgroundIcons/>
        </>
    )
}
