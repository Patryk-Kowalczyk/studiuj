import {Box} from "@material-ui/core";
import {footerStyles} from "./styles";
import {SiInstagram, SiFacebook, SiTwitter} from "react-icons/si";

export default function FooterContent() {
    const classes = footerStyles();
    return (
        <Box className={classes.bgc}>
            <Box className={classes.maxWidthBox}>
                <Box>
                    <h1 className={classes.border}>Studiuj.pl</h1>
                    <p className={classes.p}>Copyright TeamStudiuj.pl</p>
                    <Box className={classes.socialMediaContainer}>
                        <SiFacebook className={classes.hover}/>
                        <SiInstagram className={classes.hover}/>
                        <SiTwitter className={classes.hover}/>
                    </Box>
                </Box>

                <Box className={classes.about}>
                    <h1>O nas</h1>
                    <p>Polityka prywatności</p>
                    <p>Regulamin</p>
                    <p>Kontakt</p>
                </Box>

            </Box>
        </Box>
    )
}
