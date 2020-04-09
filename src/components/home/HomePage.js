import React from "react";
import { Link } from "react-router-dom";

//hooks
import useInputState from "../../hooks/useInputState";

//redux
import { connect } from "react-redux";
import { userInfo } from "../../redux/actions/userActions";

//MUI stuff
import { withStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    textAlign: "center",
    margin: "auto",
    marginTop: "100px",
    boxSizing: "border-box",
  },
  pageTitle: {
    color: "#2b2a2a",
    marginBottom: "20px",
  },

  paper: {
    width: "100%",
    padding: "20px",
    boxSizing: "border-box",
  },
  submitButton: {
    margin: "15px 0px 15px 0px",
  },

  hrText: {
    lineHeight: "1em",
    position: "relative",
    outline: 0,
    border: 0,
    color: "black",
    textAlign: "center",
    height: "1.5em",
    margin: "0px -20px 0px -20px",

    "&:before": {
      content: "''",
      background:
        "linear-gradient(to right, transparent,#616161, #818078, #616161, transparent)",
      position: "absolute",
      left: 0,
      top: "50%",
      width: "100%",
      height: 1,
    },
    "&:after": {
      content: "attr(data-content)",
      position: "relative",
      display: "inline-block",

      padding: "0 .5em",
      lineHeight: "1.5em",
      // this is really the only tricky part, you need to specify the background color of the container element...
      color: "#818078",
      backgroundColor: "#fff",
    },
  },
  link: {
    textDecoration: "none",
  },
  signupButton: {
    marginTop: "15px",
    textTransform: "none",
    boxSizing: "box-content",
  },
});

function HomePage({ classes, userInfo }) {
  const [emailState, handleEmailChange, handleEmailReset] = useInputState("");
  const [
    passwordState,
    handlePasswordChange,
    handlePasswordReset,
  ] = useInputState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(emailState, " - ", passwordState);
    userInfo(emailState, passwordState);
    handleEmailReset();
    handlePasswordReset();
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      className={classes.root}
    >
      <Grid item className={classes.item} lg={5} md={6} sm={9} xs={12}>
        <Paper className={classes.paper}>
          <Typography className={classes.pageTitle} variant="h4">
            ORM Accounting
          </Typography>
          <hr className={classes.hrText} />
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              margin="normal"
              value={emailState}
              onChange={handleEmailChange}
              fullWidth
              required
            ></TextField>
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              margin="normal"
              value={passwordState}
              onChange={handlePasswordChange}
              fullWidth
              required
            ></TextField>
            <Button
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              className={classes.submitButton}
              fullWidth
            >
              Login
            </Button>
          </form>

          <hr className={classes.hrText} data-content="OR" />

          <Link to="/signup" className={classes.link}>
            <Button
              className={classes.signupButton}
              variant="outlined"
              color="primary"
              size="large"
              fullWidth
            >
              Signup
            </Button>
          </Link>
        </Paper>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = { userInfo };

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(HomePage));
