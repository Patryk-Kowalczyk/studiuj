import {makeStyles} from "@material-ui/core/styles";

export const containerStyles = makeStyles((theme) => ({
    root: {
        height: "100vh",
        overflow: "hidden",
    },
    firstContent: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        backgroundColor: "aqua",
        height: "100%",
    },

}));
