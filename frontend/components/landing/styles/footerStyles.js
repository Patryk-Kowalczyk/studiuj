import {makeStyles} from "@material-ui/core/styles";

export const footerStyles = makeStyles((theme) => ({
    bgc: {
        backgroundColor: theme.palette.background.footer,
    },
    maxWidthBox: {
        position: "relative",
        maxWidth: "1800px",
        height: "100%",
        margin: "0 auto",
        display: "flex",
        [theme.breakpoints.down('md')]: {
            flexDirection: "column",
        },
    },

}))

export default footerStyles;
