import {makeStyles} from "@material-ui/core/styles";

const backgroundIcons = makeStyles((theme) => ({
    // Icons
    plane: {
        position: "absolute",
        fontSize: "70px",
        opacity: "0.08",
        bottom: "55%",
        left: "35%",
        zIndex: "1",
    },
    book: {
        position: "absolute",
        fontSize: "70px",
        opacity: "0.08",
        top: "25%",
        left: "10%",
        zIndex: "1",
    },
    ruler: {
        position: "absolute",
        fontSize: "70px",
        opacity: "0.08",
        top: "30%",
        right: "20%",
        zIndex: "1",
    },
    scissors: {
        position: "absolute",
        fontSize: "70px",
        opacity: "0.08",
        bottom: "10%",
        transform: "rotate(20deg)",
        left: "50%",
        zIndex: "1",
    },
    compass: {
        position: "absolute",
        fontSize: "70px",
        opacity: "0.08",
        top: "50%",
        right: "10%",
        zIndex: "1",
    },
    pencil: {
        position: "absolute",
        fontSize: "70px",
        opacity: "0.08",
        bottom: "5%",
        right: "10%",
        zIndex: "1",
    },
}));


export default backgroundIcons;
