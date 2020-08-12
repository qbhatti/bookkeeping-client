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

function AccountSummary(props) {
  const {
    account: {
      accountDetails: {
        name,
        email,
        accountNum,
        phoneNum,
        totalDebits,
        category,
        totalCredits
      }
    },

    classes
  } = props;
  const getTotalBalance = () => {
    let balance = totalCredits - totalDebits;
    return convertBalanceToString(balance);
  };

  let accountBalance = getTotalBalance();

  let accountSummaryMarkup = (
    <Paper className={classes.paper}>
      <Typography variant="h5" align="center">
        {name}
      </Typography>
      {email && (
        <Typography variant="body2" align="center">
          {email}
        </Typography>
      )}
      {phoneNum && (
        <Typography variant="body2" align="center">
          {phoneNum}
        </Typography>
      )}

      <Typography variant="body2" align="center">
        {category}
      </Typography>
      <Typography variant="body2" align="center">
        {accountNum}
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
              {totalCredits + " /-"}
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
              {totalDebits + " /-"}
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
                [classes.creditBalance]: accountBalance.endsWith("/- Cr"),
                [classes.debitBalance]: accountBalance.endsWith("/- Db")
              })}
            >
              {accountBalance}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );

  return accountSummaryMarkup;
}

AccountSummary.propTypes = {
  account: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AccountSummary);
