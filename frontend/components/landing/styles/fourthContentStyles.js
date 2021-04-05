import {makeStyles} from "@material-ui/core/styles";

export const fourthContentStyles = makeStyles((theme) => ({
    bgc: {
        backgroundColor: theme.palette.background.fourthContent,
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

export default fourthContentStyles;
