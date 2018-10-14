/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Header from "components/Header/HomeHeader.jsx";
import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";

import LoginView from "./../../views/Login/Login";
import RegisterView from "./../../views/Register/Register";
import HomeView from "./../../views/Home/Home";
import logo from "assets/img/logo.png";
const switchRoutes = (
  <Switch>
     <Route path="/home" component={HomeView}/>
     <Route path="/register" component={RegisterView}/>
     <Route path="/login" component={LoginView}/>
     <Redirect from='/' to='/home' />
  </Switch>
);

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false
    };
    this.resizeFunction = this.resizeFunction.bind(this);
  }
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  getRoute() {
    return this.props.location.pathname !== "/maps";
  }
  resizeFunction() {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeFunction);
  }
  render() {
    const { classes, ...rest } = this.props;
    return (
      <div className={classes.wrapper}>
         <Header
            handleDrawerToggle={this.handleDrawerToggle}
            open={this.state.mobileOpen}
            logo={logo}
            logoText={"FiveDesk"}
            {...rest}
            
          />
          <div className={classes.content}>
              <div className={classes.container}>{switchRoutes}</div>
          </div>

          
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Home);