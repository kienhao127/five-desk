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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import YouTube from 'react-youtube';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
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

  paper: {
    margin: 10,
  },

  button: {
    marginLeft: 10,
    marginRight: 10,
    textTransform: 'none',

  },

  menu_dropdown: {
    fontFamily: 'Roboto', 
    fontSize:14,
  },

  colorPrimary: {
    backgroundColor: '#B2DFDB',
  },
  barColorPrimary: {
    backgroundColor: '#00695C',
  },

});

class Header extends React.Component {
  state = {
    mobileOpen: false,
    videoOpen: false,
    openSolution: false,
    openProducts: false,
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  handlevideoOpen = () => {
    this.setState({videoOpen: true});
  };

  handlevideoClose = () => {
    this.setState({videoOpen: false});
  };

  handleSolution = () => {
    this.setState(state => ({openSolution: !state.openSolution}));
  };

  handleProducts = () => {
    this.setState(state => ({openProducts: !state.openProducts}));
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
    const opts = {
      playerVars: { 
        autoplay: 1
      }
    };
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
          <Link to="/login" style={{ textDecoration: 'none', color: 'black'}}>
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
          {/* Button Products */}
          <Button size="small" className={classes.button} color="inherit" 
           onMouseEnter={this.handleProducts} onMouseLeave={this.handleProducts}  
           style={{marginLeft: 20, }}>
           <b className={classes.bfont}>Products</b>
           </Button>
           <Popper open={this.state.openProducts} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list-grow"
                style={{ transformOrigin: placement === 'bottom' ? 'top' : 'bottom',
                         marginTop: 35,
                         width: 800,
                         height: 500,
                         marginLeft: -300,
                }}
                onMouseLeave={this.handleProducts}
                onMouseEnter={this.handleProducts}
              >
                <Paper className={classes.menu_dropdown}>
                    <Grid container spacing={24}>
                    <Grid item xs={12} sm={6}>
                    <Typography component="p" className={classes.menu_dropdown} style={{marginLeft:53}}>
                    <h3>
                      ALL-IN-ONE
                    </h3>
                    </Typography>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                    <Typography component="p" className={classes.menu_dropdown} style={{marginLeft:53}}>
                    <h3>
                      PRODUCTS
                    </h3>
                    </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                    <Button className={classes.button} variant="contained" style={{width:230}}>
                    <Typography component="p"  className={classes.menu_dropdown}>
                    <div style={{width:90, marginLeft:30}}>
                    <LinearProgress/>
                    <LinearProgress color="secondary" />
                    <LinearProgress
                    classes={{ colorPrimary: classes.colorPrimary, barColorPrimary: classes.barColorPrimary }}
                    />
                    </div>
                    <h3>
                    The Zendesk Suite
                    </h3>
                    <span style={{fontWeight: 100}}>
                    Everything you need to be everywhere your customers are, wrapped up in one pretty package.
                    </span>
                    </Typography>
                    </Button>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                    <MenuList>
                      <MenuItem style={{height:80}}>
                      <Typography>
                      <h3>Support</h3>
                      <span>Integrated customer support</span>
                      </Typography>
                      </MenuItem>
                      <MenuItem style={{height:80}}>
                      <Typography>
                      <h3>Chat</h3>
                      <span>Live chat and message</span>
                      </Typography>
                      </MenuItem>
                      <MenuItem style={{height:80}}>
                      <Typography>
                      <h3>Explore</h3>
                      <span>Analytics and reporting</span>
                      </Typography>
                      </MenuItem>                     
                    </MenuList>
                    </Grid>                   
                    </Grid>
                </Paper>
              </Grow>
            )}
          </Popper>

           {/* Button Demo */}
           <Button size="small" className={classes.button} color="inherit"  
           onClick= {this.handlevideoOpen}  style={{marginLeft: 20, }}>
           <b className={classes.bfont}>Demo</b>
           </Button>
           <Dialog 
            open={this.state.videoOpen}
            onClose={this.handlevideoClose}
            aria-labelledby="form-dialog-title"
            maxWidth="md"
           >
          <DialogActions>
          <YouTube videoId="GSiQpIe5q-4" opts={opts}/>
          </DialogActions>
           </Dialog>
           
           {/* Button Solution */}
           <Button size="small" className={classes.button} color="inherit" 
           onMouseEnter={this.handleSolution} onMouseLeave={this.handleSolution}  
           style={{marginLeft: 20, }}>
           <b className={classes.bfont}>Solutions</b>
           </Button>
           <Popper open={this.state.openSolution} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list-grow"
                style={{ transformOrigin: placement === 'bottom' ? 'top' : 'bottom',
                         marginTop: 25,
                         width: 800,
                         height: 200,
                         marginLeft: -300,
                }}
                onMouseLeave={this.handleSolution}
                onMouseEnter={this.handleSolution}
              >
                <Paper>
                    <Grid container spacing={6}>
                    <Grid item sm>
                    <Typography component="p" className={classes.menu_dropdown} style={{marginLeft:53}}>
                    <h2>
                      Solution
                    </h2>
                    </Typography>
                    </Grid>
                    </Grid>
                    <Grid container spacing={24}>
                    <Grid item sm>
                    <Button className={classes.button}>
                    <Typography component="p" className={classes.menu_dropdown}>
                    <h3>
                    Omnichanel Support
                    </h3>
                    Seemless customer service aross all changels
                    </Typography>
                    </Button>
                    </Grid>
                    <Grid item sm>
                    <Button className={classes.button}>
                    <Typography component="p"  className={classes.menu_dropdown}>
                    <h3>
                    Sacle with self-service
                    </h3>
                    Improved resolution rates, lower support costs, and happier customers
                    </Typography>
                    </Button>
                    </Grid>
                    <Grid item sm>
                    <Button className={classes.button}>
                    <Typography component="p"  className={classes.menu_dropdown}>
                    <h3>
                    Zendesk for Enterprise
                    </h3>
                    An agile solution to scale your support operations
                    </Typography>
                    </Button>
                    </Grid>
                    </Grid>

                </Paper>
              </Grow>
            )}
          </Popper>

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
