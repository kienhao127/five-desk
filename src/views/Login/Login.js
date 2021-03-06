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
import {Button, Typography, Slide,DialogContentText,DialogContent, DialogActions, Dialog, DialogTitle} 
from "@material-ui/core";
import LoginImage from 'assets/img/login-image.png';
import { connect } from "react-redux";
import { login } from "../../store/actions/user";
const history = createBrowserHistory();

function Transition(props) {
    return <Slide direction="down" {...props} />;
}

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            openDialog: false,
            message: "",
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

    handleValidation = (email, password) => {
        if (email == "" || password == ""){
            this.setState({ openDialog: true, message: "Email hoặc password không được để trống" });
            return false;
        }

        if (email !== "") {
            let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (!filter.test(email)) {
                this.setState({openDialog: true, message: "Email không hợp lệ" });
                return false;
            }
        }
        return true;
    }

    handleClose = () => {
        this.setState({
            openDialog: false,
        });
    }

    onLoginClick = (email, password) => {
        if(this.handleValidation(email,password))
        this.props.doLogin(email, password).then((resJson) => {
            if (resJson.returnCode == 1){
                this.props.history.push('/agent/ticket')
            } else {
                this.setState({
                    message: 'Email hoặc mật khẩu không đúng',
                    openDialog: true,
                })
            }
        }).catch((error) => {
            console.log(error);
            this.setState({
                message: 'Email hoặc mật khẩu không đúng',
                openDialog: true,
            })
        });
    }

    onRegisterClick = () => {
        this.props.history.push('/register')
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.loginDiv}>
                <Dialog
                    open={this.state.openDialog}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">
                        {"Thông báo"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            {this.state.message}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">Xác nhận
                        </Button>
                    </DialogActions>
                </Dialog>

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
                                    <Button onClick={this.onRegisterClick} style={{ width: '45%', height: '25%', marginLeft: 10, marginTop: 15 }} className={classes.button}>
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
