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

import { connect } from "react-redux";
import image from "assets/img/sidebar-2.jpg";
import logo from "assets/img/logo.png";
import NewMailTicket from 'views/MailTicket/NewMailTicket';
import Profile from 'views/User/EditUser';
import ReplyMailTicket from './../../views/MailTicket/ReplyMailTicket';
//Socket
import io from 'socket.io-client';
const socket = io('https://fivedesk.herokuapp.com')

import { ToastContainer, ToastStore } from 'react-toasts';
import { loadUserFromToken } from "../../store/actions/user";

const switchRoutes = (
  <Switch>
    <Route exact path={'/agent/ticket/new'} component={NewMailTicket} />
    <Route exact path={'/agent/member/profile/:userID'} component={Profile} />
    <Route exact path={'/agent/ticket/:mailID'} component={ReplyMailTicket} />
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
    };
    this.resizeFunction = this.resizeFunction.bind(this);

    socket.on('incomingMail', this.onReceiveMessage);
  }

  onReceiveMessage = () => {
    console.log('socket incoming mail');
    ToastStore.success('Có mail mới!');
  }


  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  resizeFunction() {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  }

  componentDidMount() {
    this.props.loadUserFromToken()
      .then((resJson) => {
        console.log('resJson token');
        console.log(resJson);
        if (resJson.returnCode == 0) {
          this.props.history.push('/')
        } else {
          currentUser
        }
      })
      .catch((error) => {
        console.log(error);
      });
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
        <ToastContainer position={ToastContainer.POSITION.BOTTOM_LEFT} store={ToastStore} />
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


const mapStateToProps = state => {
  return {
      userProfile: state.user.profile,
  };
};

const mapDispatchToProps = dispatch => {
  return {
      loadUserFromToken: () => dispatch(loadUserFromToken()),
  };
};

export default withStyles(dashboardStyle)(connect(mapStateToProps, mapDispatchToProps)(Agent));
