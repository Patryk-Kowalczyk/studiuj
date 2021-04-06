import {makeStyles} from "@material-ui/core/styles";

export const firstContentStyles = makeStyles((theme) => ({
        bgc: {},
        maxWidthBox: {
            backgroundColor: theme.palette.background.firstContent,
            position: "relative",
            maxWidth: "1800px",
            height: "100%", //jak cos to zmienic na vh
            maxHeight: "1000px",
            margin: "0 auto",
            overflow: "hidden",
            marginTop: "50px",
            display: "flex",
            [theme.breakpoints.down('md')]: {
                flexDirection: "column",
            },
        },

        // ----------------------------- leftSideBox
        leftSide: {
            maxWidth: "700px",
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
                ['@media (max-height:400px)']: {
                    transform: "translate(-50%,34%)",
                },
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
            marginLeft: "-500px",
            fontFamily: theme.fonts.family.h1FirstContent,
            fontSize: "38px",
            fontWeight: theme.fonts.weight.semiBold,
            marginTop: "50px",
            ['@media (min-height:800px)']: {
                marginLeft: "-600px",


            },
            [theme.breakpoints.down('md')]: {
                padding: "0 5px",
                margin: "25px 0 35px 0",
                ['@media (max-height:400px)']: {
                    fontSize: "16px",
                    margin: "15px 0 5px 0",

                },

            },
            [theme.breakpoints.down('xs')]: {
                fontSize: "16px",
                margin: "5px 0 5px 0",
                ['@media (min-height:700px)']: {
                    fontSize: "18px",
                    margin: "10px 0 10px 0",
                },

            },


        },
        rightContent: {
            fontFamily: theme.fonts.family.content,
            fontSize: "30px",
            fontWeight: theme.fonts.weight.bold,
            maxWidth: "800px",
            borderLeft: "8px dotted",
            borderColor: theme.palette.primary.light,
            paddingLeft: "15px",
            marginTop: "15%",
            ['@media (max-height:600px)']: {
                fontSize: "16px",
                marginLeft: "5%",
                marginTop: "5%",

                maxWidth: "1500px",
            },
            ['@media (max-height:800px)']: {
                fontSize: "25px",
                marginLeft: "0%",
                marginTop: "5",
                maxWidth: "1500px",
            },
            [theme.breakpoints.down('md')]: {
                fontSize: "30px",
                maxWidth: "100%",
                marginTop: "2%",
                borderLeft: "8px solid",
                borderColor: theme.palette.primary.light,
                ['@media (max-height:400px)']: {
                    fontSize: "16px",
                    marginLeft: "35%",
                    marginTop: "0%",
                },


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
            fontWeight: theme.fonts.weight.medium,
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
            fontWeight: theme.fonts.weight.medium,
            marginTop: "20px",
            [theme.breakpoints.down('xs')]: {
                marginTop: "10px",

            },
        },
        button: {
            display: "block",
            backgroundColor: theme.palette.primary.light,
            width: "350px",
            height: "60px",
            marginTop: "30px",
            border: "none",
            borderRadius: "50px",
            fontFamily: theme.fonts.family.content,
            fontWeight: theme.fonts.weight.bold,
            fontSize: "20px",
            textTransform: "lowercase",
            textDecoration: "none",
            color: "white",
            textAlign: "center",
            lineHeight: "60px",
            ['@media (max-height:800px)']: {
                fontSize: "16px",
                height: "40px",
                lineHeight: "40px",
                marginTop: "10px",
            },
            [theme.breakpoints.down('md')]: {
                ['@media (max-height:400px)']: {
                    fontSize: "16px",
                    height: "30px",
                    lineHeight: "30px",
                    marginTop: "10px",
                },
            },
            [theme.breakpoints.down('xs')]: {
                fontSize: "18px",
                height: "40px",
                lineHeight: "40px",
                marginTop: "20px",

                ['@media (min-height:700px)']: {
                    fontSize: "20px",
                    height: "50px",
                    lineHeight: "50px",
                    marginTop: "20px",

                },
            },
        },

        messageContainer: {
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: "9999",
            [theme.breakpoints.down('md')]: {

                ['@media (max-height:400px)']: {},

            },
            [theme.breakpoints.down('xs')]: {
                ['@media (min-height:700px)']: {},
            },


        },
        messageButton: {
            position: "relative",
            cursor: "pointer",
            padding: "5px",
            fontSize: "80px",
            opacity: "0.7",

            transition: ".4s",
            '&:hover': {
                fontSize: "110px",
                opacity: "1",
            },

        },
        socialMediaContainer: {
            position: "absolute",
            top: "20%",
            right: "2%",
            height: "200px",
            zIndex: "2",
            color: theme.palette.primary.light,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            [theme.breakpoints.down('md')]: {
                top: "10%",
                flexDirection: "column",
            },
            [theme.breakpoints.down('xs')]: {
                top: "5%",
                flexDirection: "row",
            },
        },
        hover: {
            fontSize: "45px",
            padding: "2px",
            transition: ".3s",
            cursor: "pointer",
            '&:hover': {
                color: "black",
                border: "2px solid black",
            },
            [theme.breakpoints.down('xs')]: {
                fontSize: "25px",
                marginRight: "10px",
            },
        }
    }))
;

export default firstContentStyles;
