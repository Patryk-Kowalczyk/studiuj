import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    position: "relative",
    //display: "inline-block",
  },
  buttonProgress: {
    color: theme.palette.primary.main,
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function LoadingButton({
  loading,
  progress,
  children,
  ...rest
}) {
  const classes = useStyles();
  const isLoading = loading || false;

  const Progress = () =>
    progress || (
      <CircularProgress size={24} className={classes.buttonProgress} />
    );

  return (
    <div className={classes.wrapper}>
      <Button disabled={isLoading} {...rest}>
        {children}
      </Button>
      {isLoading && <Progress className={classes.buttonProgress} />}
    </div>
  );
}

LoadingButton.propTypes = {
  loading: PropTypes.bool,
  progress: PropTypes.object,
};
