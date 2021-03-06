import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";

//redux
import { connect } from "react-redux";
import { logoutUser } from "../../redux/actions/userActions";

//components
import AddAccountDialog from "../forms/AddAccountDialog";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("md")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    }
  },
  appBarUnauthenticated: {
    width: "100%",
    marginLeft: 0
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  //-----------------------------------
  drawerHeader: {
    padding: 10,
    textAlign: "center",
    whiteSpace: "nowrap",
    width: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    "& h3, h4": {
      marginBlockStart: 0,
      marginBlockEnd: 0
    },
    position: "sticky",
    top: 0,
    backgroundColor: "#fff"
  },

  nested: {
    paddingLeft: theme.spacing(4)
  },
  logoutIcon: {
    marginLeft: "auto"
  }
}));

function Navbar(props) {
  const { window, authenticated, credentials, logoutUser } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [addAccountDialogOpen, setAddAccountDialogOpen] = React.useState(false);

  const handleAccountDialogOpen = () => {
    setAddAccountDialogOpen(true);
  };

  const handleAccountDialogClose = () => {
    setAddAccountDialogOpen(false);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <AppBar className={clsx(classes.toolbar, classes.drawerHeader)}>
        <h3>{credentials.name}</h3>
        <h4>{credentials.email}</h4>
      </AppBar>
      <Divider />

      <List subheader={<ListSubheader component="div">Account</ListSubheader>}>
        <ListItem className={classes.nested} button>
          <ListItemText primary={"Home"} />
        </ListItem>
        <ListItem
          className={classes.nested}
          button
          onClick={handleAccountDialogOpen}
        >
          <ListItemText primary={"Add Account"} />
        </ListItem>
      </List>
      <Divider />
      <List
        subheader={<ListSubheader component="div">Transactions</ListSubheader>}
      >
        <ListItem className={classes.nested} button>
          <ListItemText primary={"Credit-Received"} />
        </ListItem>
        <ListItem className={classes.nested} button>
          <ListItemText primary={"Debit-Paid"} />
        </ListItem>
        <ListItem className={classes.nested} button>
          <ListItemText primary={"Credit-Debit (Multiple)"} />
        </ListItem>
        <ListItem className={classes.nested} button>
          <ListItemText primary={"Inter-account Transaction"} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button>
          <ListItemText primary={"Account Ledger"} />
        </ListItem>
        <ListItem button>
          <ListItemText primary={"Transaction Report"} />
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={
          authenticated ? classes.appBar : classes.appBarUnauthenticated
        }
      >
        <Toolbar>
          {authenticated && (
            <>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap>
                {credentials.companyName}
              </Typography>
              <Tooltip title="Logout">
                <IconButton
                  color="inherit"
                  aria-label="log out"
                  edge="end"
                  className={classes.logoutIcon}
                  onClick={logoutUser}
                >
                  <ExitToAppIcon />
                </IconButton>
              </Tooltip>
            </>
          )}
        </Toolbar>
      </AppBar>
      {authenticated && (
        <nav className={classes.drawer} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden mdUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper
              }}
              ModalProps={{
                keepMounted: true // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden smDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
      )}

      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
      <AddAccountDialog
        open={addAccountDialogOpen}
        handleClose={handleAccountDialogClose}
      />
    </div>
  );
}

Navbar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
  credentials: PropTypes.object,
  authenticated: PropTypes.bool.isRequired,
  logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  credentials: state.user.credentials,
  authenticated: state.user.authenticated
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
