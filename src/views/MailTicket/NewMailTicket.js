import React from "react";
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";
import classNames from "classnames";
import { connect } from "react-redux";

import GridContainer from "./../../components/Grid/GridContainer";
import GridItem from "./../../components/Grid/GridItem";
// @material-ui/core
import TextField from '@material-ui/core/TextField';
import { withStyles, createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import MenuItem from '@material-ui/core/MenuItem';
import { Button, ClickAwayListener } from "@material-ui/core";
import AttachFile from "@material-ui/icons/AttachFile";
import ThemeButton from './../../components/ThemeButton/ThemeButton';
import { sendMail } from "../../store/actions/mail";

const types = [
    { id: 1, name: 'Câu hỏi' },
    { id: 2, name: 'Biến cố' },
    { id: 3, name: 'Vấn đề' },
    { id: 4, name: 'Công việc' },
]

const priorities = [
    { id: 1, name: 'Thấp' },
    { id: 2, name: 'Trung bình' },
    { id: 3, name: 'Cao' },
    { id: 4, name: 'Khẩn cấp' },
]

const statuses = [
    { id: 1, name: 'Mới' },
    { id: 2, name: 'Mở' },
    { id: 3, name: 'Chờ duyệt' },
    { id: 4, name: 'Đóng' },
]

class NewMailTicket extends React.Component {

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
        };
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
    }

    onSendClick = () => {
        var mail = {
            token: this.state.token,
            to: this.props.profileInfo.UserId,
            subject: this.state.subject,
            content: this.state.content,
            type: this.state.type,
            priority: this.state.priority,
            status: this.state.status,
        }
        this.props.doSendMail(mail)
            .then(resJson => {
                console.log(resJson);
            })
            .catch(error => {
                console.log(error)
            })
    }

    componentDidMount() {
    }

    render() {
        const { classes } = this.props;
        return (
            <GridContainer>
                <GridItem xs={12} sm={4} md={4} >
                    <TextField
                        id="requester"
                        label="Người yêu cầu"
                        type="email"
                        name='requester'
                        className={classes.textField}
                        variant="outlined"
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
                    />
                    <div className={classes.row}>
                        <ThemeButton
                            onClick={() => this.onSendClick()}
                            width='150px'
                            backgroundColor='#00bcd4'
                            textColor='#FFF'
                            content='Gửi' />
                    </div>
                    <hr className={classes.line} />
                </GridItem>
            </GridContainer>
        );
    }
}

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#00bcd4',
        },
    },
});

const styles = theme => ({
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
    }
});

const mapDispatchToProps = dispatch => {
    return {
        doSendMail: (mail) => dispatch(sendMail(mail)),
    };
};

export default withStyles(styles)(connect(mapDispatchToProps)(NewMailTicket));
