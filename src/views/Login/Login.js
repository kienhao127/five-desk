import React from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom'
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import { createBrowserHistory } from 'history';

import Button from '@material-ui/core/Button'

const history = createBrowserHistory();

class Login extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            
        };
    }

    render() {
        return (
        <div>
             <Button component={Link} to="/agent">Đăng nhập</Button>
        </div>
        );
    }
}

export default Login;
