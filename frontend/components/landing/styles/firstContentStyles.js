import {makeStyles} from "@material-ui/core/styles";

export const firstContentStyles = makeStyles((theme) => ({
        bgc: {
            backgroundColor: "#FBFBFB",
        },
        maxWidth_Grid: {
            position: "relative",
            maxWidth: "1800px",
            height: "100vh",
            margin: "0 auto",
            overflow: "hidden",
            display: "grid",
            gridTemplateColumns: "250px 1fr",
            gridTemplateAreas: "'left right'",
            [theme.breakpoints.down('md')]: {
                gridTemplateColumns: "1fr",
                gridTemplateRows: "auto ",
                gridTemplateAreas: `"right" "left"`,
            },
        },

        // ----------------------------- leftSideBox
        leftSide: {
            gridArea: "left",
        },
        image: {
            position: "absolute",
            right: "0",
            top: "0",
            transform: "translate(20%,-25%) rotate(-5deg)",
            zIndex: "999",
            height: "40vh",
            maxHeight: "600px",
        },
        circle: {
            width: "100vh",
            height: "100vh",
            maxWidth: "800px",
            maxHeight: "800px",
            background: theme.palette.primary.light,
            borderRadius: "50%",
            transform: "translate(-40%,40%)",
        },

        // ----------------------------- rightSideBox

        rightSide: {
            gridArea: "right",
            zIndex: "2",
        },


        rightContent: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "70%",
        },
        h1: {
            fontFamily: "Caveat, cursive",
            fontSize: "35px",
            width: "100vw",
            fontWeight: "900",
           
        },

        contentArea: {
            fontFamily: "Montserrat, sans-serif",
            fontSize: "25px",
            maxWidth: "50vw",
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
