import {makeStyles} from "@material-ui/core/styles";

export const secondContentStyles = makeStyles((theme) => ({
    bgc: {
        backgroundColor: theme.palette.background.secondContent,
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

export default secondContentStyles;
