import React from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
// @material-ui/core
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import withStyles from "@material-ui/core/styles/withStyles";
import { createBrowserHistory } from 'history';
import { loginApi } from "../../api/AppApi";

const history = createBrowserHistory();

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
        };
    }

    onValueChange = (event) => {
        if (event.target.id == "txtUsername")
            this.setState({
                username: event.target.value
            })
        else if (event.target.id == "txtPassword")
            this.setState({
                password: event.target.value
            })
    }

    onLoginClick = (username, password) => {
        let user = {
            email: username,
            pass: password,
        }
        loginApi(username, password).then(res => console.log(res))
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.loginDiv}>
                <div className={classes.infoDiv}>
                    <h4 className={classes.h4 + ' ' + classes.inline}>TÊN ĐĂNG NHẬP</h4>
                    <TextField className={classes.textField + ' ' + classes.inline} variant="outlined" id="txtUsername" value={this.state.username} onChange={this.onValueChange}></TextField>
                </div>
                <div className={classes.infoDiv}>
                    <h4 className={classes.h4 + ' ' + classes.inline}>MẬT KHẨU</h4>
                    <TextField className={classes.textField + ' ' + classes.inline + ' ' + classes.passwordField} variant="outlined" id="txtPassword" value={this.state.password} onChange={this.onValueChange}></TextField>
                </div>
                {/*<Button variant="outlined" component={Link} to="/agent">go to agent</Button>}*/}
                <div className={classes.infoDiv}>
                    <Button onClick={() => this.onLoginClick(this.state.username, this.state.password)} className={classes.button} variant="outlined">Đăng Nhập</Button>
                </div>
            </div>
        );
    }
}

const styles = {
    loginDiv: {
        paddingLeft: "40%",
        paddingRight: "30%",
    },
    infoDiv: {
        marginBottom: "10px",
    },
    inline: {
        display: "inline",
    },
    h4: {
        marginRight: "20px",
    },
    textField: {
        position: "relative",
        bottom: "20px",
    },
    passwordField: {
        left: "45px",
    },
    button: {
        position: "relative",
        left: "10%",
    }
}

export default withStyles(styles)(Login);
