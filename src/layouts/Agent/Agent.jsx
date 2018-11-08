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
import Header from "components/Header/AgentHeader.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";

import agentRoutes from "routes/agent.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";

import image from "assets/img/sidebar-2.jpg";
import logo from "assets/img/logo.png";
import NewMailTicket from 'views/MailTicket/NewMailTicket';
import Profile from 'views/User/EditUser';
//Socket
import io from 'socket.io-client';
const socket = io('http://localhost:4000')

const switchRoutes = (
  <Switch>
       <Route exact path={'/agent/ticket/new'} component={NewMailTicket} />
       <Route exact path={'/agent/member/profile'} component={Profile} />
      {agentRoutes.map((prop, key) => {
        if (prop.redirect)
          return <Redirect from={prop.path} to={prop.to} key={key} />;
        return <Route path={prop.path} component={prop.component} key={key} />;
      })}
  </Switch>
);

class Agent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
      newMessage: false,
    };
    this.resizeFunction = this.resizeFunction.bind(this);
    socket.on('unread message', (unreadMessageCount) => this.onReceiveMessage(unreadMessageCount));
  }
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  resizeFunction() {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  }

  onReceiveMessage = (message) => {
    console.log('Unread message count');
    console.log(message);
    this.setState({
      newMessage: message,
    })
  }

  componentDidMount() {
    document.title = "FiveDesk - Agent";

    if (navigator.platform.indexOf("Win") > -1) {
      const ps = new PerfectScrollbar(this.refs.mainPanel);
    }
    window.addEventListener("resize", this.resizeFunction);
  }
  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.refs.mainPanel.scrollTop = 0;
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false });
      }
    }
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeFunction);
  }
  render() {
    const { classes, ...rest } = this.props;
    return (
      <div className={classes.wrapper}>
        <Sidebar
          routes={agentRoutes}
          logoText={"FIVE DESK"}
          logo={logo}
          image={image}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color="blue"
          newMessage={this.state.newMessage}
          {...rest}
        />
        <div className={classes.mainPanel} ref="mainPanel">
          <Header
            routes={agentRoutes}
            handleDrawerToggle={this.handleDrawerToggle}
            {...rest}
          />
          <div className={classes.content}>
            <div className={classes.container}>{switchRoutes}</div>
          </div>
        </div>
      </div>
    );
  }
}

Agent.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Agent);
