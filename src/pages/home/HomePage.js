import React from "react";
import PropTypes from "prop-types";

//Redux
import { connect } from "react-redux";

//MUI stuff
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Hidden from "@material-ui/core/Hidden";
import withStyles from "@material-ui/core/styles/withStyles";

//components
import Profile from "../../components/Profile";
import AccountsTable from "../../components/AccountsTable";
import AddAccountDialog from "../../components/forms/AddAccountDialog";
import MuiBackdrop from "../../components/ui/MuiBackdrop";

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

function HomePage({ classes, user, ui, history }) {
  const [addAccountDialogOpen, setAddAccountDialogOpen] = React.useState(false);

  const handleAccountDialogOpen = () => {
    setAddAccountDialogOpen(true);
  };

  const handleAccountDialogClose = () => {
    setAddAccountDialogOpen(false);
  };

  const addButton = (
    <Button
      className={classes.addAcountButton}
      size="small"
      onClick={handleAccountDialogOpen}
      disableRipple
    >
      Add New Account
    </Button>
  );
  return (
    <Grid container spacing={2}>
      {user.loading || ui.loading ? (
        <MuiBackdrop open={ui.loading || user.loading} />
      ) : (
        <>
          <Hidden xsDown className={classes.hiddenBar} implementation="css">
            <Toolbar className={classes.secondaryBar}>{addButton}</Toolbar>
          </Hidden>

          <Grid className={classes.item} item lg={4} md={5} sm={6} xs={12}>
            <Profile user={user} />
          </Grid>
          <Grid className={classes.item} item lg={8} md={7} sm={6} xs={12}>
            <Hidden smUp className={classes.hiddenBar} implementation="css">
              <Toolbar className={classes.secondaryBar}>{addButton}</Toolbar>
            </Hidden>
            <AccountsTable accountsList={user.accounts} history={history} />
          </Grid>
        </>
      )}
      <AddAccountDialog
        open={addAccountDialogOpen}
        handleClose={handleAccountDialogClose}
      />
    </Grid>
  );
}

HomePage.propTypes = {
  user: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user,
  ui: state.ui
});

export default connect(mapStateToProps)(withStyles(styles)(HomePage));
