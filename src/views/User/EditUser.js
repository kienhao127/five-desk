import React from "react";
import PropTypes from "prop-types";
import { updateProfile, changePassword, getUserInfo, loadUserFromToken } from './../../store/actions/user';
import { connect } from "react-redux";
import contentImg from './../../assets/img/cover.jpeg';
import { Link } from "react-router-dom";
// @material-ui/core components
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Button from '@material-ui/core/Button';
import Avatar from "./../../components/Avatar/Avatar";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { Typography } from "@material-ui/core";


function Transition(props) {
    return <Slide direction="down" {...props} />;
}
class EditUser extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            FirstName: "",
            LastName: "",
            Phone: "",
            CompanyName: "",
            Email: "",
            Old_password: "",
            New_password: "",
            Retype_password: "",
            openDialog_login: false,
            openDialog_update: false,
            openDialog_changePassword: false,
            message: "",
            user: null,
            userID: this.props.match.params.userID,
            currentUser: null,
        };
    }

    componentDidMount() {
        this.props.doGetUserInfo(this.state.userID).then((resJson) => {
            this.setState({
                user: resJson.user,
                FirstName: resJson.user.FirstName,
                LastName: resJson.user.LastName,
                CompanyName: resJson.user.CompanyName,
                Email: resJson.user.Email,
                Phone: resJson.user.PhoneNumber,
            });

        }).catch((error) => {
            console.log(error);
        });
    }

    handleToggle = () => {
        this.setState(state => ({ open: !state.open }));
    };

    onValueChange = (event) => {

        if (event.target.id == "txtFirstName") {
            this.setState({
                FirstName: event.target.value
            });
        }
        else if (event.target.id == "txtLastName")
            this.setState({
                LastName: event.target.value
            })
        else if (event.target.id == "txtPhone")
            this.setState({
                Phone: event.target.value
            })
        else if (event.target.id == "txtOld_password")
            this.setState({
                Old_password: event.target.value
            })
        else if (event.target.id == "txtNew_password")
            this.setState({
                New_password: event.target.value
            })
        else if (event.target.id == "txtRetype_password")
            this.setState({
                Retype_password: event.target.value
            })
    };



    onUpdateClick = (FirstName, LastName, Phone) => {
        if (FirstName == "")
            FirstName = this.state.FirstName;
        if (LastName == "")
            LastName = this.state.LastName;
        if (Phone == "")
            Phone = this.state.Phone;
        this.props.doupdateProfile(FirstName, LastName, Phone).then((resJson) => {
            this.setState({
                openDialog_update: true,
                message: resJson.message,
            });
            if (resJson.returnCode == "1")
                this.props.doGetUserInfo(this.state.userID).then((resJson) => {
                    this.setState({
                        user: resJson.user,
                        FirstName: resJson.user.FirstName,
                        LastName: resJson.user.LastName,
                        CompanyName: resJson.user.CompanyName,
                        Email: resJson.user.Email,
                        Phone: resJson.user.PhoneNumber,
                    });
                }).catch((error) => {
                    console.log(error);
                });

        }).catch((error) => {
            console.log(error);
        });
    }

    onChangePassword = (Old_password, New_password) => {
        if (this.state.New_password !== this.state.Retype_password)
            this.setState({
                openDialog_changePassword: true,
                message: "Nhập lại mật khẩu",
            })
        else
            this.props.doChangePassword(Old_password, New_password).then((resJson) => {
                this.setState({
                    openDialog_changePassword: true,
                    message: resJson.message,
                });
            }).catch((error) => {
                console.log(error);
            });
    }

    handleClose = () => {
        this.setState({
            openDialog_login: false,
            openDialog_update: false,
            openDialog_changePassword: false,
        });
    };

    render() {
        const { classes } = this.props;
        return (

            this.props.userProfile != null ?
                <div className={classes.root}>
                    <Dialog
                        open={this.state.openDialog_update}
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

                    <Dialog
                        open={this.state.openDialog_changePassword}
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
                        <GridItem xs={12} sm={12} md={7}>
                            <div className={classes.left}>
                                <img className={classes.img} src={contentImg} />

                                <div style={{ marginTop: -50, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end' }}>
                                    <Avatar width={130} content={this.props.userProfile.FirstName} colorString={this.props.userProfile.Email} />
                                    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 10 }}>
                                        <Typography style={{ fontFamily: 'Roboto-Medium', fontSize: 30 }}>{this.state.user ? this.state.user.FirstName : ''} {this.state.user ? this.state.user.LastName : ''}</Typography>
                                        <Typography style={{ fontFamily: 'Roboto-Regular', fontSize: 15 }}>{this.state.user ? this.state.user.PhoneNumber : ''}</Typography>
                                    </div>
                                </div>
                            </div>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={5}>
                            <div className={classes.right}>
                                <div className={classes.TextField_0}>
                                    <TextField
                                        disabled={this.state.userID != this.props.userProfile.UserID ? true : false}
                                        id="txtFirstName"
                                        label='Họ'
                                        className={classNames(classes.textField_1, classes.dense)}
                                        margin="dense"
                                        variant="outlined"
                                        value={this.state.FirstName}
                                        onChange={this.onValueChange}
                                    />
                                    <TextField
                                        disabled={this.state.userID != this.props.userProfile.UserID ? true : false}
                                        id="txtLastName"
                                        label='Tên'
                                        className={classNames(classes.textField_1, classes.dense)}
                                        margin="dense"
                                        variant="outlined"
                                        value={this.state.LastName}
                                        onChange={this.onValueChange}
                                    />
                                </div>
                                <TextField
                                    disabled={this.state.userID != this.props.userProfile.UserID ? true : false}
                                    id="txtPhone"
                                    label='Số điện thoại'
                                    className={classNames(classes.textField_2, classes.dense)}
                                    margin="dense"
                                    variant="outlined"
                                    value={this.state.Phone}
                                    onChange={this.onValueChange}
                                />
                                <TextField
                                    disabled
                                    id="txtTeam"
                                    label="Team"
                                    value={this.state.CompanyName}
                                    className={classNames(classes.textField_2, classes.dense)}
                                    margin="dense"
                                    variant="outlined"
                                />
                                <TextField
                                    disabled
                                    id="txtEmail"
                                    label="Email"
                                    value={this.state.Email}
                                    className={classes.textField_2}
                                    margin="dense"
                                    variant="outlined"
                                />
                                {this.state.userID == this.props.userProfile.UserID ?
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className={classNames(classes.textField_2, classes.cssbt)}
                                        onClick={() => this.onUpdateClick(this.state.FirstName, this.state.LastName, this.state.Phone)}
                                    >
                                        Cập nhật
                            </Button>
                                    : null}
                                {this.state.userID == this.props.userProfile.UserID ?
                                    <TextField
                                        id="txtOld_password"
                                        label="Mật khẩu cũ"
                                        className={classNames(classes.textField_3, classes.dense)}
                                        margin="dense"
                                        variant="outlined"
                                        type="password"
                                        onChange={this.onValueChange}
                                    />
                                    : null}
                                {this.state.userID == this.props.userProfile.UserID ?
                                    <TextField
                                        id="txtNew_password"
                                        label="Mật khẩu mới"
                                        type="password"
                                        className={classNames(classes.textField_2, classes.dense)}
                                        margin="dense"
                                        variant="outlined"
                                        onChange={this.onValueChange}
                                    />
                                    : null}
                                {this.state.userID == this.props.userProfile.UserID ?
                                    <TextField
                                        id="txtRetype_password"
                                        label="Nhập lại mật khẩu"
                                        className={classNames(classes.textField_2, classes.dense)}
                                        margin="dense"
                                        type="password"
                                        variant="outlined"
                                        onChange={this.onValueChange}
                                    />
                                    : null}
                                {this.state.userID == this.props.userProfile.UserID ?
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className={classNames(classes.textField_2, classes.cssbt)}
                                        onClick={() => this.onChangePassword(this.state.Old_password, this.state.New_password)}
                                    >
                                        Đổi mật khẩu
                            </Button>
                                    : null}
                            </div>
                        </GridItem>
                    </GridContainer>
                </div>
                : null
        );
    }
}
const styles = theme => ({

    root: {
        width: '95%',
        fontFamily: 'Roboto',
        marginLeft: 'auto',
        marginRight: 'auto',
    },

    TextField_0: {
        display: 'flex',
        flexDirection: 'row',
        [theme.breakpoints.up('md')]: {
            width: '99.5%',
        },
        [theme.breakpoints.down('sm')]: {
            width: '60%',
        },
        [theme.breakpoints.down('xs')]: {
            width: '79%',
        },
    },

    textField_1: {
        marginBottom: 20,
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        [theme.breakpoints.down('sm')]: {
            width: '58.5%',
        },
        [theme.breakpoints.up('md')]: {
            width: '95%',
        },
        [theme.breakpoints.down('xs')]: {
            width: '74.5%',
        },


    },
    textField_2: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        fontSize: 16,
        fontFamily: 'Roboto-Regular',
        [theme.breakpoints.down('sm')]: {
            width: '58.5%',
        },
        [theme.breakpoints.up('md')]: {
            width: '95%',
        },
        [theme.breakpoints.down('xs')]: {
            width: '74.5%',
        },
    },
    textField_3: {
        marginTop: 50,
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        [theme.breakpoints.down('sm')]: {
            width: '58.5%',
        },
        [theme.breakpoints.up('md')]: {
            width: '95%',
        },
        [theme.breakpoints.down('xs')]: {
            width: '74.5%',
        },
    },
    img: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        width: '100%',
        height: '68%',
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    avatar: {
        width: 130,
        height: 130,

    },
    right: {
        display: 'flex',
        flexDirection: 'column',
        jutifyContent: 'center',
        alignItems: 'center',
        marginTop: -9,
        [theme.breakpoints.down('sm')]: {
            width: '95%',
        },
    },
    left: {
        display: 'flex',
        flexDirection: 'column',
        jutifyContent: 'center',
        alignItems: 'center',
    },
    cssbt: {
        backgroundColor: "#47525E",
        '&:hover': {
            backgroundColor: "#1A100B",
        },
    },
});
const mapStateToProps = state => {
    return {
        userProfile: state.user.profile,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        doupdateProfile: (FirstName, LastName, Phone) =>
            dispatch(updateProfile(FirstName, LastName, Phone)),
        doChangePassword: (oldPassword, newPassword) =>
            dispatch(changePassword(oldPassword, newPassword)),
        doGetUserInfo: (UserID) =>
            dispatch(getUserInfo(UserID)),
    };
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(EditUser));
