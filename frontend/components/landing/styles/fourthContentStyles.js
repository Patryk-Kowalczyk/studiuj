import {makeStyles} from "@material-ui/core/styles";

export const fourthContentStyles = makeStyles((theme) => ({
    bgc: {
        backgroundColor: theme.palette.background.fourthContent,
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
    h1: {
        width: "100%",
        textAlign: "center",
        fontFamily: theme.fonts.family.content,
        fontWeight: theme.fonts.weight.medium,
        fontSize: "40px",
        marginTop: "10px",
        marginBottom: "50px",
    },
    span: {
        color: theme.palette.primary.light,
        fontWeight: theme.fonts.weight.medium,
    },
    p: {
        color: theme.palette.primary.light,
        marginTop: "40px",
        fontSize: "16px",
        fontStyle: "italic",
        fontWeight: theme.fonts.weight.medium,
    },
    margin: {
        width: "100%",
        height: "80px",
    }

}))

export default fourthContentStyles;
