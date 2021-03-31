import {makeStyles} from "@material-ui/core/styles";

export const firstContentStyles = makeStyles((theme) => ({
        leftSideBox: {
            gridArea: "left",
            // backgroundColor: "#FBFBFB",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            zIndex: "2",


        },

        rightSideBox: {
            gridArea: "right",
            '@media (max-width: 1000px)': {
                height: "70vh",
            },
            zIndex: "2",

            display: "flex",
            flexDirection: "column",
            // alignItems: "space-between",
            justifyContent: "space-evenly",

        },
        rightContent: {

            flexBasis: "60%",
            display: "flex",
            justifyContent: "flex-end",


        },
        contentArea: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "center",
            flexBasis: "80%",
            marginRight: "4%",
            marginTop: "1%",
            '@media (max-width: 600px)': {
                flexBasis: "100%",
            },
            fontFamily: "Montserrat, sans-serif",
            fontSize: "25px",
        },
        contentAreaText: {
            maxWidth: "900px",

            borderLeft: "3px solid",
            borderColor: theme.palette.primary.light,
            paddingLeft: "15px",
        },
        contentAreaTextP: {
            color: theme.palette.primary.light,
            fontSize: "20px",
            fontStyle: "italic",
            fontWeight: "500",
        },
        contentAreaTextSpan: {
            color: theme.palette.primary.light,
            fontSize: "40px",
            fontWeight: "600",
            textDecoration: "underline",
        },
        contentAreaTextDiv1: {
            fontSize: "40px",
            fontWeight: "600",
        },
        contentAreaTextDiv2: {
            fontSize: "40px",
            fontWeight: "500",
            marginTop: "20px",
        },

        image: {
            position: "absolute",
            right: "0",
            top: "0",
            transform: "translate(20%,-25%) rotate(-5deg)",
            zIndex: "999",
            height: "40vh",

        },
        circle: {
            width: "100vh",
            height: "100vh",
            background: theme.palette.primary.light,
            borderRadius: "50%",
            transform: "translate(-40%,40%)",
            '@media (min-height: 1000px) and (min-width: 1000px)': {
                transform: "translate(-40%,50%)"
            },

            '@media (max-width: 1000px)': {
                transform: "translate(-45%,-30%)"
            },
            '@media (max-width: 800px) and (max-height: 1000px)': {
                transform: "translate(-55%,-20%)"
            },
            '@media (min-width: 1050px)': {
                transform: "translate(-45%,40%)"
            },
            '@media (max-width: 1000px) and (min-height: 1000px)': {
                transform: "translate(-65%,-10%)"
            },
            '@media (max-width: 550px) and (min-height: 1000px)': {
                transform: "translate(-70%,-12%)"
            },
            '@media (max-width: 550px) and (max-height: 1000px)': {
                transform: "translate(-65%,-20%)"
            },
        },

        boxMaxWidth: {
            position: "relative",
            display: "grid",
            overflow: "hidden",
            gridTemplateColumns: "250px 1fr",
            gridTemplateAreas: "'left right'",
            gridTemplateRows: "auto 1fr",

            width: "100%",
            height: "100%",
            maxWidth: "1800px",
            margin: "0 auto",
            '@media (max-width: 1300px)': {
                gridTemplateColumns: "150px 1fr",

            },
            '@media (max-width: 1000px)': {
                gridTemplateColumns: "1fr",
                gridTemplateRows: "auto ",

                gridTemplateAreas: `
            "right"
            "left"
            `,
            }
        },
        headerBox: {
            width: "100%",
            height: "100vh",
            overflow: "hidden",
            backgroundColor: "#FBFBFB",
        },
        h1: {
            fontFamily: "Caveat, cursive",
            fontSize: "35px",
            width: "100vw",
            fontWeight: "900",
            '@media (max-width: 1000px)': {
                fontSize: "30px",

            },
            // marginBottom: "10%",
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

        },

    }))
;

export default firstContentStyles;
