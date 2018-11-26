import React from "react";
import { Link, Route, Switch } from 'react-router-dom'
import GridContainer from "./../../components/Grid/GridContainer";
import GridItem from "./../../components/Grid/GridItem";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { Button, ClickAwayListener, Typography } from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Slide from '@material-ui/core/Slide';
import DialogTitle from '@material-ui/core/DialogTitle';
import ThemeButton from './../../components/ThemeButton/ThemeButton';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from './../../components/Avatar/Avatar';
import red from '@material-ui/core/colors/red';
import { getMail, sendMail, updateMailStatus, updateMailType, updateMailPriority } from "../../store/actions/mail";
import { getUserInfo } from "../../store/actions/user";
import { connect } from "react-redux";
import moment from 'moment';
import { ToastContainer, ToastStore } from 'react-toasts';

function Transition(props) {
    return <Slide direction="down" {...props} />;
}

const priorities = [
    { id: 1, name: 'Thấp' },
    { id: 2, name: 'Trung bình' },
    { id: 3, name: 'Cao' },
    { id: 4, name: 'Khẩn cấp' },
]

const types = [
    { id: 1, name: 'Câu hỏi' },
    { id: 2, name: 'Biến cố' },
    { id: 3, name: 'Vấn đề' },
    { id: 4, name: 'Công việc' },
]

const statuses = [
    { id: 1, name: 'Mới' },
    { id: 2, name: 'Mở' },
    { id: 3, name: 'Chờ duyệt' },
    { id: 4, name: 'Đóng' },
]

