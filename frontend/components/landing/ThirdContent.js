import {Box} from "@material-ui/core";
import {thirdContentStyles, BackgroundIcons} from "./styles";

export default function ThirdContent() {
    const classes = thirdContentStyles();
    return (
        <Box className={classes.bgc}>
            <Box className={classes.maxWidthBox}>
                TRALALA
                <BackgroundIcons/>
            </Box>
        </Box>
    )
}
