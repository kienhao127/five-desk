import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton';
import Hidden from "@material-ui/core/Hidden";
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
const drawerWidth = 240;

const styles = theme => ({
  navIconHide: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },

  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      position: 'relative',
    },
  },

  grow: {
    flexGrow: 1,
  },
  
  root: {
    fontFamily: 'Roboto',
    color: '#00acc1',
    marginLeft: 40,
	marginTop: 10,
  },
  LogoTxt: {
    color: 'black',
    fontSize: 26,
    display: 'inline-block',
    marginLeft: -10,
    fontWeight: 700,
  },
  
  top: {
    fontFamily: 'Roboto',
    float: 'right',
    marginRight: 50,
  },

  Buttons: {
    textTransform: 'inherit',
    marginRight: 10,
    marginTop: 13,
    fontWeight: 500,
    fontSize: 20,
    color: '#00acc1',
  },

  Links: {
    textDecoration: 'none',
    color: '#00acc1',
    fontWeight: 500,
    fontSize: 20,
  }

});


class Header extends React.Component {
  state = {
    mobileOpen: false,
    open: false,
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };
  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    this.setState({ open: false });
  };

  render() {
    const { classes, logo, logoText } = this.props;
    const drawer = (
      <Popper open={this.state.open} anchorEl={this.anchorEl} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list-grow"
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={this.handleClose}>
                    <MenuList>
                    <Link to="/login" style={{ textDecoration: 'none'}}>
                      <MenuItem onClick={this.handleClose} className={classes.Links}>Đăng nhập</MenuItem></Link>
                    <Link to="/register" style={{ textDecoration: 'none'}}>
                      <MenuItem onClick={this.handleClose} className={classes.Links}>Đăng Ký</MenuItem></Link>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
    );
    
    return (
      <div className={classes.root}>
        <Hidden smUp>
        {drawer}
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper,
            }}
          >
          </Drawer>
          <div className={classes.root}>
          <Link to="/Home">
          <img src={logo} alt="logo" width='55' height='45'/>
          <div className={classes.LogoTxt}>
          {logoText}
          </div>
          </Link>
          <div className={classes.top}>
          <Link to="/login" style={{ textDecoration: 'none', color: 'black' }}>
          <Button size="large" className={classes.Buttons}>Đăng nhập</Button>
          </Link>
          <Link to="/register" style={{ textDecoration: 'none', color: 'black' }}>
          <Button size="large" className={classes.Buttons}>Đăng Ký</Button>
          </Link>
          </div>
          </div>
        </Hidden>
        <div className={classes.navIconHide}>
          <Link to="/Home">
          <img src={logo} alt="logo" width='55' height='45'/>
          <div className={classes.LogoTxt}>
          {logoText}
          </div>
          </Link>
          <IconButton
              buttonRef={node => {
                this.anchorEl = node;
              }}
              aria-owns={this.state.open ? 'menu-list-grow' : null}
              aria-haspopup="true"
              onClick={this.handleToggle}
              className={classes.navIconHide}
              style={{float:'right', marginTop: 13} }
        >
        <MenuIcon/>
        </IconButton>
        </div>
        </div>
    );
  }
}
Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
