import React from "react";
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Hidden from "@material-ui/core/Hidden";
import Avatar from "@material-ui/core/Avatar";
import Badge from '@material-ui/core/Badge';
// @material-ui/icons
import Search from "@material-ui/icons/Search";
import Message from "@material-ui/icons/Message";
// core components
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";

import { connect } from "react-redux";
import headerLinksStyle from "assets/jss/material-dashboard-react/components/headerLinksStyle.jsx";
import { Link } from 'react-router-dom'

class HeaderLinks extends React.Component {
  state = {
    open: false
  };
  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;
    return (
      this.props.userProfile != null ?
      <div>
        <div className={classes.searchWrapper}>
          <CustomInput
            formControlProps={{
              className: classes.margin + " " + classes.search
            }}
            inputProps={{
              placeholder: "Search",
              inputProps: {
                "aria-label": "Search"
              }
            }}
          />
          <Button color="white" aria-label="edit" justIcon round 
          className={classes.searchButton}>
            <Search />
          </Button>
        </div>

        <Button 
          color={window.innerWidth > 959 ? "transparent" : 'white'}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          className={classes.buttonLink}
          round
          component={Link} to={"/agent/member/profile/" +  this.props.userProfile.UserID}
        >
          <Avatar className={classes.avatar}
              src="https://i.imgur.com/p9bwTYj.png"  />
          <Hidden mdUp implementation="css">
            <p onClick={this.handleClick} className={classes.linkText}>
              Trang cá nhân
            </p>
          </Hidden>
        </Button>
      </div> : ''
    );
  }
}

const mapStateToProps = state => {
  return {
      userProfile: state.user.profile,
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default withStyles(headerLinksStyle)(connect(mapStateToProps, mapDispatchToProps)(HeaderLinks));
