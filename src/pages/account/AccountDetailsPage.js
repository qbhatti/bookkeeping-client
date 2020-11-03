import React, { useEffect } from "react";
import PropTypes from "prop-types";

//Redux
import { connect } from "react-redux";
import { getAccountDetails } from "../../redux/actions/dataActions";

//MUI stuff
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import MuiBackdrop from "../../components/ui/MuiBackdrop";

//component
import AccountSummary from "../../components/AccountSummary";
import TransactionsTable from "../../components/TransactionsTable";

const styles = {
  item: {
    backgroundColor: "inherit",
    boxSizing: "border-box"
  }
};

function AccountDetailsPage({ classes, getAccountDetails, data, ui, history }) {
  useEffect(() => {
    getAccountDetails(history.location.state.accountId);
  }, []);

  return (
    <Grid container spacing={2}>
      {Object.keys(data.account).length === 0 ? (
        <MuiBackdrop open={ui.loading || data.loading} />
      ) : (
        <>
          <Grid className={classes.item} item lg={4} md={5} sm={6} xs={12}>
            <AccountSummary account={data.account} />
          </Grid>
          <Grid className={classes.item} item lg={8} md={7} sm={6} xs={12}>
            <TransactionsTable transactionsList={data.account.transactions} />
          </Grid>
        </>
      )}
    </Grid>
  );
}

AccountDetailsPage.propTypes = {
  data: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  data: state.data,
  ui: state.ui
});

const mapActionsToState = {
  getAccountDetails
};

export default connect(
  mapStateToProps,
  mapActionsToState
)(withStyles(styles)(AccountDetailsPage));
