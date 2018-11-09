import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import ReactDOM from 'react-dom';

// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { ListItemSecondaryAction, Typography } from "@material-ui/core";
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { Button, ClickAwayListener } from "@material-ui/core";
import { loadUserFromToken, getListUser } from "../../store/actions/user";
import { connect } from "react-redux";
import {Link} from 'react-router-dom';
import DialogRC from 'react-dialog';
import 'react-dialog/css/index.css';
import ThemeButton from './../../components/ThemeButton/ThemeButton';

// images
import avatar from "assets/img/avatar.png";

const menuItems = [
  { imgSrc: avatar, name: "Hao Luong", editText: "Chỉnh sửa" },
  { imgSrc: avatar, name: "Luong Hao", editText: "Chỉnh sửa" },
  { imgSrc: avatar, name: "Hao Luong", editText: "Chỉnh sửa" },
  { imgSrc: avatar, name: "Luong Hao", editText: "Chỉnh sửa" },
  { imgSrc: avatar, name: "Hao Luong", editText: "Chỉnh sửa" },
  { imgSrc: avatar, name: "Luong Hao", editText: "Chỉnh sửa" },
  { imgSrc: avatar, name: "Hao Luong", editText: "Chỉnh sửa" },
  { imgSrc: avatar, name: "Luong Hao", editText: "Chỉnh sửa" },
  { imgSrc: avatar, name: "Hao Luong", editText: "Chỉnh sửa" },
  { imgSrc: avatar, name: "Luong Hao", editText: "Chỉnh sửa" },
  { imgSrc: avatar, name: "Hao Luong", editText: "Chỉnh sửa" },
  { imgSrc: avatar, name: "Luong Hao", editText: "Chỉnh sửa" },
  { imgSrc: avatar, name: "Hao Luong", editText: "Chỉnh sửa" },
  { imgSrc: avatar, name: "Luong Hao", editText: "Chỉnh sửa" },
];

const menuItems2 = [
  { imgSrc: avatar, name: "Hao Luong", editText: "Chỉnh sửa" },
  { imgSrc: avatar, name: "Luong Hao", editText: "Chỉnh sửa" }
];
const types = [
  {id: 1, name: 'Thành viên'},
  {id: 2, name: 'Khách hàng'}
]

