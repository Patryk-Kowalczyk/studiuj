import {makeStyles} from "@material-ui/core/styles";

export const thirdContentStyles = makeStyles((theme) => ({
    bgc: {
        backgroundColor: theme.palette.background.thirdContent,
        maxWidth: "1800px",
        margin: "0 auto",
        position: "relative",
    },
    maxWidthBox: {
        maxWidth: "1400px",
        height: "100vh",
        margin: "0 auto",
        textAlign: "center",
    },

}))

export default thirdContentStyles;
