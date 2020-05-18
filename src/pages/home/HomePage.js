import React from "react";
import PropTypes from "prop-types";

//Redux
import { connect } from "react-redux";

//MUI stuff
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";

//components
import Profile from "../../components/Profile";
import AccountsTable from "../../components/AccountsTable";

const styles = {};

function HomePage({ classes, user, history }) {
  return (
    <Grid container spacing={2}>
      {user.loading ? (
        <p>LOADING</p>
      ) : (
        <>
          <Grid className={classes.item} item sm={4} xs={12}>
            <Profile user={user} />
          </Grid>
          <Grid className={classes.item} item sm={8} xs={12}>
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
