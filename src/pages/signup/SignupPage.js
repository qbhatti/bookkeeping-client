import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// custom hooks
import useInputState from "../../hooks/useInputState";

//redux
import { connect } from "react-redux";
import { signupUser } from "../../redux/actions/userActions";

//MUI stuff
import { withStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    textAlign: "center",
    margin: "auto",
    marginTop: "100px",
    boxSizing: "border-box"
  },
  pageTitle: {
    color: "#2b2a2a",
    marginBottom: "20px"
  },

  paper: {
    width: "100%",
    padding: "20px",
    boxSizing: "border-box"
  },
  submitButton: {
    margin: "15px 0px 15px 0px",
    position: "relative",
    "&:disabled": {
      cursor: "not-allowed"
    }
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
      height: 1
    },
    "&:after": {
      content: "attr(data-content)",
      position: "relative",
      display: "inline-block",

      padding: "0 .5em",
      lineHeight: "1.5em",
      // this is really the only tricky part, you need to specify the background color of the container element...
      color: "#818078",
      backgroundColor: "#fff"
    }
  },
  link: {
    textDecoration: "none"
  },
  LoginButton: {
    marginTop: "15px",
    textTransform: "none",
    boxSizing: "box-content"
  },
  customError: {
    color: "red",
    fontSize: "0.8rem"
  },
  progress: {
    position: "absolute"
  }
});

function SignupPage({ classes, signupUser, history, ui }) {
  // ******* INIT STATE ******
  const [name, handleNameChange] = useInputState("");
  const [email, handleEmailChange] = useInputState("");
  const [password, handlePasswordChange] = useInputState("");
  const [confirmPassword, handleConfirmPasswordChange] = useInputState("");
  const [username, handleUsernameChange] = useInputState("");
  const [companyName, handleCompanyNameChange] = useInputState("");
  const [location, handleLocationChange] = useInputState("");

  const [errors, setErrors] = useState({});
  // ****** END STATE *****

  useEffect(() => {
    if (ui.errors) {
      setErrors(ui.errors);
    }
  }, [ui.errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUserData = {
      name,
      email,
      password,
      confirmPassword,
      username,
      companyName,
      location
    };
    signupUser(newUserData, history);
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
              id="name"
              name="name"
              type="text"
              label="Full Name"
              margin="normal"
              helperText={errors.name}
              error={!!errors.name}
              value={name}
              onChange={handleNameChange}
              fullWidth
            ></TextField>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              margin="normal"
              helperText={errors.email}
              error={!!errors.email}
              value={email}
              onChange={handleEmailChange}
              fullWidth
            ></TextField>
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              margin="normal"
              helperText={errors.password}
              error={!!errors.password}
              value={password}
              onChange={handlePasswordChange}
              fullWidth
            ></TextField>
            <TextField
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              margin="normal"
              helperText={errors.confirmPassword}
              error={!!errors.confirmPassword}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              fullWidth
            ></TextField>
            <TextField
              id="username"
              name="username"
              type="text"
              label="Username"
              margin="normal"
              helperText={errors.username}
              error={!!errors.username}
              value={username}
              onChange={handleUsernameChange}
              fullWidth
            ></TextField>
            <TextField
              id="companyName"
              name="companyName"
              type="text"
              label="Company Name"
              margin="normal"
              helperText={errors.companyName}
              error={!!errors.companyName}
              value={companyName}
              onChange={handleCompanyNameChange}
              fullWidth
            ></TextField>
            <TextField
              id="location"
              name="location"
              type="text"
              label="Location"
              margin="normal"
              helperText={errors.location}
              error={!!errors.location}
              value={location}
              onChange={handleLocationChange}
              fullWidth
            ></TextField>
            {errors.general && (
              <Typography className={classes.customError} variant="body2">
                {errors.general}
              </Typography>
            )}

            <Button
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              className={classes.submitButton}
              disabled={ui.loading}
              fullWidth
            >
              {ui.loading && (
                <CircularProgress
                  className={classes.progress}
                  size={25}
                  color="secondary"
                />
              )}
              Signup
            </Button>
          </form>

          <hr className={classes.hrText} data-content="OR" />

          <Link to="/login" className={classes.link}>
            <Button
              className={classes.LoginButton}
              variant="outlined"
              color="primary"
              size="large"
              fullWidth
            >
              Login
            </Button>
          </Link>
        </Paper>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => ({
  ui: state.ui
});

const mapActionsToProps = { signupUser };

SignupPage.propTypes = {
  ui: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(SignupPage));
