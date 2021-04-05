import {createMuiTheme} from "@material-ui/core/styles";
import {red, blueGrey} from "@material-ui/core/colors";

// Create a theme instance.
const theme = createMuiTheme(
    {

        fonts: {
            sizes: {
                navigationHeader: "21px",
                navigationHeaderMobile: "12px",
                logoText: "25px",
                logoTextMobile: "20px",
            },
            weight: {
                normal: "400",
                medium: "500",
                bold: "600",
                semiBold: "700",
                maxBold: "900",
            },
            family: {
                navigation: "Montserrat, sans-serif",
                content: "Montserrat, sans-serif",
                h1FirstContent: "Caveat, cursive",


            }
        },


        palette: {
            primary: {
                main: "#556cd6",
            },
            secondary: {
                main: "#19857b",
            },
            error: {
                main: red.A400,
            },
            background: {
                default: "#fff",
                firstContent: "#FBFBFB",
                secondContent: "#F5F5F5",
                thirdContent: "#F8EFE0",
                fourthContent: "#FFFAF1",
                footer: "#FFFFFF",
            },
            lightFont: {
                main: blueGrey[50],
            },
            text: {
                primary: blueGrey[900],
            },
        },
    },
);

export default theme;
