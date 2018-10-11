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
            <div id="333" className={classes.container}>
                <table className={classes.table}>
                    <tr className={classes.tableRow}>
                        <td>
                            <TextField className={classes.txt} variant="outlined" label="Email"></TextField>
                        </td>
                        <td>
                            <TextField className={classes.txt} variant="outlined" label="Số điện thoại"></TextField>
                        </td>
                    </tr>
                    <tr className={classes.tableRow}>
                        <td>
                            <TextField className={classes.txt} variant="outlined" label="Password"></TextField>
                        </td>
                        <td>
                            <TextField className={classes.txt} variant="outlined" label="Tên công ty"></TextField>
                        </td>
                    </tr>
                    <tr className={classes.tableRow}>
                        <td className={classes.cellHoTen}>
                        <TextField className={classes.txtHo} variant="outlined" label="Họ"></TextField>
                        <TextField className={classes.txtTen} variant="outlined" label="Tên"></TextField>
                        </td>
                        <td>
                            <Button className={classes.txt + ' ' + classes.button} variant="outlined">Đăng ký</Button>
                        </td>
                    </tr>
                </table>
            </div>
        );
    }
}

const styles = {
    container: {
        paddingLeft: "20%",
        paddingRight: "20%",
        height: "500px",
    },
    table: {
        position: "relative",
        width: "100%",
        height: "50%",
    },
    txt: {
        width: "90%",
        left: "5%",
    },
    tableRow: {
        marginBottom: "15%",
    },
    button: {
        height: "56px",
        backgroundColor: "#47525e",
        color: "#FFFFFF",
        fontFamily: "'Times New Roman', Times, serif",
        fontSize: "20px",
    },
    cellHoTen: {
        width: "50%",
    },
    txtHo: {
        width: "42.5%",
        marginLeft: "5%",
        marginRight: "2.5%",
    },
    txtTen: {
        width: "42.5%",
        marginLeft: "2.5%",
        marginRight: "5%",
    }
}

export default withStyles(styles)(Register);
