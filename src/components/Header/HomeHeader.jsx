import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import Hidden from "@material-ui/core/Hidden";
import IconButton from '@material-ui/core/IconButton';
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
    fontFamily: 'roboto-medium',
    color: 'black',
    fontSize: 26,
    display: 'inline-block',
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
          <div className={classes.root}>
            <Link to="/home">
              <img src={logo} alt="logo" width='55' height='45'/>
              <div className={classes.LogoTxt}>
              {logoText}
              </div>
            </Link>
            {this.props.location.pathname !== '/register' && this.props.location.pathname !== '/login' ? 
              <div className={classes.top}>
                <Link to="/login" style={{ textDecoration: 'none', color: 'black' }}>
                  <Button size="large" className={classes.Buttons}>Đăng nhập</Button>
                </Link>
                <Link to="/register" style={{ textDecoration: 'none', color: 'black' }}>
                  <Button size="large" className={classes.Buttons}>Đăng Ký</Button>
                </Link>
              </div>
              : null}
          </div>
        </Hidden>

        <div className={classes.navIconHide}>
          <Link to="/home">
            <img src={logo} alt="logo" width='55' height='45'/>
            <div className={classes.LogoTxt}>
            {logoText}
            </div>
          </Link>
          {this.props.location.pathname !== '/register' && this.props.location.pathname !== '/login' ? 
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
          </IconButton>: null}
        </div> 
      </div>
    );
  }
}
Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
