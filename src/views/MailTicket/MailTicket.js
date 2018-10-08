import React from "react";
import PropTypes from "prop-types";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";

class MailTicket extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
        
    };
  
  }

  componentDidMount(){
    document.title = "Mail Ticket"
  }


  render() {
    return (
      <div>
        <p>Mail ticket</p>
      </div>
    );
  }
}

export default MailTicket;
