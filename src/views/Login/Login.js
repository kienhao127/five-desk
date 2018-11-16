import React from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
// @material-ui/core
import TextField from '@material-ui/core/TextField';
import { createBrowserHistory } from 'history';
import { loginApi } from "../../api/AppApi";
import GridContainer from "./../../components/Grid/GridContainer";
import GridItem from "./../../components/Grid/GridItem";
import { withStyles, createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";
import LoginImage from 'assets/img/login-image.png';
import { connect } from "react-redux";
import { login } from "../../store/actions/user";
const history = createBrowserHistory();

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
        };
    }

    onValueChange = (event) => {
        if (event.target.id == "txtUsername")
            this.setState({
                email: event.target.value
            })
        else if (event.target.id == "txtPassword")
            this.setState({
                password: event.target.value
            })
    }

    onLoginClick = (email, password) => {
        this.props.doLogin(email, password).then((resJson) => {
            this.props.history.push('/agent/ticket')
        }).catch((error) => {
            console.log(error);
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.loginDiv}>
                <GridContainer>
                    <GridItem xs={12} md={5} >
                        <div className={classes.infoDiv}>
                            <TextField
                                id="txtUsername"
                                label="Email"
                                type="text"
                                name='txtUsername'
                                className={classes.textField}
                                variant="outlined"
                                value={this.state.email}
                                onChange={this.onValueChange}
                            />
                            <TextField
                                id="txtPassword"
                                label="Password"
                                type="password"
                                name='txtPassword'
                                className={classes.textField}
                                variant="outlined"
                                value={this.state.password}
                                onChange={this.onValueChange}
                            />
                            <div className={classes.infoDiv}>
                                <MuiThemeProvider theme={theme}>
                                    <Button onClick={() => this.onLoginClick(this.state.email, this.state.password)} variant="contained" color='primary' style={{ width: '45%', height: '25%', marginTop: 15 }}>
                                        <Typography style={{ color: '#FFF', fontSize: 15, fontFamily: 'Roboto-Regular' }}>Đăng Nhập</Typography>
                                    </Button>
                                    <Button style={{ width: '45%', height: '25%', marginLeft: 10, marginTop: 15 }} className={classes.button}>
                                        <Typography style={{ color: '#00bcd4', fontSize: 15, fontFamily: 'Roboto-Regular' }}>Đăng Ký</Typography>
                                    </Button>
                                </MuiThemeProvider>
                            </div>
                        </div>
                    </GridItem>

                    <GridItem xs={12} md={7} >
                        <img src={LoginImage} style={{ width: '90%', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
                    </GridItem>
                </GridContainer>

            </div>

        );
    }
}

const styles = {
    loginDiv: {
        paddingLeft: "5%",
        paddingRight: "5%",
        width: '90%',
        display: 'flex',
        flexDirection: 'row',
        jusifyContent: 'center',
        alignItem: 'center',
    },
    infoDiv: {
        margin: "10px",
    },
    inline: {
        display: "inline",
    },
    h4: {
        marginRight: "20px",
    },
    textField: {
        marginTop: '15px',
        marginLeft: '10px',
        width: '98%'
    },
    button: {
        position: "relative",
        left: "10%",
    }
}

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#00bcd4',
        },
    },
});

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
        doLogin: (email, password) => dispatch(login(email, password))
    };
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Login));
