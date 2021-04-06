import {Box} from "@material-ui/core";
import {fourthContentStyles, BackgroundIcons} from "./styles";
import FlipCard from "./FlipCard";

export default function FourthContent() {
    const classes = fourthContentStyles();
    return (
        <Box className={classes.bgc}>
            <Box className={classes.maxWidthBox}>
                <FlipCard/>
                <FlipCard/>
                <FlipCard/>
                <FlipCard/>
                <FlipCard/>
                <FlipCard/>
                <FlipCard/>
                <FlipCard/>
                <FlipCard/>


                <BackgroundIcons/>
            </Box>
        </Box>
    )
}
