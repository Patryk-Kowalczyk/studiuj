import {makeStyles} from "@material-ui/core/styles";

export const firstContentStyles = makeStyles((theme) => ({
    leftSideBox: {
        gridArea: "left",
        // backgroundColor: "#FBFBFB",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",

    },

    rightSideBox: {
        gridArea: "right",
        '@media (max-width: 1000px)': {
            height: "70vh",
        }
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
        transform: "translate(-30%,30%)",
        '@media (min-height: 1000px) and (min-width: 1000px)': {
            transform: "translate(-40%,50%)"
        },

        '@media (max-width: 1000px)': {
            transform: "translate(-55%,-10%)"
        },
        '@media (min-width: 1200px)': {
            transform: "translate(-35%,40%)"
        },
        '@media (max-width: 1000px) and (min-height: 1000px)': {
            transform: "translate(-45%,-20%)"
        },
        '@media (max-width: 550px) and (min-height: 1000px)': {
            transform: "translate(-70%,-12%)"
        },
        '@media (max-width: 550px) and (max-height: 1000px)': {
            transform: "translate(-65%,-20%)"
        },
    },

    boxMaxWidth: {
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
        width: "100vw",
        display: "block",
        height: "100%",
        marginTop: "7%",
        fontSize: "35px",
        fontWeight: "900",
        '@media (max-width: 1000px)': {
            fontSize: "20px",

        }
    }
}));
