import Box from "@material-ui/core/Box";

import {
  Header,
  FirstContent,
  SecondContent,
  ThirdContent,
  FourthContent,
  Footer,
} from "./index";
import {landingStyles} from "./styles";

export default function LandingPage() {
  const classes = landingStyles();
  return (
    <>
      <Box className={classes.root}>
        <Header />
        <FirstContent />
        <SecondContent />
        <ThirdContent />
        <FourthContent />
        <Footer />
      </Box>
    </>
  );
}
