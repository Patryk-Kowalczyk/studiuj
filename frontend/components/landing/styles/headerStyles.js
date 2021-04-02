import {makeStyles} from "@material-ui/core/styles";

export const headerStyles = makeStyles((theme) => ({
    headerBox: {
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        padding: "10px",
        height: "60px",
        zIndex: "999",
        backgroundColor: "white",
        [theme.breakpoints.down('xs')]: {
            padding: "2px",

        }
    },
    boxMaxWidth: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        maxWidth: "1600px",
        margin: "0 auto",
        ['@media (max-width:320px)']: {
            flexDirection: "column",
        },

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
        ['@media (max-width:450px)']: {
            fontSize: "20px",
        },
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
        },
        ['@media (max-width:450px)']: {
            fontSize: theme.fonts.sizes.logoTextMobile,
            lineHeight: "19.5px",
        },


    },
    span: {
        fontSize: "27px",
        ['@media (max-width:450px)']: {
            fontSize: "22px",
        },

    },
    navigationHeader: {
        position: "relative",
        marginTop: "5px",
        marginRight: "7px",
        fontFamily: "Montserrat, sans-serif",
        fontSize: theme.fonts.sizes.navigationHeader,
        fontWeight: theme.fonts.weight.bold,
        textTransform: "lowercase",
        ['@media (max-width:450px)']: {
            fontSize: theme.fonts.sizes.navigationHeaderMobile,
            marginTop: "12px",

        },
        "&:nth-child(2)": {
            color: theme.palette.primary.dark,
        }

    }

}));

export default headerStyles;
