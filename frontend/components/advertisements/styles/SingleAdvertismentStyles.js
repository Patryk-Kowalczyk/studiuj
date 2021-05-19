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
    rating: {
        width: 200,
        display: 'flex',
        alignItems: 'center',
    },
    inputContainer: {
        backgroundColor: grey[300],
        borderRadius: theme.spacing(2),
    },
    description: {textAlign: "left", fontSize: "14px", marginBottom: "20px", padding: "0"},
    created: {textAlign: "left", color: "gray"},
    input: {
        flexGrow: 1,

    },
    avatar: {
        backgroundColor: theme.palette.primary.dark,
        color: "white",
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
        height: "80%",
        overflow: "auto",
    },
    paper: {
        padding: "40px 20px",
    },
    h4: {
        margin: 0,
        textAlign: "left",
    },
    h3: {
        marginTop: "25px",
        fontSize: "18px",
    },
    typeOffer: {
        backgroundColor: theme.palette.primary.dark,
        color: "white",
        fontSize: "15px",
        textAlign: "center",
        padding: "2px 15px",
        position: "absolute",
        transform: " translateY(-60%) rotate(3deg)",
    },
    typeLooking: {
        backgroundColor: theme.palette.secondary.dark,
        color: "white",
        fontSize: "15px",
        textAlign: "center",
        padding: "2px 15px",
        position: "absolute",
        transform: " translateY(-60%) rotate(3deg)",
    },
}));
