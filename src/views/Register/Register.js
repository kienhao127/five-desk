import React from "react";
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";
import classNames from "classnames";

import GridContainer from "./../../components/Grid/GridContainer";
import GridItem from "./../../components/Grid/GridItem";
// @material-ui/core
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import ThemeButton from './../../components/ThemeButton/ThemeButton';
import {withStyles, createMuiTheme, MuiThemeProvider} from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";
import RegisterImage from 'assets/img/register-image.png';

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
        if (event.target.id == "txtEmail")
            this.setState({
                username: event.target.value
            })
        else if (event.target.id == "txtPassword")
            this.setState({
                password: event.target.value
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
            <div style={{width: '50%', display: 'block', marginLeft: 'auto', marginRight: 'auto'}}>
                <img src={RegisterImage} style={{width: '75%', display: 'block', marginLeft: 'auto', marginRight: 'auto'}}/>
                <Typography style={{display: 'block', marginLeft: 'auto', marginRight: 'auto', fontSize: 40, fontFamily: 'Roboto-Medium', textAlign:'center'}}>Bắt đầu kết nối khách hàng!</Typography>
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
                            />
                            <TextField
                                id="txtLastName"
                                label="Tên"
                                type="text"
                                name='txtLastName'
                                className={classes.selectableTextFieldPriority}
                                variant="outlined"
                            />
                        </div>
                        <TextField
                            id="txtPhoneNumber"
                            label="Số điện thoại"
                            type="text"
                            name='txtPhoneNumber'
                            className={classes.textField}
                            variant="outlined"
                        />
                        <TextField
                            id="txtCompanyName"
                            label="Tên công ty"
                            type="text"
                            name='txtCompanyName'
                            className={classes.textField}
                            variant="outlined"
                            margin="normal"
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
                        />
                        <TextField
                            id="txtPassword"
                            label="Mật khẩu"
                            type="password"
                            name='txtPassword'
                            className={classes.textField}
                            variant="outlined"
                        />
                        <MuiThemeProvider theme={theme}>
                            <Button variant="contained" color='primary' style={{width: '98%', height: '25%', marginLeft: 10, marginTop: 15}}>
                                <Typography style={{color: '#FFF', fontSize: 20}}>Đăng ký</Typography>
                            </Button>
                        </MuiThemeProvider>
                    </GridItem>
                </GridContainer>
            </div>
        // <div id="333" className={classes.container}>
        
            // <table className={classes.table}>
                // <tr className={classes.tableRow}>
                //     <td>
                //         <TextField className={classes.txt} variant="outlined" label="Email"></TextField>
                //     </td>
                //     <td>
                //         <TextField className={classes.txt} variant="outlined" label="Số điện thoại"></TextField>
                //     </td>
                // </tr>
                // <tr className={classes.tableRow}>
                //     <td>
                //         <TextField className={classes.txt} variant="outlined" label="Password"></TextField>
                //     </td>
                //     <td>
                //         <TextField className={classes.txt} variant="outlined" label="Tên công ty"></TextField>
                //     </td>
                // </tr>
                // <tr className={classes.tableRow}>
                //     <td className={classes.cellHoTen}>
                //     <TextField className={classes.txtHo} variant="outlined" label="Họ"></TextField>
                //     <TextField className={classes.txtTen} variant="outlined" label="Tên"></TextField>
                //     </td>
                //     <td>
                //         <Button className={classes.txt + ' ' + classes.button} variant="outlined">Đăng ký</Button>
                //     </td>
                // </tr>
            // </table>
        // </div>
        );
    }
}

// const styles = {
//     container: {
//         paddingLeft: "20%",
//         paddingRight: "20%",
//         height: "500px",
//     },
//     table: {
//         position: "relative",
//         width: "100%",
//         height: "50%",
//     },
//     txt: {
//         width: "90%",
//         left: "5%",
//     },
//     tableRow: {
//         marginBottom: "15%",
//     },
//     button: {
//         height: "56px",
//         backgroundColor: "#47525e",
//         color: "#FFFFFF",
//         fontFamily: "'Times New Roman', Times, serif",
//         fontSize: "20px",
//     },
//     cellHoTen: {
//         width: "50%",
//     },
//     txtHo: {
//         width: "42.5%",
//         marginLeft: "5%",
//         marginRight: "2.5%",
//     },
//     txtTen: {
//         width: "42.5%",
//         marginLeft: "2.5%",
//         marginRight: "5%",
//     }
// }

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
    selectableTextFieldContainer:{
        marginTop: '15px',
        paddingLeft: '10px',
        display: 'flex',
        width: '98%'
    },
    selectableTextFieldType:{
        width: '50%',
        marginRight: '5px',
    },
    selectableTextFieldPriority:{
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


export default withStyles(styles)(Register);
