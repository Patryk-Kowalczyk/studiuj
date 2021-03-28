import React from "react";
import PropTypes from "prop-types";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../src/theme";
import Head from "next/head";
import { Provider } from "react-redux";
import { useStore } from "../src/store";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apolloClient";
import { useSelector } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import EmptyLayout from "../layouts/EmptyLayout";

function Message() {
  const message = useSelector((state) => state.message);

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (message.message) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [message]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      message={message ? message.message : undefined}
      action={
        <React.Fragment>
          <IconButton aria-label="close" color="inherit" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </React.Fragment>
      }
    />
  );
}

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

  const apolloClient = useApollo(pageProps.initialApolloState);

  const Layout = Component.Layout || EmptyLayout;

  React.useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <ApolloProvider client={apolloClient}>
      <Provider store={store}>
        <Head>
          <title>Studiuj</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Message />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </Provider>
    </ApolloProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;
