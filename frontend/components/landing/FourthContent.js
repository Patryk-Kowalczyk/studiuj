import {Box} from "@material-ui/core";
import {fourthContentStyles, BackgroundIcons} from "./styles";

export default function FourthContent() {
    const classes = fourthContentStyles();
    return (
        <Box className={classes.bgc}>
            <Box className={classes.maxWidthBox}>
                TRALALA
                <BackgroundIcons/>
            </Box>
        </Box>
    )
}
