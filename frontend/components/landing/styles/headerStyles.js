import {makeStyles} from "@material-ui/core/styles";

export const headerStyles = makeStyles((theme) => ({
    headerBox: {
        display: "grid",
        gridTemplateColumns: "1fr auto",
        backgroundColor: theme.palette.primary.main,
        width: "100%",
        padding: "20px",

    },
    text: {
        color: "white",
    },
    
}));
