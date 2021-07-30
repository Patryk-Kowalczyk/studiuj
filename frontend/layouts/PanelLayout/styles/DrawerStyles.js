import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    logo: {
        padding: theme.spacing(2),
    },
    itemButton: {
        color: theme.palette.lightFont.main,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    selected: {
        backgroundColor: theme.palette.primary.main,
        "&:hover": {
            backgroundColor: theme.palette.primary.dark,
        },
    },
    subitem: {
        position: "relative",
        "&::before": {
            content: "''",
            position: "absolute",
            display: "block",
            top: "50%",
            left: theme.spacing(2),
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: theme.palette.lightFont.main,
            transform: "translateY(-50%)",
        },
    },
    subitemActive: {
        position: "relative",
        "&::before": {
            backgroundColor: theme.palette.primary.main,
        },
    },
}));