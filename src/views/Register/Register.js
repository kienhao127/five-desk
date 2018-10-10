import React from "react";
import PropTypes from "prop-types";
// @material-ui/core
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import withStyles from "@material-ui/core/styles/withStyles";

class Register extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            email: "",
            lastName: "",
            firstName: "",
            phoneNumber: "",
            companyName: "",
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
        else if (event.target.id == "txtEmail")
            this.setState({
                email: event.target.value
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

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.registerDiv}>
                <h4>ĐĂNG KÝ TÀI KHOẢN</h4>
                <h4>Tên tài khoản:<h4 className={classes.requiredAsterisk}>*</h4></h4>
                <TextField id="txtUsername" value={this.state.username} onChange={this.onValueChange}></TextField>
                <h4>Mật khẩu:<h4 className={classes.requiredAsterisk}>*</h4></h4>
                <TextField id="txtPassword" type="password" value={this.state.password} onChange={this.onValueChange}></TextField>
                <h4>Email:<h4 className={classes.requiredAsterisk}>*</h4></h4>
                <TextField id="txtEmail" value={this.state.email} onChange={this.onValueChange}></TextField>
                <h4>THÔNG TIN CÁ NHÂN</h4>
                <h4>Họ:</h4>
                <TextField id="txtLastName" value={this.state.lastName} onChange={this.onValueChange}></TextField>
                <h4>Tên:</h4>
                <TextField id="txtFirstName" value={this.state.firstName} onChange={this.onValueChange}></TextField>
                <h4>Số điện thoại:</h4>
                <TextField id="txtPhoneNumber" value={this.state.phoneNumber} onChange={this.onValueChange}></TextField>
                <h4>Tên công ty:</h4>
                <TextField id="txtCompanyName" value={this.state.companyName} onChange={this.onValueChange}></TextField>
                <br /><br />
                <Button variant="outlined">Đăng Ký</Button>
            </div>
        );
    }
}

const styles = {
    registerDiv: {
        paddingLeft: "700px",
    },
    requiredAsterisk: {
        color: "red",
        display: "inline",
    }
}

export default withStyles(styles)(Register);
