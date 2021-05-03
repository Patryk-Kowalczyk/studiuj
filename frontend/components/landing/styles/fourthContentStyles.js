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
        textAlign: "center",
        margin: "0 auto",


    },
    h1: {
        width: "100%",
        textAlign: "center",
        fontFamily: theme.fonts.family.content,
        fontWeight: theme.fonts.weight.medium,
        marginTop: "10px",
        marginBottom: "50px",
        fontSize: "clamp(20px,2.5vw,40px)",

    },
    span: {
        color: theme.palette.primary.light,
        fontWeight: theme.fonts.weight.medium,
    },
    p: {
        color: theme.palette.primary.light,
        marginTop: "40px",
        fontSize: "clamp(10px,2.5vw,16px)",
        fontStyle: "italic",
        fontWeight: theme.fonts.weight.medium,
    },
    margin: {
        width: "80%",
        height: "50px",
        borderBottom: "1px solid",
        margin: "0 auto",
        marginBottom: "30px",
        [theme.breakpoints.down('xs')]: {
            borderBottom: "none",
        },
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        [theme.breakpoints.down('xs')]: {
            gridTemplateColumns: "1fr 1fr",
        },
        margin: "0 auto",
    }

}))

export default fourthContentStyles;
