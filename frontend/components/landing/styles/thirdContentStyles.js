import {makeStyles} from "@material-ui/core/styles";

export const thirdContentStyles = makeStyles((theme) => ({
    bgc: {
        backgroundColor: theme.palette.background.thirdContent,
    },
    maxWidthBox: {
        position: "relative",
        maxWidth: "1800px",
        height: "100vh",
        margin: "0 auto",
        display: "flex",
        [theme.breakpoints.down('md')]: {
            flexDirection: "column",
        },
    },

}))

export default thirdContentStyles;
