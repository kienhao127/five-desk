import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import ReactDOM from 'react-dom';

// @material-ui/core
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {Typography, Dialog, DialogTitle } from "@material-ui/core";
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { Button, ClickAwayListener } from "@material-ui/core";
import { loadUserFromToken, getListUser } from "../../store/actions/user";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

// images
import avatar from "assets/img/avatar.png";

class User extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      listUser: null,
      isDialogOpen: false,
      FirstName: "",
      LastName: "",
      MemberType: 0,
      Email: "",
      open: false,
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

  handleClose = () => {
    this.setState({
      open: false
    })
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
    else if (event.target.id == "txtEmail")
      this.setState({
        Email: event.target.value
      })
  };

  onAddUser = () => {
    this.setState({
      open: false
    })
  }

  onShowDialog = () => {
    this.setState({
      open: true
    })
  }

  render() {
    const { classes } = this.props;
    return (
      this.props.userProfile != null ?
        <GridContainer>
          <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={this.state.open}>
            <DialogTitle id="simple-dialog-title">Thêm thành viên</DialogTitle>
            <div style={{display: 'flex', padding: 10, flexDirection: 'column', alignItems: 'flex-end'}}>
              <div style={{display: 'flex', flexDirection: 'row'}}>
                <TextField
                  id="txtFirstName"
                  label='Họ'
                  style={{width: '50%', marginRight: 5}}
                  margin="dense"
                  variant="outlined"
                  value={this.state.FirstName}
                  onChange={this.onValueChange}
                />
                <TextField
                  id="txtLastName"
                  label='Tên'
                  style={{width: '50%', marginLeft: 5}}
                  margin="dense"
                  variant="outlined"
                  value={this.state.LastName}
                  onChange={this.onValueChange}
                />
              </div>
              <TextField
                id="txtEmail"
                label='Email'
                style={{width: '100%'}}
                margin="dense"
                variant="outlined"
              />
               <MuiThemeProvider theme={theme}>
                <Button style={{marginTop: 10}} variant="contained" color="primary" onClick={this.onAddUser}>
                  <Typography style={{fontFamily: 'Roboto-Regular', fontSize: 15, color: '#FFF'}}>
                    Thêm thành viên
                  </Typography>
                </Button>
              </MuiThemeProvider>
            </div>
          </Dialog>
          <GridItem>
            <div className={classes.gridItem}>
              <div style={{display:'flex', flexDirection: 'row', alignItems: 'center',}}>
                <Typography component="h3" variant="2" gutterBottom className={classes.title}>
                  Thành viên ({this.state.listUser == null ? 0 : this.state.listUser.length}/20)
                </Typography>
                <Button onClick={this.onShowDialog} style={{marginLeft: 10}}>
                  <Typography style={{color: '#00bcd4'}}>
                    Thêm
                  </Typography>
                </Button>
              </div>
              <div>
                <List dense={true} style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
                  {this.state.listUser && this.state.listUser.map((user, key) => (
                    <ListItem key={key} dense button className={classes.listItem} component={Link} to={'/agent/member/profile/' + user.UserID}>
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

        </GridContainer>
        : null
    );
  }
}


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00bcd4',
    },
  },
  typography: {
    useNextVariants: true,
  },
});

const styles = theme => ({
  listItem: {
    width: '300px',
    margin: 10,
  },
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
  selectableTextFieldContainer: {
    marginTop: '5px',
    marginLeft: '10px',
    display: 'flex',
    width: '96%'
  },
  selectableTextFieldType: {
    width: '950%',
    marginRight: '5px',
  },
  button: {
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