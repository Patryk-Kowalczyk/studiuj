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
        maxHeight: "420px",
    },
    content: {
        margin: "30px",
        padding: "50px",
        display: "flex",
        justifyContent: "space-around",
        borderBottom: "1px solid black",
    },
    text: {
        width: "50%",
    }

}))

export default secondContentStyles;
