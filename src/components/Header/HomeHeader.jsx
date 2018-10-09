import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from '@material-ui/core/Typography';
//import Hidden from "@material-ui/core/Hidden";
// @material-ui/icons
import Menu from "@material-ui/icons/Menu";
// core components
import Button from "components/CustomButtons/Button.jsx";
import Login from "../../views/Login/Login";
import { createBrowserHistory } from "history";
import headerStyle from "assets/jss/material-dashboard-react/components/headerStyle.jsx";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
//const hist = createBrowserHistory();

const styles = {
  root: {
    flexGrow: 1,
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
  top: {
    float: "right",
    margin: 5,
  },
  bfont: {
    fontFamily: 'Roboto',
    fontWeight: 700,
    fontSize: 15,
    
  },
};

class Header extends React.Component {
  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
      
      <div className={classes.top}>
        <Button size="large" className={classes.button}>
        <Link to="/login" style={{ textDecoration: 'none', color: 'black' }}><b className={classes.bfont}>Login</b></Link>
        </Button>
        <Button size="large" className={classes.button}>
        <Link to="/register" style={{ textDecoration: 'none', color: 'black' }}><b className={classes.bfont}>Register</b></Link>
        </Button>
      </div>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
          <Link to="/Home" style={{textDecoration: 'none', color:'inherit'}}><b>FiveDesk</b></Link>
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
          <Button size="small" className={classes.button} color="inherit">
          <b className={classes.bfont}>Products</b>
          </Button>
          <Button size="small" className={classes.button} color="inherit">
          <b className={classes.bfont}>Pricing</b>
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
    </div>
    );
  }
}

export default withStyles(styles)(Header);
