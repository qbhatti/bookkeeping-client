import React, { useEffect } from "react";
import PropTypes from "prop-types";

//Redux
import { connect } from "react-redux";
import { getAccountDetails } from "../../redux/actions/dataActions";

//MUI stuff
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import MuiBackdrop from "../../components/ui/MuiBackdrop";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Hidden from "@material-ui/core/Hidden";

//component
import AccountSummary from "../../components/AccountSummary";
import TransactionsTable from "../../components/TransactionsTable";
import AddTransactionDialog from "../../components/forms/AddTransactionDialog";

const styles = {
  item: {
    backgroundColor: "inherit",
    boxSizing: "border-box"
  },
  addButton: {
    opacity: 0.7,
    marginLeft: "auto"
  },
  secondaryBar: {
    minHeight: "20px",
    paddingLeft: "8px",
    paddingRight: "8px"
  },
  hiddenBar: {
    width: "100%"
  }
};

function AccountDetailsPage({ classes, getAccountDetails, data, ui, history }) {
  const [
    addTransactionDialogOpen,
    setAddTransactionDialogOpen
  ] = React.useState(false);
  useEffect(() => {
    getAccountDetails(history.location.state.accountId);
  }, []);

  const handleTransactionDialogOpen = () => {
    setAddTransactionDialogOpen(true);
  };

  const handleTransactionDialogClose = () => {
    setAddTransactionDialogOpen(false);
  };

  const addButton = (
    <Button
      className={classes.addButton}
      size="small"
      onClick={handleTransactionDialogOpen}
      disableRipple
    >
      Add Transaction
    </Button>
  );

  return (
    <Grid container spacing={2}>
      {Object.keys(data.account).length === 0 ? (
        <MuiBackdrop open={ui.loading || data.loading} />
      ) : (
        <>
          <Hidden xsDown className={classes.hiddenBar} implementation="css">
            <Toolbar className={classes.secondaryBar}>{addButton}</Toolbar>
          </Hidden>
          <Grid className={classes.item} item lg={4} md={5} sm={6} xs={12}>
            <AccountSummary account={data.account} />
          </Grid>
          <Grid className={classes.item} item lg={8} md={7} sm={6} xs={12}>
            <Hidden smUp className={classes.hiddenBar} implementation="css">
              <Toolbar className={classes.secondaryBar}>{addButton}</Toolbar>
            </Hidden>
            <TransactionsTable transactionsList={data.account.transactions} />
          </Grid>
        </>
      )}
      <AddTransactionDialog
        open={addTransactionDialogOpen}
        handleClose={handleTransactionDialogClose}
        history={history}
      />
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
