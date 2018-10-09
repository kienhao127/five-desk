import React from "react";
import PropTypes from "prop-types";
// @material-ui/core
import TextField from '@material-ui/core/TextField';
import withStyles from "@material-ui/core/styles/withStyles";

class Register extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            username: '',
        };
    }

    onUsernameChange = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    render() {
        return (
        <div>
            <TextField id="username" type="text" value={this.state.username} onChange={this.onUsernameChange} />
            <p>{this.state.username}</p>
        </div>
        );
    }
}

export default Register;
