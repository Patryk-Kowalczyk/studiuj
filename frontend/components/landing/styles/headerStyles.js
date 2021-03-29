import {makeStyles} from "@material-ui/core/styles";

export const headerStyles = makeStyles((theme) => ({
    headerBox: {
        borderBottom: "1px solid black",
        width: "100%",
        padding: "10px",

    },
    boxMaxWidth: {
        display: "grid",
        gridTemplateColumns: "1fr auto",
        maxWidth: "1200px",
        margin: "0 auto",
    },
    text: {
        color: "black",
    },
    logoBox: {
        display: "flex",
        flexDirection: "row",
        marginLeft: "25px",
        marginTop: "15px",

        '&$hover': {
            backgroundColor: "red",
        }
    },
    logo: {
        marginRight: "5px",
        fontSize: "18px",

    },
    logoText: {
        fontSize: "18px",
        lineHeight: "21.5px",
        fontFamily: "Montserrat, sans-serif",
        fontWeight: "600",
        letterSpacing: "0.5px",
        cursor: "pointer",
        position: "relative",

        "&::after": {
            content: "''",
            position: "absolute",
            left: "3px",
            bottom: "3px",
            width: "55%",
            height: "2px",
            background: theme.palette.primary.dark,
            transition: "0.3s"
        },
        "&:hover": {
            "&::after": {
                width: "90%",
            }
        }


    },
    colorS: {
        // color: theme.palette.primary.dark,
        fontWeight: "600",
        fontSize: "19px",
    },

}));
