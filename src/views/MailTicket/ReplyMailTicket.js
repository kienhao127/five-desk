import React from "react";
import { Link, Route, Switch } from 'react-router-dom'
import GridContainer from "./../../components/Grid/GridContainer";
import GridItem from "./../../components/Grid/GridItem";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { Button, ClickAwayListener, Typography } from "@material-ui/core";
import AttachFile from "@material-ui/icons/AttachFile";
import ThemeButton from './../../components/ThemeButton/ThemeButton';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import red from '@material-ui/core/colors/red';
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

class ReplyMailTicket extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: types[0],
            priority: priorities[0],
        }
    }

    handleChange = name => event => {
        console.log(event.target.value);
        this.setState({
            [name]: event.target.value,
        })
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
                    <TextField
                        id="assignee"
                        label="Thành viên gửi"
                        type="email"
                        name='assignee'
                        className={classes.textField}
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        id="ccs"
                        label="CCs"
                        type="email"
                        name='ccs'
                        className={classes.textField}
                        variant="outlined"
                        margin="normal"
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

                </GridItem>

                <GridItem xs={12} sm={8} md={8}>
                    <Typography
                        id="subject"
                        style={{ fontFamily: 'Roboto-medium', fontSize: 20 }}
                        className={classes.rightTextField}
                    >
                        Tên chủ đề
                    </Typography>
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
                        <Button color="default" justIcon>
                            <AttachFile />
                        </Button>
                        <ThemeButton
                            width='150px'
                            backgroundColor='#00bcd4'
                            textColor='#FFF'
                            content='Trả lời' />
                    </div>
                    <hr className={classes.line} />

                    <Card className={classes.card}>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="Recipe" className={classes.avatar}>
                                    R
                                </Avatar>
                            }
                            title="Jeff Turpin"
                            subheader="11/11/2018 05:22 AM"
                        />
                        <CardContent>
                            <Typography component="p">
                                Hi Hao, <br/>
                                Thank you for contacting Mailgun support.<br/>
                                You will now able to delete the domain from the account<br/>

                                Kind Regards<br/>
                                Jeff | Mailgun support<br/>
                            </Typography>
                        </CardContent>
                    </Card>
                    
                    <Card className={classes.card}>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="Recipe" className={classes.avatar}>
                                    R
                                </Avatar>
                            }
                            title="Hao Luong"
                            subheader="11/10/2018 11:07 PM"
                        />
                        <CardContent>
                            <Typography component="p">
                                I want to add a new domain but i receice an error: One of your Domain is permanetly disable <br/>
                                When I delete a disable domain is thebestkhtn.tk, I have error: The domain you are trying to delete is disable.<br/>
                                What I can do to add new domain ?<br/>
                                Thank you.
                            </Typography>
                        </CardContent>
                    </Card>

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

export default withStyles(styles)(ReplyMailTicket);