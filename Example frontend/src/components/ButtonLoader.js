import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function ButtonLoader(props) {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        disabled={props.loading}
        //   onClick={handleButtonClick}
        style={{ textTransform: "none" }}
        // className={classes.buttonSuccess} // Used when button function succeeds
        type={props.type}
      >
        {!props.loading && <span>{props.mainLabel}</span>}
        {props.loading && <span>{props.waitLabel}</span>}
      </Button>
      {props.loading && (
        <CircularProgress size={24} className={classes.buttonProgress} />
      )}
    </div>
  );
}
