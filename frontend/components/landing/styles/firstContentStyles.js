import {makeStyles} from "@material-ui/core/styles";

export const firstContentStyles = makeStyles((theme) => ({
        bgc: {
            backgroundColor: "#FBFBFB",
        },
        maxWidthBox: {
            position: "relative",
            maxWidth: "1800px",
            height: "100vh",
            margin: "0 auto",
            marginTop: "60px",
            overflow: "hidden",
            display: "flex",
            [theme.breakpoints.down('md')]: {
                flexDirection: "column",
            },
        },
        // ----------------------------- leftSideBox
        leftSide: {
            maxWidth: "800px",
            [theme.breakpoints.down('md')]: {
                order: "2",
            },
        },
        image: {
            position: "absolute",
            right: "0",
            top: "0",
            transform: "translate(20%,-25%) rotate(-5deg)",
            zIndex: "999",
            height: "40vh",
            maxHeight: "600px",
            [theme.breakpoints.down('xs')]: {
                maxHeight: "400px",

            },
        },
        circle: {
            width: "100vh",
            height: "100vh",
            maxWidth: "900px",
            maxHeight: "900px",
            background: theme.palette.primary.light,
            borderRadius: "50%",
            transform: "translate(-40%,60%)",
            [theme.breakpoints.down('md')]: {
                transform: "translate(-40%,20%)",
            },
            [theme.breakpoints.down('xs')]: {
                transform: "translate(-30%,28%)",
                maxWidth: "400px",
                maxHeight: "400px",
                ['@media (min-height:700px)']: {
                    transform: "translate(-20%,34%)",
                },
            },

        },

        // ----------------------------- rightSideBox
        rightSide: {
            zIndex: "2",
            display: "flex",
            flexDirection: "column",
        },
        h1: {
            marginLeft: "-600px",
            fontFamily: "Caveat, cursive",
            fontSize: "38px",
            fontWeight: "900",
            marginTop: "100px",

            [theme.breakpoints.down('md')]: {
                padding: "0 5px",
                margin: "25px 0 35px 0",

            },
            [theme.breakpoints.down('xs')]: {
                fontSize: "16px",
                margin: "5px 0 5px 0",
                ['@media (min-height:700px)']: {
                    fontSize: "18px",
                    margin: "10px 0 10px 0",
                },
            }
        },


        rightContent: {
            fontFamily: "Montserrat, sans-serif",
            fontSize: "40px",
            fontWeight: "600",
            maxWidth: "900px",
            borderLeft: "8px dotted",
            borderColor: theme.palette.primary.light,
            paddingLeft: "15px",
            marginTop: "23%",
            [theme.breakpoints.down('md')]: {
                fontSize: "30px",
                maxWidth: "100%",
                marginTop: "2%",
                borderLeft: "8px solid",
                borderColor: theme.palette.primary.light,


            },
            [theme.breakpoints.down('xs')]: {
                fontSize: "16px",
                maxWidth: "100%",
                ['@media (min-height:700px)']: {
                    fontSize: "18px",
                    marginTop: "5%",
                },
            },
        },
        p: {
            color: theme.palette.primary.light,
            fontSize: "20px",
            fontStyle: "italic",
            fontWeight: "500",
            [theme.breakpoints.down('xs')]: {
                fontSize: "13px",
                maxWidth: "100%",
                ['@media (min-height:700px)']: {
                    fontSize: "15px",
                    marginTop: "10%",
                },
            },
        },
        span: {
            color: theme.palette.primary.light,
            textDecoration: "underline",
        },

        divWeight: {
            fontWeight: "500",
            marginTop: "20px",
            [theme.breakpoints.down('xs')]: {
                marginTop: "10px",

            },
        },


        button: {
            display: "block",
            backgroundColor: theme.palette.primary.light,
            width: "350px",
            height: "67px",
            marginTop: "30px",
            border: "none",
            borderRadius: "50px",
            fontFamily: "Montserrat,sans-serif",
            fontWeight: "600",
            fontSize: "25px",
            textTransform: "lowercase",
            textDecoration: "none",
            color: "white",
            textAlign: "center",
            lineHeight: "67px",
            [theme.breakpoints.down('xs')]: {
                fontSize: "15px",
                height: "30px",
                lineHeight: "30px",
                ['@media (min-height:700px)']: {
                    fontSize: "18px",
                    height: "40px",
                    lineHeight: "40px",
                },
            },

        },

    }))
;

export default firstContentStyles;
