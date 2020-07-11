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

const styles = {
  item: {
    backgroundColor: "inherit",
    boxSizing: "border-box"
  },
  addAcountButton: {
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

function HomePage({ classes, user, history }) {
  const addAccountButton = (
    <Button className={classes.addAcountButton} size="small">
      Add New Account
    </Button>
  );
  return (
    <Grid container spacing={2}>
      {user.loading ? (
        <p>LOADING</p>
      ) : (
        <>
          <Hidden xsDown className={classes.hiddenBar} implementation="css">
            <Toolbar className={classes.secondaryBar}>
              {addAccountButton}
            </Toolbar>
          </Hidden>

          <Grid className={classes.item} item sm={4} xs={12}>
            <Profile user={user} />
          </Grid>
          <Grid className={classes.item} item sm={8} xs={12}>
            <Hidden smUp className={classes.hiddenBar} implementation="css">
              <Toolbar className={classes.secondaryBar}>
                {addAccountButton}
              </Toolbar>
            </Hidden>
            <AccountsTable accountsList={user.accounts} history={history} />
          </Grid>
        </>
      )}
    </Grid>
  );
}

HomePage.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(HomePage));