class ReplyMailTicket extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: "",
            to: "",
            type: types[0],
            priority: priorities[0],
            status: statuses[0],
            subject: "",
            content: "",
            openDialog: false,
            message: "",
            mailID: this.props.match.params.mailID,
            listMail: null,
            rootMail: null,
        }
    }

    onValueChange = (event) => {
        if (event.target.id == "subject")
            this.setState({
                subject: event.target.value
            })
        else if (event.target.id == "outlined-multiline-static")
            this.setState({
                content: event.target.value
            })
    }

    handleChange = name => event => {
        console.log(event.target.value);
        this.setState({
            [name]: event.target.value,
        })
        if (name == 'status'){
            this.props.doUpdateMailStatus(this.state.mailID, event.target.value.id)
            .then(value => {
                ToastStore.success('Cập nhật tình trạng thành công!');
            })
            .catch(error => {

            })
        }
        if (name == 'type'){
            this.props.doUpdateMailType(this.state.mailID, event.target.value.id)
            .then(value => {
                ToastStore.success('Cập nhật loại mail thành công!');
            })
            .catch(error => {

            })
        }
        if (name == 'priority'){
            this.props.doUpdateMailPriority(this.state.mailID, event.target.value.id)
            .then(value => {
                ToastStore.success('Cập nhật độ ưu tiên thành công!');
            })
            .catch(error => {

            })
        }
    }

    handleValidation = (subject, content) => {
        if (subject == "" || content == "") {
            this.setState({ openDialog: true, message: "Chủ đề hoặc nội dung không được để trống" });
            return false;
        }
        return true;
    }

    handleClose = () => {
        this.setState({
            openDialog: false,
        });
    }

    onSendClick = () => {
        var mail = {
            token: sessionStorage.getItem('token'),
            to: this.state.rootMail.Request,
            subject: this.state.rootMail.Subject,
            content: this.state.content,
            typeID: this.state.type.id,
            priorityID: this.state.priority.id,
            statusID: this.state.status.id,
            replyTo: this.state.mailID
        }
        if (this.handleValidation(mail.subject, mail.content))
            this.props.doSendMail(mail)
                .then(resJson => {
                    console.log(resJson);
                    this.setState({
                        content: '',
                    })
                    ToastStore.success('Gửi mail thành công!');
                })
                .catch(error => {
                    console.log(error)
                })
    }


    componentDidMount() {
        this.props.doGetMail(this.state.mailID)
            .then(resJson => {
                console.log('doGetMail', resJson);
                var listMail = resJson.listMail;
                var rootMail = listMail[listMail.length - 1];
                this.setState({
                    rootMail: rootMail,
                    type: types[rootMail.TypeID - 1],
                    priority: priorities[rootMail.PriorityId - 1],
                    status: statuses[rootMail.StatusId - 1],
                })
                listMail.map(mail => {
                    if (mail.MailId[1] != "C") {
                        this.props.doGetUserInfo(mail.UserID)
                            .then(resJson => {
                                console.log('doGetUserInfo', resJson.user);
                                var user = resJson.user;
                                mail['Fullname'] = user.FirstName + ' ' + user.LastName;
                                mail['Email'] = user.Email;
                                console.log('new maillist', listMail);
                                this.setState({
                                    listMail: listMail,
                                })
                            })
                            .catch(error => {
                                console.log(error)
                            })
                    } else {
                        this.setState({
                            listMail: listMail,
                        })
                    }
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        const { classes } = this.props;
        if (this.state.rootMail == null) { return null } else
            return (
                <GridContainer>

                    <ToastContainer position={ToastContainer.POSITION.BOTTOM_LEFT} store={ToastStore} />
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

                    <GridItem xs={12} sm={4} md={4} >
                        <TextField
                            id="requester"
                            label="Người yêu cầu"
                            type="email"
                            name='requester'
                            className={classes.textField}
                            variant="outlined"
                            value={this.state.rootMail.Request}
                            disabled
                            onChange={this.handleChange('to')}
                        />
                        <div className={classes.selectableTextFieldContainer}>
                            <TextField
                                id="select-type"
                                select
                                label="Loại"
                                className={classes.selectableTextFieldType}
                                value={this.state.type}
                                onChange={this.handleChange('type')}
                                SelectProps={{
                                    MenuProps: {
                                        className: classes.menu,
                                    },
                                }}
                                margin="normal"
                                variant="outlined"
                            >
                                {types.map(option => (
                                    <MenuItem key={option.id} value={option}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                id="select-priority"
                                select
                                label="Độ ưu tiên"
                                className={classes.selectableTextFieldType}
                                value={this.state.priority}
                                onChange={this.handleChange('priority')}
                                SelectProps={{
                                    MenuProps: {
                                        className: classes.menu,
                                    },
                                }}
                                margin="normal"
                                variant="outlined"
                            >
                                {priorities.map(option => (
                                    <MenuItem key={option.id} value={option}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>
                        <TextField
                            id="select-status"
                            select
                            label="Tình trạng"
                            className={classes.textField}
                            value={this.state.status}
                            onChange={this.handleChange('status')}
                            SelectProps={{
                                MenuProps: {
                                    className: classes.menu,
                                },
                            }}
                            margin="normal"
                            variant="outlined"
                        >
                            {statuses.map(option => (
                                <MenuItem key={option.id} value={option}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </GridItem>
                    <GridItem xs={12} sm={8} md={8}>
                        <TextField
                            id="subject"
                            label="Chủ đề"
                            type="text"
                            name='subject'
                            className={classes.rightTextField}
                            variant="outlined"
                            value={this.state.rootMail.Subject}
                            disabled
                            onChange={this.onValueChange}
                        />
                        <TextField
                            id="outlined-multiline-static"
                            label="Nội dung"
                            multiline
                            rows="12"
                            defaultValue=""
                            className={classes.rightTextField}
                            margin="normal"
                            variant="outlined"
                            onChange={this.onValueChange}
                        />
                        <div className={classes.row}>
                            <ThemeButton
                                onClick={this.onSendClick}
                                width='150px'
                                backgroundColor='#00bcd4'
                                textColor='#FFF'
                                content='Gửi' />
                        </div>
                        <hr className={classes.line} />

                        {this.state.listMail != null ?
                            this.state.listMail.map((mail, key) => {
                                return (
                                    <Card className={classes.card}>
                                        {mail.MailId[1] != "C"
                                            ?
                                            <CardHeader
                                                avatar={
                                                    <Avatar content={mail.Fullname} colorString={mail.Email} />
                                                }
                                                title={mail.Fullname}
                                                subheader={moment(mail.UpdateTime).format('DD/MM/YYYY HH:mm')}
                                            />
                                            :
                                            <CardHeader
                                                avatar={
                                                    <Avatar content={mail.Request} colorString={mail.Request} />
                                                }
                                                title={mail.Request}
                                                subheader={moment(mail.UpdateTime).format('DD/MM/YYYY HH:mm')}
                                            />
                                        }
                                        <CardContent>
                                            <Typography component="p">
                                                {mail.Content}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                );
                            })
                            : null}

                    </GridItem>

                </GridContainer>
                
            )
    }
}

const styles = {
    line: {
        width: '98%',
        float: 'left',
        marginLeft: '10px',
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
    rightTextField: {
        width: '98%',
        marginTop: '15px',
        marginLeft: '10px',
    },
    selectableTextFieldContainer: {
        marginTop: '50px',
        marginLeft: '10px',
        display: 'flex',
        width: '99%'
    },
    selectableTextFieldType: {
        width: '50%',
        marginRight: '5px',
    },
    selectableTextFieldPriority: {
        marginLeft: '5px',
        width: '50%',
    },
    menu: {
        width: 200,
    },
    row: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '98%'
    },
    button: {
        width: '150px',
    },
    buttonText: {
        color: '#FFF'
    },
    card: {
        float: 'left',
        marginLeft: '10px',
        marginTop: '25px',
        width: '98%',
        border: '1px solid #ccc',
    },
    avatar: {
        backgroundColor: red[500],
    },

};

const mapDispatchToProps = dispatch => {
    return {
        doGetMail: (mailID) => dispatch(getMail(mailID)),
        doGetUserInfo: (userID) => dispatch(getUserInfo(userID)),
        doSendMail: (mail) => dispatch(sendMail(mail)),
        doUpdateMailStatus: (mailID, statusID) => dispatch(updateMailStatus(mailID, statusID)),
        doUpdateMailType: (mailID, typeID) => dispatch(updateMailType(mailID, typeID)),
        doUpdateMailPriority: (mailID, priorityID) => dispatch(updateMailPriority(mailID, priorityID))
    };
};

export default withStyles(styles)(connect(null, mapDispatchToProps)(ReplyMailTicket));