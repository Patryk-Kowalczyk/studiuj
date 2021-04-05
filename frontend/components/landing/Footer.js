import {Box} from "@material-ui/core";
import {footerStyles, BackgroundIcons} from "./styles";

export default function FooterContent() {
    const classes = footerStyles();
    return (
        <Box className={classes.bgc}>
            <Box className={classes.maxWidthBox}>
                TRALALA
                <BackgroundIcons/>
            </Box>
        </Box>
    )
}
