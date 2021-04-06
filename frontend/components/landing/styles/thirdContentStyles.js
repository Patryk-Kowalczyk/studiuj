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
        height: "100%",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    h1: {
        fontFamily: theme.fonts.family.content,
        fontWeight: theme.fonts.weight.medium,
        fontSize: "50px",
        marginBottom: "70px",
        marginTop: "40px",
    },
    span: {
        color: theme.palette.primary.light,
        fontWeight: theme.fonts.weight.medium,
    },
  
}))

export default thirdContentStyles;
