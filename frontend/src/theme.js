import {createMuiTheme} from "@material-ui/core/styles";
import {red, blueGrey} from "@material-ui/core/colors";

// Create a theme instance.
const theme = createMuiTheme(
    {
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
