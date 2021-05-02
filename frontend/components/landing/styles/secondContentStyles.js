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
        width: "30%",
        maxWidth: "360px",
        maxHeight: "360px",
        [theme.breakpoints.down('xs')]: {
            margin: "20px",
        },
    },
    content: {
        margin: "30px",
        padding: "50px",
        display: "flex",
        justifyContent: "space-around",
        borderBottom: "1px solid black",
        [theme.breakpoints.down('xs')]: {
            justifyContent: "center",
            alignItems: "center",
            padding: "10px",
            margin: "10px",
            flexDirection: "column"
        },


    },
    text: {
        width: "60%",
        [theme.breakpoints.down('xs')]: {
            width: "100%",
            textAlign: "center",
            marginTop: "0",
        },
    },
    p: {
        color: theme.palette.primary.light,
        fontSize: "16px",
        fontStyle: "italic",
        fontWeight: theme.fonts.weight.medium,
        [theme.breakpoints.down('xs')]: {
            fontSize: "12px",

        },
    },
    h1: {
        fontFamily: theme.fonts.family.content,
        fontWeight: theme.fonts.weight.medium,
        [theme.breakpoints.down('xs')]: {
            fontSize: "18px",
        },
    },
    span: {
        color: theme.palette.primary.light,
        fontWeight: theme.fonts.weight.medium,

    },
    pContent: {
        fontFamily: theme.fonts.family.content,
        fontSize: "24px",
        fontWeight: theme.fonts.weight.normal,
        [theme.breakpoints.down('xs')]: {
            fontSize: "14px",
        },

    },
    spanUnderline: {
        color: theme.palette.primary.light,
        textDecoration: "underline",
    },

}))

export default secondContentStyles;
