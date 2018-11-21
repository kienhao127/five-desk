import React from "react";
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";
import classNames from "classnames";
import { register } from './../../store/actions/user';
import { connect } from "react-redux";
import GridContainer from "./../../components/Grid/GridContainer";
import GridItem from "./../../components/Grid/GridItem";
// @material-ui/core
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import ThemeButton from './../../components/ThemeButton/ThemeButton';
import { withStyles, createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";
import RegisterImage from 'assets/img/register-image.png';
import {Slide,DialogContentText,DialogContent, DialogActions, Dialog, DialogTitle} 
from "@material-ui/core";
function Transition(props) {
    return <Slide direction="down" {...props} />;
}

class Register extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            rePassword: '',
            email: "",
            lastName: "",
            firstName: "",
            phoneNumber: "",
            companyName: "",
            openDialog: false,
            message: "",
        };
    }

    onValueChange = (event) => {
        if (event.target.id == "txtEmail")
            this.setState({
                username: event.target.value
            })
        else if (event.target.id == "txtPassword")
            this.setState({
                password: event.target.value
            })
        else if (event.target.id == 'txtRePassword')
            this.setState({
                rePassword: event.target.value
            })
        else if (event.target.id == "txtLastName")
            this.setState({
                lastName: event.target.value
            })
        else if (event.target.id == "txtFirstName")
            this.setState({
                firstName: event.target.value
            })
        else if (event.target.id == "txtPhoneNumber")
            this.setState({
                phoneNumber: event.target.value
            })
        else if (event.target.id == "txtCompanyName")
            this.setState({
                companyName: event.target.value
            })
    }

    handleValidation = (email, password, rePassword, firstname, lastname, phone, company) => {
        if (email == "" || password == "" || firstname == "" ||
            lastname == "" || phone == "" || company == "") {
            this.setState({ openDialog: true, message: "Các trường không được để trống" });
            return false;
        }

        if (email !== "") {
            let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (!filter.test(email)) {
                this.setState({openDialog: true, message: "Email không hợp lệ" });
                return false;
            }
        }

        if (password != rePassword){
            this.setState({ openDialog: true, message: "Mật khẩu nhập lại không khớp" });
            return false;
        }
        return true;
    }

    onRegister = (email, password, rePassword, avatar, firstname, lastname, phone, company) => {
        console.log(email, password, rePassword, avatar, firstname, lastname, phone, company)
        if (this.handleValidation(email, password, rePassword, firstname, lastname, phone, company))
            this.props.doregister(email, password, avatar, firstname, lastname, phone, company)
                .then((resJson) => {
                    if (resJson.returnCode == "1") {
                        this.setState({ openDialog: true, message: "Đăng ký thành công" })
                        console.log(resJson);
                    }
                    else if (resJson.returnCode == "0")
                        this.setState({ openDialog: true, message: "Đăng ký thất bại" })
                }).catch((error) => {
                    console.log(error);
                });
    }

    handleClose = () => {
        this.setState({
            openDialog: false,
        });
    }
    render() {
        const { classes } = this.props;
        return (
            <div style={{ width: '50%', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}>
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
                <img src={RegisterImage} style={{ width: '75%', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
                <Typography style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', fontSize: '3.5vw', fontFamily: 'Roboto-Medium', textAlign: 'center' }}>Bắt đầu kết nối khách hàng!</Typography>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={6} >
                        <div className={classes.selectableTextFieldContainer}>
                            <TextField
                                id="txtFirstName"
                                label="Họ"
                                type="text"
                                name='txtFirstName'
                                className={classes.selectableTextFieldType}
                                variant="outlined"
                                onChange={this.onValueChange}
                            />
                            <TextField
                                id="txtLastName"
                                label="Tên"
                                type="text"
                                name='txtLastName'
                                className={classes.selectableTextFieldPriority}
                                variant="outlined"
                                onChange={this.onValueChange}
                            />
                        </div>
                        <TextField
                            id="txtPhoneNumber"
                            label="Số điện thoại"
                            type="text"
                            name='txtPhoneNumber'
                            className={classes.textField}
                            variant="outlined"
                            onChange={this.onValueChange}
                        />
                        <TextField
                            id="txtCompanyName"
                            label="Tên công ty"
                            type="text"
                            name='txtCompanyName'
                            className={classes.textField}
                            variant="outlined"
                            margin="normal"
                            onChange={this.onValueChange}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                        <TextField
                            id="txtEmail"
                            label="Email"
                            type="text"
                            name='txtEmail'
                            className={classes.textField}
                            variant="outlined"
                            onChange={this.onValueChange}
                        />
                        <TextField
                            id="txtPassword"
                            label="Mật khẩu"
                            type="password"
                            name='txtPassword'
                            className={classes.textField}
                            variant="outlined"
                            onChange={this.onValueChange}
                        />
                        <TextField
                            id="txtRePassword"
                            label="Nhập lại mật khẩu"
                            type="password"
                            name='txtRePassword'
                            className={classes.textField}
                            variant="outlined"
                            onChange={this.onValueChange}
                        />
                        <MuiThemeProvider theme={theme}>
                            <Button variant="contained" color='primary' style={{ width: '98%', height: '25%', marginLeft: 10, marginTop: 15 }}
                                onClick={() => this.onRegister(this.state.username, this.state.password,
                                    this.state.rePassword, null, this.state.firstName, this.state.lastName, this.state.phoneNumber,
                                    this.state.companyName)}
                            >
                                <Typography style={{ color: '#FFF', fontSize: 20 }}>Đăng ký</Typography>
                            </Button>
                        </MuiThemeProvider>
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}

const styles = {
    center: {
        display: 'block', marginLeft: 'auto', marginRight: 'auto'
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginTop: '15px',
        marginLeft: '10px',
        width: '98%'
    },
    selectableTextFieldContainer: {
        marginTop: '15px',
        paddingLeft: '10px',
        display: 'flex',
        width: '98%'
    },
    selectableTextFieldType: {
        width: '50%',
        marginRight: '5px',
    },
    selectableTextFieldPriority: {
        marginLeft: '5px',
        width: '50%',
    },
};

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
        doregister: (email, password, avatar, firstname, lastname, phone, company) =>
            dispatch(register(email, password, avatar, firstname, lastname, phone, company))
    };
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Register));
