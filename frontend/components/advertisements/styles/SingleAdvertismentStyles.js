import {makeStyles} from "@material-ui/core/styles";
import {grey} from "@material-ui/core/colors";

export const useStyles = makeStyles((theme) => ({
    rootroot: {
        height: "90vh",
        overflow: "hidden",
    },
    root: {
        gridTemplateRows: "1fr auto",
        height: "10%",


    },
    inputContainer: {
        backgroundColor: grey[300],
        borderRadius: theme.spacing(2),
    },
    input: {
        flexGrow: 1,

    },

    message: {
        borderRadius: theme.spacing(2),
        backgroundColor: grey[200],

    },
    authUserMessage: {
        alignSelf: "flex-end",
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.white.main,
    },
    boxx: {
        height: "90%",
        overflow: "auto",
    }
}));
