import Box from "@material-ui/core/Box";
import {landingStyles} from "./styles/landingStyles";
import {Header, FirstContent, SecondContent, ThirdContent, FourthContent, Footer} from "../components/landing";

export default function LandingPage() {
    const classes = landingStyles();
    return (
        <>
            <Box className={classes.root}>
                <Header/>
                <FirstContent/>
                <SecondContent/>
                <ThirdContent/>
                <FourthContent/>
                <Footer/>
            </Box>

        </>
    );
}
