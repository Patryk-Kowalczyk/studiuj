import {makeStyles} from "@material-ui/core/styles";
import blueGrey from "@material-ui/core/colors/blueGrey";
import grey from "@material-ui/core/colors/grey";

export const drawerWidth = 280;

export const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    drawer: {
        [theme.breakpoints.up("sm")]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    logo: {
        padding: theme.spacing(2),
    },
    appBar: {
        backgroundColor: "white",
        [theme.breakpoints.up("sm")]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up("sm")]: {
            display: "none",
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: blueGrey[800],
        color: theme.palette.lightFont.main,
        padding: "0 1rem",
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        minHeight: "100vh",
        maxWidth: "100%",
        backgroundColor: grey[100],
        [theme.breakpoints.up("sm")]: {
            maxWidth: `calc(100% - ${drawerWidth}px)`,
        },
        [theme.breakpoints.down("sm")]: {
            padding: theme.spacing(3, 1),
        },
    },
    itemButton: {
        color: theme.palette.lightFont.main,
    },
    grow: {
        flexGrow: 1,
    },
    messagesContainer: {
        paper: {
            maxWidth: 500,
            minWidth: 400,
        },
    },
    messagesTitle: {
        margin: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    },
    messageItem: {
        margin: `${theme.spacing(1)}px ${theme.spacing(1)}px ${theme.spacing(1)}px`,
        borderRadius: theme.spacing(1),
        maxWidth: "100%",
        display: "flex",
        alignItems: "center",
    },
    messageTexts: {
        width: "100%",
        marginLeft: theme.spacing(1),
        display: "flex",
        flexDirection: "column",
    },
    messageName: {
        fontSize: ".9em",
        fontWeight: 400,
    },
    messageShort: {
        fontSize: ".7em",
        fontWeight: 300,
        color: grey[700],
        textOverflow: "hidden",
    },
    messagesExpandMore: {
        display: "flex",
        justifyContent: "center",
    },
    notificationIcon: {
        backgroundColor: theme.palette.primary.main,
    },
}));