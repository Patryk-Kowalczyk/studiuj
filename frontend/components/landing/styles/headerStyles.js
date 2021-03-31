import {makeStyles} from "@material-ui/core/styles";

export const headerStyles = makeStyles((theme) => ({
    headerBox: {
        width: "100%",
        padding: "10px",
    },
    boxMaxWidth: {
        display: "grid",
        gridTemplateColumns: "1fr auto",
        maxWidth: "1600px",
        margin: "0 auto",
    },
    logoBox: {
        display: "flex",
        flexDirection: "row",
        marginLeft: "25px",
        marginTop: "15px",
    },
    logo: {
        fontSize: "25px",
        marginRight: "5px",
    },
    logoText: {
        position: "relative",
        fontFamily: "Montserrat, sans-serif",
        fontSize: theme.fonts.sizes.logoText,
        fontWeight: "600",
        lineHeight: "24.5px",
        letterSpacing: "0.5px",
        cursor: "pointer",

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
    navigationHeader: {
        position: "relative",
        marginTop: "5px",
        marginRight: "7px",
        fontFamily: "Montserrat, sans-serif",
        fontSize: theme.fonts.sizes.navigationHeader,
        fontWeight: theme.fonts.weight.bold,
        textTransform: "lowercase",
        
        "&:nth-child(2)": {
            color: theme.palette.primary.dark,
        }
    }

}));

export default headerStyles;
