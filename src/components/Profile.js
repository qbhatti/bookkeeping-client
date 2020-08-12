import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";

//MUI Stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

//misc
import { convertBalanceToString } from "../helpers/helpers";

const styles = (theme) => ({
  paper: {
    padding: 20,
    position: "sticky"
  },
  summary: {
    marginTop: 10
  },
  ...theme.customClasses
});

function Profile(props) {
  const {
    user: {
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
    return convertBalanceToString(balance);
  };

  const getNumEqualAccounts = () => {
    return numOfAccounts - numCreditAccounts - numDebitAccounts;
  };

  let totalBalance = getTotalBalance();

  let profileMarkup = loading ? (
    <p>LOADING</p>
  ) : (
    <Paper className={classes.paper}>
      <Typography variant="h5" align="center">
        {companyName}
      </Typography>
      <Typography variant="body2" align="center">
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
              Credit
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
              Debit
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
            <Typography
              variant="body2"
              align="left"
              className={clsx({
                [classes.creditBalance]: totalBalance.endsWith("/- Cr"),
                [classes.debitBalance]: totalBalance.endsWith("/- Db")
              })}
            >
              {totalBalance}
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
              Total
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
              Credits
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
              Debits
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
              Equals
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
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Profile);
