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
        // backgroundColor: "red",
        height: "100%",
        margin: "0 auto",
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-between",
    },


}))

export default fourthContentStyles;
