import {makeStyles} from "@material-ui/core/styles";

export const footerStyles = makeStyles((theme) => ({
    bgc: {
        backgroundColor: theme.palette.background.footer,
        maxWidth: "1800px",
        margin: "0 auto",
        position: "relative",


    },
    maxWidthBox: {
        maxWidth: "1400px",
        height: "100%",
        margin: "0 auto",
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-around",
    },
    border: {
        borderBottom: "1px solid",
        width: "300px",
    },
    socialMediaContainer: {

        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    hover: {
        fontSize: "35px",
        margin: "10px",
        padding: "2px",
        transition: ".3s",
        cursor: "pointer",
        '&:hover': {
            color: theme.palette.primary.light,
            border: "2px solid",
        },

    }

}))

export default footerStyles;
