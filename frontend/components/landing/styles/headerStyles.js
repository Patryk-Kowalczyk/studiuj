import {makeStyles} from "@material-ui/core/styles";

export const headerStyles = makeStyles((theme) => ({
    headerBox: {
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        padding: "10px",
        minHeight: "50px",
        zIndex: "999",
        backgroundColor: "white",
        [theme.breakpoints.down('md')]: {
            ['@media (max-height:400px)']: {
                height: "50px"
            },
        },
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
        [theme.breakpoints.down('md')]: {
            ['@media (max-height:400px)']: {
                marginLeft: "10px",
                marginTop: "2px",
            },
        },
        [theme.breakpoints.down('xs')]: {
            marginLeft: "10px",
            marginTop: "10px",
        }

    },
    logo: {
        fontSize: "25px",
        marginRight: "5px",
        [theme.breakpoints.down('md')]: {
            ['@media (max-height:400px)']: {
                fontSize: "20px",
            },
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: "20px",
        },
    },
    logoText: {
        position: "relative",
        fontFamily: theme.fonts.family.navigation,
        fontSize: theme.fonts.sizes.logoText,
        fontWeight: theme.fonts.weight.bold,
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
            transition: "0.3s",
            [theme.breakpoints.down('md')]: {
                ['@media (max-height:400px)']: {
                    left: "3px",
                    bottom: "5px",
                },
            },
            [theme.breakpoints.down('xs')]: {
                left: "3px",
                bottom: "5px",
            }

        },
        "&:hover": {
            "&::after": {
                width: "90%",
            }
        },
        [theme.breakpoints.down('md')]: {
            ['@media (max-height:400px)']: {
                fontSize: theme.fonts.sizes.logoTextMobile,
                lineHeight: "21.5px",
            },
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: theme.fonts.sizes.logoTextMobile,
            lineHeight: "21.5px",
        },

    },
    span: {
        fontSize: "27px",
        [theme.breakpoints.down('md')]: {
            ['@media (max-height:400px)']: {
                fontSize: "22px",
            },
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: "22px",
        },
    },
    navigationHeader: {
        position: "relative",
        marginTop: "5px",
        marginRight: "7px",
        fontFamily: theme.fonts.family.navigation,
        fontSize: theme.fonts.sizes.navigationHeader,
        fontWeight: theme.fonts.weight.bold,
        textTransform: "lowercase",
        [theme.breakpoints.down('md')]: {
            ['@media (max-height:400px)']: {
                fontSize: theme.fonts.sizes.navigationHeaderMobile,
                marginTop: "2px",
            },
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: theme.fonts.sizes.navigationHeaderMobile,
            marginTop: "7px",
        },
        "&:nth-child(2)": {
            color: theme.palette.primary.dark,
        }

    }

}));

export default headerStyles;
