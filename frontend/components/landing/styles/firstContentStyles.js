import {makeStyles} from "@material-ui/core/styles";

export const firstContentStyles = makeStyles((theme) => ({
    leftSideBox: {
        backgroundColor: "#FBFBFB",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",

    },

    rightSideBox: {
        backgroundColor: "#FBFBFB",
    },
    image: {
        position: "absolute",
        right: "0",
        top: "0",
        transform: "translate(20%,-25%) rotate(-5deg)",
        zIndex: "999",
        height: "40vh",

    },
    circle: {
        width: "80vh",
        height: "80vh",
        background: theme.palette.primary.light,
        borderRadius: "50%",
        transform: "translate(-30%,30%)"

    },
    sizes: {
        flexBasis: "200px",
    }
}));
