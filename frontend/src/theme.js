import {createMuiTheme} from "@material-ui/core/styles";
import {red, blueGrey} from "@material-ui/core/colors";

// Create a theme instance.
const theme = createMuiTheme(
    {
        overrides: {
            MuiStepper: {
                alternativeLabel: {
                    backgroundColor: "#F8EFE0",
                },
            },
            MuiStepLabel: {
                iconContainer: {
                    fontSize: "40px",
                },
                label: {
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "20px",
                }
            },
            MuiStepConnector: {
                alternativeLabel: {
                    top: "19px",
                    left: "calc(-50% + 30px)",
                    right: "calc(50% + 30px)",
                },
                lineHorizontal: {
                    borderTopWidth: "2px"
                }
            },
            MuiStepIcon: {
                root: {
                    fontSize: "40px",
                },
                active: {
                    color: "rgb(119,137,222) !important",
                }
            }
        },
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
