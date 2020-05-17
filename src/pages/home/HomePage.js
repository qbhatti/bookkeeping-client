import React from "react";

//components
import Profile from "../../components/Profile";

//MUI stuff
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {};

function HomePage({ classes }) {
  return (
    <Grid container spacing={2}>
      <Grid className={classes.item} item sm={4} xs={12}>
        <Profile />
      </Grid>
      <Grid className={classes.item} item sm={8} xs={12}>
        Transactions
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(HomePage);
