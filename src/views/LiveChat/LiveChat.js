import React from "react";
import PropTypes from "prop-types";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";

class LiveChat extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
        
    };
  }

  componentDidMount(){
    document.title = "Live Chat"
  }

  render() {
    return (
      <div>
        <p>Live chat</p>
      </div>
    );
  }
}

export default LiveChat;
