import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Hidden from "@material-ui/core/Hidden";
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import "./../../assets/fonts/fonts.css";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  topHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
    float: "right",
    margin: 5,
  },

  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
  top: {
    float: "right",
    margin: 5,
  },

  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 200,
  },
  button: {
    marginRight: 30,
  },
  bfont: {
    fontFamily: 'Roboto',
    fontWeight: 700,
    fontSize: 15,
  },
});



class Header extends React.Component {
  state = {
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const { classes, theme } = this.props;
    const drawer = (
      <div className={classes.root}>
      <List component="nav">
        <ListItem button>
          <b className={classes.bfont}>Products</b>
        </ListItem>
        <Divider/>
        <ListItem button>
          <b className={classes.bfont}>Demo</b>
        </ListItem>
        <Divider/>
        <ListItem button>
        <b className={classes.bfont}>Solution</b>
        </ListItem>
      </List>
    </div>
    );
    
    return (
      <div className={classes.root}>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
          {/* moblie */}
          {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper,
            }}
          >
          </Drawer>
          <div className={classes.top}>
          <Link to="/login" style={{ textDecoration: 'none', color: 'black' }}>
          <Button size="large" className={classes.button}>
          <b className={classes.bfont}>Login</b>
          </Button>
          </Link>
          <Link to="/register" style={{ textDecoration: 'none', color: 'black' }}>
          <Button size="large" className={classes.button}>
          <b className={classes.bfont}>Register</b>
          </Button>
          </Link>
          </div>
          <AppBar position="static">
          <Toolbar>
          <Link to="/Home" style={{textDecoration: 'none', color:'inherit'}}>
           <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
           <b>FiveDesk</b>
            </IconButton>
            </Link>
          <Typography variant="h6" color="inherit" className={classes.grow}>
           <Button size="small" className={classes.button} color="inherit">
           <b className={classes.bfont}>Products</b>
           </Button>
           <Button size="small" className={classes.button} color="inherit">
           <b className={classes.bfont}>Demo</b>
           </Button>
           <Button size="small" className={classes.button} color="inherit">
           <b className={classes.bfont}>Solutions</b>
           </Button>
          </Typography>
          </Toolbar>
        </AppBar>
        </Hidden>
        <div className={classes.topHide}>
          <Link to="/login" style={{ textDecoration: 'none', color: 'black' }}>
          <Button size="large" className={classes.button}>
          <b className={classes.bfont}>Login</b>
          </Button>
          </Link>
          <Link to="/register" style={{ textDecoration: 'none', color: 'black' }}>
          <Button size="large" className={classes.button}>
          <b className={classes.bfont}>Register</b>
          </Button>
          </Link>
          </div>
        <AppBar position="static">
        <Typography variant="h6" color="inherit" className={classes.grow}>
        <Link to="/Home" style={{textDecoration: 'none', color:'inherit'}}>
        <IconButton className={classes.navIconHide} color="inherit" aria-label="Menu">
        <b>FiveDesk</b>
        </IconButton>
        </Link>
        <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.navIconHide}
              style = {{float: 'right', marginTop: 4,}}
        >
        <MenuIcon/>
        </IconButton>
        </Typography>
        </AppBar>
        </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Header);
