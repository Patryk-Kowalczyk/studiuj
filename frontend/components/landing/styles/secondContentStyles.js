import {makeStyles} from "@material-ui/core/styles";

export const secondContentStyles = makeStyles((theme) => ({
    bgc: {
        backgroundColor: theme.palette.background.secondContent,
        maxWidth: "1800px",
        borderTop: "20px solid",
        margin: "0 auto",
        position: "relative",
        borderColor: theme.palette.primary.light,


    },
    maxWidthBox: {
        maxWidth: "1400px",
        height: "100%",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
    },
    image: {
        maxHeight: "360px",
    },
    content: {
        margin: "30px",
        padding: "50px",
        display: "flex",
        justifyContent: "space-around",
        borderBottom: "1px solid black",
    },
    text: {
        width: "60%",
    },
    p: {
        color: theme.palette.primary.light,
        fontSize: "16px",
        fontStyle: "italic",
        fontWeight: theme.fonts.weight.medium,
    },
    h1: {
        fontFamily: theme.fonts.family.content,
        fontWeight: theme.fonts.weight.medium,
    },
    span: {
        color: theme.palette.primary.light,
        fontWeight: theme.fonts.weight.medium,

    },
    pContent: {
        fontFamily: theme.fonts.family.content,
        fontSize: "24px",
        fontWeight: theme.fonts.weight.normal,

    },
    spanUnderline: {
        color: theme.palette.primary.light,
        textDecoration: "underline",
    },

}))

export default secondContentStyles;
