import React from "react";
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";
import classNames from "classnames";

import GridContainer from "./../../components/Grid/GridContainer";
import GridItem from "./../../components/Grid/GridItem";
// @material-ui/core
import TextField from '@material-ui/core/TextField';
import {withStyles, createMuiTheme, MuiThemeProvider} from "@material-ui/core/styles";
import MenuItem from '@material-ui/core/MenuItem';
import { Button, ClickAwayListener, Typography } from "@material-ui/core";
import AttachFile from "@material-ui/icons/AttachFile";
import ThemeButton from './../../components/ThemeButton/ThemeButton';

const types = [
    {id: 1, name: 'Câu hỏi'},
    {id: 2, name: 'Biến cố'},
    {id: 3, name: 'Vấn đề'},
    {id: 4, name: 'Công việc'},
]

const priorities = [
    {id: 1, name: 'Thấp'},
    {id: 2, name: 'Trung bình'},
    {id: 3, name: 'Cao'},
    {id: 4, name: 'Khẩn cấp'},
]

class NewMailTicket extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
        type: types[0],
        priority: priorities[0],
    };
  }

  handleChange = name => event => {
        console.log(event.target.value);
        this.setState({
            [name]: event.target.value,
        })
  }

  componentDidMount(){
  }

  render() {
    const {classes} = this.props;
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
                <Button color="default" justIcon>
                    <AttachFile/>
                </Button>
                <ThemeButton 
                    width='150px'
                    backgroundColor='#00bcd4'
                    textColor='#FFF'
                    content='Gửi'/>
            </div>
            <hr className={classes.line}/>
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
        float: 'left'
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginTop: '15px',
      marginLeft: '10px',
      width: '100%'
    },
    rightTextField: {
        width: '98%',
        marginTop: '15px',
    },
    selectableTextFieldContainer:{
        marginTop: '50px',
        marginLeft: '10px',
        display: 'flex',
        width: '100%'
    },
    selectableTextFieldType:{
        width: '50%',
        marginRight: '5px',
    },
    selectableTextFieldPriority:{
        marginLeft: '5px',
        width: '50%',
    },
    menu: {
        width: 200,
    },
    row:{
        display: 'flex',
        justifyContent: 'flex-end',
        width: '98%'
    },
    button:{
        width: '150px',
    },
    buttonText:{
        color: '#FFF'
    }
  });

export default withStyles(styles) (NewMailTicket);
