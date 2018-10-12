import React from "react";
import PropTypes from "prop-types";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";

class User extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
        
    };
  
  }

  componentDidMount(){
    document.title = "User"
  }

  render() {
    return (
      <div>
        <p>Người dùng</p>
      </div>
    );
  }
}

export default User;