class User extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      type: types[0],
      listUser: null,
      isDialogOpen: false,
      FirstName: "",
      LastName: "",
      MemberType: 0,
      Email: "",
    };

  }

  componentDidMount() {
    this.props.doGetListUser()
      .then((resJson) => {
        console.log('doGetListUser111111');
        console.log(resJson);
        this.setState({
          listUser: resJson.users,
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }
  handleChange = name => event => {
    console.log(event.target.value);
    this.setState({
        [name]: event.target.value,
    })
}
onAddClick = (FirstName, LastName, Email) => {
  if (FirstName == "")
      FirstName = this.state.FirstName;
  if (LastName == "")
      LastName = this.state.LastName;
  if (Email == "")
  Email = this.state.Email;
  this.props.addUser(FirstName, LastName, Email).then((resJson) => {
      this.setState({
          openDialog_update: true,
          message: resJson.message,
      });

  }).catch((error) => {
      console.log(error);
  });
}
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
  else if (event.target.id == "txtEmail")
      this.setState({
          Email: event.target.value
      })
    };
  openDialog = () => this.setState({ isDialogOpen: true })
 
  handleClose = () => this.setState({ isDialogOpen: false })

  render() {
    const { classes } = this.props;
    if (this.props.userProfile != null){
      return (
      
        <div>
          <GridContainer spacing={24}>
           <GridItem xs={24} sm={24} md={10}>
           <div className={classes.TextField_0} style={{ margin: 10, fontFamily: 'Roboto-Regular', fontSize: 15 }}>
                  <button type="button" onClick={this.openDialog} style={{ fontFamily: 'Roboto-Bold', fontSize: 20 }}>Thêm +</button>
                  {
                      this.state.isDialogOpen &&
                      <DialogRC
                          title="Thêm người dùng mới"
                          modal={true}
                          width = {500}
                          height = {330}
                          onClose={this.handleClose}
                          >
                          <div className={classes.TextField_0}>
                                  <TextField
                                      id="txtFirstName"
                                      label='Họ'
                                      className={classNames(classes.textField_1, classes.dense)}
                                      margin="dense"
                                      variant="outlined"
                                      value={this.state.FirstName}
                                      onChange={this.onValueChange}
                                  />
                                  <TextField
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
                                  id="txtEmail"
                                  label='Email'
                                  className={classes.textField_2}
                                  margin="dense"
                                  variant="outlined"
                              />
                              <div className={classes.selectableTextFieldContainer}>
                                  <TextField
                                id="select-type"
                                select
                                label="Loại thành viên"
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
                            </div>
                              <Button
                                  variant="contained"
                                  color="primary"
                                  className={classNames(classes.button, classes.cssbt)}
                                  onClick={() => this.onUpdateClick(this.state.FirstName, this.state.LastName, this.state.Phone)}
                              >
                                  Thêm
                              </Button>
                              
                      </DialogRC>
                  }
              </div>
            </GridItem>
            <GridItem xs={6}>
              <div className={classes.gridItem}>
                <div>
                  <Typography component="h3" variant="2" gutterBottom className={classes.title}>
                    Thành viên ({this.state.listUser == null ? 0 : this.state.listUser.length}/20)
                </Typography>
                </div>
                <div>
                  <List dense={true}>
                    {this.state.listUser && this.state.listUser.map((user, key) => (
                      <ListItem key={key} role={undefined} dense button className={classes.listItem} component={Link}  to={'/agent/member/profile/' + user.UserID}>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                          <Avatar src={avatar} className={classes.avatar} />
                          <Typography style={{ marginLeft: 10, fontFamily: 'Roboto-Regular', fontSize: 15 }}>
                            {(user.FirstName != null ? user.FirstName : '') + (user.FirstName != null ? ' ' : '') + user.LastName}
                          </Typography>
                          {user.UserID == this.props.userProfile.UserID
                            ?
                            <Typography style={{ marginLeft: 10, fontFamily: 'Roboto-Regular', fontSize: 15, color: 'gray' }}>
                              Chỉnh sửa
                            </Typography>
                            : null}
                        </div>
                      </ListItem>
                    ))}
                  </List>
                </div>
              </div>
            </GridItem>
  
            {/*
            <GridItem xs={6}>
              <div className={classes.gridItem}>
                <div>
                  <Typography component="h3" variant="2" gutterBottom className={classes.title}>
                    Khách (3)
                </Typography>
                </div>
                <div>
                  <List dense={true}>
                    {menuItems2.map((item, key) => (
                      <ListItem key={key} role={undefined} dense button className={classes.listItem}>
                        <Avatar alt="Khách" src={item.imgSrc} />
                        <ListItemText primary={item.name} secondary={item.editText}></ListItemText>
                      </ListItem>
                    ))}
                  </List>
                </div>
              </div>
              </GridItem>
              */}
          </GridContainer>
        </div>
  
      );
    }
   
  }
}

const styles = theme => ({
  gridItem: {
    overflow: "auto",
    height: "85vh",
  },
  title: {
    color: "#47525E",
    paddingLeft: "20px",
    fontFamily: 'Roboto-Medium',
    fonrSize: 5,
  },
  TextField_0: {
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.up('md')]: {
        width: '98.5%',
    },
    [theme.breakpoints.down('sm')]: {
        width: '60%',
    },
    [theme.breakpoints.down('xs')]: {
        width: '79%',
    },
},
textField_1: {
  marginBottom: 5,
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
  marginBottom: 5,
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
selectableTextFieldContainer:{
  marginTop: '5px',
  marginLeft: '10px',
  display: 'flex',
  width: '96%'
},
selectableTextFieldType:{
  width: '950%',
  marginRight: '5px',
},
button:{
  width: '150px',
  marginLeft: '320px',
},
});

const mapStateToProps = state => {
  return {
    userProfile: state.user.profile,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    doGetListUser: () => dispatch(getListUser()),
  };
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(User));