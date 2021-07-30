import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    root: {
        height: "100vh",
        overflow: "hidden",
    },
    imageSection: {
        backgroundColor: theme.palette.primary.light,
        backgroundRepeat: "no-repeat",
        clipPath: "circle(80.9% at 19% 57%)",
        position: "relative",
        [theme.breakpoints.down("md")]: {
            clipPath: "circle(80.9% at 6% 57%)",
        },
        [theme.breakpoints.down("sm")]: {
            clipPath: "circle(80.9% at 0% 57%)",
        },
    },
    image: {
        position: "absolute",
        width: "100%",
        height: "50%",
        left: "50%",
        top: "50%",
        transform: "translate(-50%,-35%)",
    },
    gridBox: {
        display: "flex",
        alignItems: "center",
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    link: {
        color: theme.palette.primary.main,
        cursor: "pointer",
        textDecoration: "none",
    },
}));