import React from "react";
import PropTypes from "prop-types";

//Redux
import { connect } from "react-redux";

//MUI Stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import MuiLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import EditIcon from "@material-ui/icons/Edit";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";

//styles
import commonStyles from "../styles/commonStyles";

const styles = {
  ...commonStyles,
  paper: {
    padding: 20,
    position: "sticky",
    top: 80
  },
  summary: {
    marginTop: 10
  }
};

function Profile(props) {
  const {
    user: {
      authenticated,
      loading,
      credentials: {
        numDebitAccounts,
        numCreditAccounts,
        totalCredit,
        numOfAccounts,
        companyName,
        totalDebit,
        name,
        email
      }
    },
    classes
  } = props;

  const getTotalBalance = () => {
    let balance = totalCredit - totalDebit;

    if (balance < 0) {
      return balance + " /- Db";
    } else if (balance > 0) {
      return balance + " /- Cr";
    }
    return balance + " /-";
  };

  const getNumEqualAccounts = () => {
    return numOfAccounts - numCreditAccounts - numDebitAccounts;
  };

  let profileMarkup = loading ? (
    <p>LOADING</p>
  ) : (
    <Paper className={classes.paper}>
      <Typography variant="h5" align="center">
        {companyName}
      </Typography>
      <Typography variant="body2" className={classes.name} align="center">
        {name}
      </Typography>
      <Typography variant="body2" align="center">
        {email}
      </Typography>
      <hr className={classes.hrText} />
      <Grid container justify="center" spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6" align="center">
            Total Payments
          </Typography>
        </Grid>
        <Grid container spacing={8} justify="center">
          <Grid item xs={5}>
            <Typography variant="body2" align="right">
              Credits
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography variant="body2" align="left">
              {totalCredit + " /-"}
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={8} justify="center">
          <Grid item xs={5}>
            <Typography variant="body2" align="right">
              Debits
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography variant="body2" align="left">
              {totalDebit + " /-"}
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={8} justify="center">
          <Grid item xs={5}>
            <Typography variant="body2" align="right">
              Balance
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography variant="body2" align="left">
              {getTotalBalance()}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <hr className={classes.invisibleSeparator} />

      <Grid container justify="center" spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6" className={classes.summary} align="center">
            Accounts Summary
          </Typography>
        </Grid>

        <Grid container spacing={8} justify="center">
          <Grid item xs={6}>
            <Typography variant="body2" align="right">
              Total Accounts
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" align="left">
              {numOfAccounts}
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={8} justify="center">
          <Grid item xs={6}>
            <Typography variant="body2" align="right">
              Credit Accounts
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" align="left">
              {numCreditAccounts}
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={8} justify="center">
          <Grid item xs={6}>
            <Typography variant="body2" align="right">
              Debit Accounts
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" align="left">
              {numDebitAccounts}
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={8} justify="center">
          <Grid item xs={6}>
            <Typography variant="body2" align="right">
              Equal Accounts
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" align="left">
              {getNumEqualAccounts()}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
  return <>{profileMarkup}</>;
}

Profile.propTypes = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(Profile));
