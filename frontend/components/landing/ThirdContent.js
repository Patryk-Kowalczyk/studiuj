import {Box} from "@material-ui/core";
import {thirdContentStyles, BackgroundIcons} from "./styles";
import StepperThird from "./Stepper";

export default function ThirdContent() {
    const classes = thirdContentStyles();
    return (
        <Box className={classes.bgc}>
            <Box className={classes.maxWidthBox}>
                <StepperThird/>
                <BackgroundIcons/>
            </Box>
        </Box>
    )
}
