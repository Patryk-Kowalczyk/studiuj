import {Box} from "@material-ui/core";
import {secondContentStyles, BackgroundIcons} from "./styles";

export default function SecondContent() {
    const classes = secondContentStyles();
    return (
        <Box className={classes.bgc}>
            <Box className={classes.maxWidthBox}>
                TRALALA
                <BackgroundIcons/>
            </Box>
        </Box>
    )
}
