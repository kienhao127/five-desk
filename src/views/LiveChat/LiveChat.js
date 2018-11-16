import React from "react";
import PropTypes from "prop-types";
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core
import Hidden from "@material-ui/core/Hidden";
import GridContainer from "./../../components/Grid/GridContainer";
import GridItemChat from "./../../components/Grid/GridItemChat";
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SendIcon from '@material-ui/icons/Send';
import AttachmentIcon from '@material-ui/icons/Attachment';
import { IconButton, Typography, Dialog } from "@material-ui/core";
import Avatar from "./../../components/Avatar/Avatar";
import avatar from "assets/img/avatar.png";
import Button from "@material-ui/core/Button";
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Transfer from '@material-ui/icons/TransferWithinAStation';
import green from '@material-ui/core/colors/green';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { connect } from "react-redux";
import { getListTopic, getTopic, transferTopic, updateUnreadMessageCount, seenMessage } from "../../store/actions/chat";
import HyperText from "../../components/HyperLink/HyperLink";
import ScrollToBottom from 'react-scroll-to-bottom';
import Tooltip from '@material-ui/core/Tooltip';
import * as moment from 'moment';
import 'moment/locale/vi';
import SkyLight from 'react-skylight';
import { getVisitorInfo, updateVisitorInfo } from "../../store/actions/visitor";

//Socket
import io from 'socket.io-client';
import { loadUserFromToken, getListUser } from "../../store/actions/user";
const socket = io('https://fivedesk.herokuapp.com')
// const socket = io('http://localhost:8888')

moment.locale('vi');
const img_me = "https://i.imgur.com/p9bwTYj.png";
var currentUser = null;

class LiveChat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      right: false,
      selectedVisitorIndex: 0,
      topic: null,
      visitor: null,
      listTopic: [{
        CompanyID: 1,
        IsDelete: 0,
        LastMessageSendTime: 1541349185313,
        ServicerID: 1,
        TopicID: "127.0.0.3",
        UnreadMessageCount: 0,
        VisitorName: "User02"
      }],
      listMessage: null,
      listUser: null,
      notifyUpdateVisitor: null,
      content: '',
    };
    socket.on('chat message', (message) => this.onReceiveMessage(message));
    socket.on('time', function(timeString) {
      console.log('Server time: ' + timeString);
    });
  }

  componentDidMount() {
    console.log(this.props.userProfile);

    this.props.doGetListTopic()
      .then((resJson) => {
        console.log('doGetListTopic');
        console.log(resJson);
        this.setState({
          listTopic: resJson.listTopic,
        })
        this.onTopicClick(resJson.listTopic[0], 0);
      })
      .catch((error) => {
        console.log(error);
      });

    this.props.doGetListUser()
      .then((resJson) => {
        console.log('doGetListUser');
        console.log(resJson);
        this.setState({
          listUser: resJson.users,
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  onTopicClick = (topic, index) => {
    this.setState({
      listMessage: null,
      topic: topic,
      selectedVisitorIndex: index,
      visitor: null,
      notifyUpdateVisitor: null,
    })

    //lấy nội dung của topic
    console.log('TopicID: ' + topic.TopicID)
    this.props.doGetTopic(topic.TopicID)
      .then((resJson) => {
        console.log('set state');
        this.setState({
          listMessage: resJson.topic,
        })
      })
      .catch((error) => {
        console.log(error);
      });

    //lấy thông tin khách hàng
    this.props.doGetVisitorInfo(topic.TopicID)
      .then((resJson) => {
        console.log(resJson);
        this.setState({
          visitor: resJson.visitor
        })
      })
      .catch((error) => {
        console.log(error);
      });

    //Nếu topic do mình quản lý
    if (topic.ServicerID == this.props.userProfile.UserID) {
      //gọi api đã xem tin nhắn
      this.props.doSeenMessage(topic.TopicID)
        .then((resJson) => {
          console.log('Update seen message');
          console.log(resJson);
        })
        .catch((error) => {
          console.log(error);
        });

      //gọi api update UnreadMessageCount = 0
      this.props.doUpdateUnreadMessageCount(topic.TopicID, 0)
        .then((resJson) => {
          // socket.emit('checkUnreadMessgae', sessionStorage.getItem('token'));
          console.log('Update unread message count');
          console.log(resJson);
          this.props.doGetListTopic()
            .then((resJson) => {
              console.log('doGetListTopic');
              console.log(resJson);
              this.setState({
                listTopic: resJson.listTopic,
              })
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  onAcceptClick = (topic) => {
    //gọi api update serviverID
    //Chấp nhận tin nhắn
    this.props.doTransferTopic(topic.TopicID, this.props.userProfile.UserID)
      .then((resJson) => {
        this.props.doGetListTopic()
          .then((resJson) => {
            console.log('doGetListTopic');
            console.log(resJson);
            this.setState({
              listTopic: resJson.listTopic,
            })
            var thisTopic = resJson.listTopic.filter(topic => topic.TopicID == this.state.topic.TopicID)[0];
            var selectedVisitorIndex = resJson.listTopic.indexOf(thisTopic);
            this.onTopicClick(thisTopic, selectedVisitorIndex);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onTransferClick = () => {
    this.setState({
      open: true
    })
  }

  onContentChange = (event) => {
    this.setState({
      content: event.target.value,
    })
  }

  onSendMessage = () => {
    var message = {
      token: sessionStorage.getItem('token'),
      TopicID: this.state.topic.TopicID,
      SenderID: this.props.userProfile.UserID,
      RecieverID: this.state.visitor.VisitorID,
      Content: this.state.content,
      SendTime: new Date().getTime(),
      TypeID: 1,
      LastMassageSendTime: new Date().getTime(),
      VisitorName: this.state.topic.VisitorName,
      ServicerID: this.props.userProfile.UserID,
      CompanyID: this.props.userProfile.CompanyID,
    }
    this.setState({
      content: '',
    })
    console.log('Gửi tin nhắn đi server với nội dung là: message');
    socket.emit('chat message', message);
  }

  onReceiveMessage = (message) => {
    console.log('Nhận tin nhắn từ server')
    console.log(message);
    if (message.TopicID == this.state.topic.TopicID) {
      var listMessage = this.state.listMessage;
      listMessage.push(message);
      this.setState({
        listMessage: listMessage,
      })
    }
    this.props.doGetListTopic()
      .then((resJson) => {
        console.log('doGetListTopic');
        console.log(resJson);
        this.setState({
          listTopic: resJson.listTopic,
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleChange = (event) => {
    if (event.target != undefined) {
      var visitor = this.state.visitor
      if (event.target.id == "email") {
        visitor.Email = event.target.value
      }
      if (event.target.id == "phoneNumber") {
        visitor.PhoneNumber = event.target.value
      }
      if (event.target.id == "note") {
        visitor.Notes = event.target.value
      }
      this.setState({
        visitor: visitor
      })
    }
  };

  onUpdateVisitorInfo = (visitor) => {
    //gọi api update visitor info
    this.props.doUpdateVisitorInfo(visitor.VisitorID, visitor.Email, visitor.Notes, visitor.PhoneNumber)
      .then((resJson) => {
        console.log(resJson);
        this.setState({
          notifyUpdateVisitor: resJson,
        })
      })
      .catch((error) => {
        console.log(error);
      });
    setTimeout(this.clearNotify, 3000);
  }

  clearNotify = () => {
    this.setState({
      notifyUpdateVisitor: null,
    })
  }

  onUserClick = (user) => {
    //gọi api chuyển nhượng
    this.setState({
      open: false
    })
    this.props.doTransferTopic(this.state.topic.TopicID, user.UserID)
      .then((resJson) => {
        this.props.doGetListTopic()
          .then((resJson) => {
            console.log('doGetListTopic');
            console.log(resJson);
            this.setState({
              listTopic: resJson.listTopic,
            })
            var thisTopic = resJson.listTopic.filter(topic => topic.TopicID == this.state.topic.TopicID)[0];
            var selectedVisitorIndex = resJson.listTopic.indexOf(thisTopic);
            this.onTopicClick(thisTopic, selectedVisitorIndex);
          })
          .catch((error) => {
            console.log(error);
          });
      })
  }

  handleClose = () => {
    this.setState({
      open: false
    })
  };

  render() {
    const { classes } = this.props;
    return (
      this.props.userProfile != null ?
        <div className={classes.root}>
          <Dialog fullWidth onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={this.state.open}>
            <Typography style={{ marginLeft: 10, fontFamily: 'Roboto-Medium', fontSize: 20 }}>Danh sách thành viên</Typography>
            <List dense={true}>
              {this.state.listUser && this.state.listUser.map((user, key) => (
                user.UserID != this.props.userProfile.UserID
                  ?
                  <ListItem
                    key={key}
                    role={undefined}
                    dense
                    button
                    onClick={() => this.onUserClick(user)}
                    className={classes.listItem}>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                      <Avatar content={user.FirstName} colorString={user.Email} />
                      <Typography style={{ marginLeft: 10 }}>{(user.FirstName != null ? user.FirstName : '') + (user.FirstName != null ? ' ' : '') + user.LastName}</Typography>
                    </div>
                  </ListItem>
                  :
                  null
              ))}
            </List>
          </Dialog>

          <GridContainer>
            <GridItemChat xs={4} sm={4} md={3} >
              <div className={classes.left}>
                <List dense={true}>
                  {this.state.listTopic && this.state.listTopic.map((item, key) => (
                    <ListItem
                      key={key}
                      role={undefined}
                      dense
                      button
                      selected={this.state.selectedVisitorIndex === key ? true : false}
                      onClick={() => this.onTopicClick(item, key)}
                      className={classes.listItem}>
                      <div>
                        <Avatar content={item.VisitorName} colorString={item.VisitorName} />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%' }}>
                        <Typography style={{ fontFamily: 'Roboto-Regular', fontSize: 15, color: '#000', marginLeft: 10 }}>{item.VisitorName}</Typography>
                        <Typography style={{ width: 12, height: 12, borderRadius: 6, marginLeft: 'auto', backgroundColor: item.UnreadMessageCount > 0 ? 'red' : 'transparent', marginLeft: 10, fontFamily: 'Roboto-Regular', fontSize: 10, textAlign: "center", color: '#FFF' }}>{item.UnreadMessageCount > 0 ? item.UnreadMessageCount : null}</Typography>
                      </div>
                    </ListItem>
                  ))}
                </List>
              </div>
            </GridItemChat>

            <GridItemChat xs={8} sm={8} md={6} >
              <div className={classes.center}>
                <div className={classes.top}>
                  <Typography style={{ fontFamily: 'Roboto-Regular' }}>
                    {this.state.topic ? this.state.topic.VisitorName : null}
                  </Typography>
                  {this.state.topic && this.state.topic.ServicerID == this.props.userProfile.UserID
                    ?
                    <MuiThemeProvider theme={theme}>
                      <Tooltip title="Chuyển tin nhắn" placement='top'>
                        <IconButton variant="contained" color="primary" style={{ marginLeft: 'auto', marginRight: 10, alignItems: 'center', justifyContent: 'center' }} onClick={() => this.onTransferClick()}>
                          <Transfer style={{ color: '#000' }} />
                        </IconButton>
                      </Tooltip>
                    </MuiThemeProvider>
                    : null}
                </div>
                <ScrollToBottom className={classes.chat} ref={(ref) => this.messageList = ref} >
                  {this.state.listMessage && this.state.listMessage.map((message, index) => {
                    var beforeMessage = this.state.listMessage[index - 1];
                    return (
                      message.SenderID != this.props.userProfile.UserID
                        ?
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }} key={index}>
                          <Tooltip title={moment(message.SendTime).calendar()} placement="right">
                            <div className={classes.bubble_y} style={{ backgroundColor: isNaN(message.SenderID) ? "#eaeaeb'" : '#23ce3f' }}>
                              <div className={classes.b_you}>
                                <HyperText me={false} content={message.Content} />
                              </div>
                            </div>
                          </Tooltip>
                        </div>
                        :
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }} key={index}>
                          <Tooltip title={moment(message.SendTime).calendar()} placement="left">
                            <div className={classes.bubble_m}>
                              <div className={classes.me}>
                                <HyperText me={true} content={message.Content} />
                              </div>
                            </div>
                          </Tooltip>
                        </div>
                    )
                  }
                  )}
                </ScrollToBottom>
                {this.state.topic && this.state.topic.ServicerID == this.props.userProfile.UserID
                  ?
                  <div className={classes.chatBottom}>
                    <MuiThemeProvider theme={theme}>
                      <TextField
                        id="outlined-bare"
                        value={this.state.content}
                        onChange={this.onContentChange}
                        className={classes.chatTextField}
                        variant="outlined"
                        InputProps={{
                          endAdornment:
                            <InputAdornment position="end">
                              {/* <IconButton>
                            <AttachmentIcon />
                          </IconButton> */}
                              <IconButton onClick={this.onSendMessage} disabled={this.state.content == '' ? true : false}>
                                <SendIcon />
                              </IconButton>
                            </InputAdornment>,
                        }} />
                    </MuiThemeProvider>
                  </div>
                  :
                  <div className={classes.chatBottom}>
                    <Typography className={classes.servicerNotify}>
                      {this.state.topic && this.state.topic.ServicerID == null
                        ? 'Khách hàng chưa được ai phụ trách'
                        : 'Khách hàng đã có người phụ trách'
                      }
                    </Typography>
                    {this.state.topic && this.state.topic.ServicerID == null
                      ?
                      <MuiThemeProvider theme={theme}>
                        <Button variant="contained" color="primary" className={classes.button} onClick={() => this.onAcceptClick(this.state.topic)}>
                          Chấp nhận
                      </Button>
                      </MuiThemeProvider>
                      : null}
                  </div>
                }
              </div>
            </GridItemChat>

            <GridItemChat xs={0} sm={0} md={3}>
              <Hidden smDown implementation="css">
                <div className={classes.right}>
                  <Typography style={{ fontFamily: 'Roboto-Regular', fontSize: 20, textAlign: 'center', paddingTop: 10 }}> Thông tin khách hàng </Typography>
                  <TextField
                    disabled
                    id="visitor"
                    label="Tên khách hàng"
                    className={classes.textField}
                    value={this.state.visitor ? this.state.visitor.Name : ''}
                    onChange={this.handleChange}
                    margin="normal"
                    variant="outlined"
                  />
                  <MuiThemeProvider theme={theme}>
                    <TextField
                      id="email"
                      label="Email"
                      className={classes.textField}
                      value={this.state.visitor ? this.state.visitor.Email : ''}
                      onChange={this.handleChange}
                      margin="normal"
                      variant="outlined"
                    />
                  </MuiThemeProvider>

                  <MuiThemeProvider theme={theme}>
                    <TextField
                      id="phoneNumber"
                      label="Số điện thoại"
                      className={classes.textField}
                      value={this.state.visitor ? this.state.visitor.PhoneNumber : ''}
                      onChange={this.handleChange}
                      margin="normal"
                      variant="outlined"
                    />
                  </MuiThemeProvider>
                  <MuiThemeProvider theme={theme}>
                    <TextField
                      multiline
                      rows="4"
                      id="note"
                      label="Ghi chú"
                      className={classes.textField}
                      value={this.state.visitor ? this.state.visitor.Notes : ''}
                      onChange={this.handleChange}
                      margin="normal"
                      variant="outlined"
                    />
                  </MuiThemeProvider>
                  {this.state.topic && this.state.topic.ServicerID == this.props.userProfile.UserID
                    ?
                    <MuiThemeProvider theme={theme}>
                      <Button variant="contained" color="primary" className={classes.button} onClick={() => this.onUpdateVisitorInfo(this.state.visitor)}>
                        Cập nhật
                  </Button>
                    </MuiThemeProvider>
                    : null}
                  <Typography style={{ textAlign: 'center', color: this.state.notifyUpdateVisitor && this.state.notifyUpdateVisitor.returnCode == 1 ? 'green' : 'red' }}>{this.state.notifyUpdateVisitor && this.state.notifyUpdateVisitor.message}</Typography>
                </div>
              </Hidden>
            </GridItemChat>
          </GridContainer>
        </div>
        : null
    );
  }
}

const styles = theme => ({
  grid: {
    padding: '0 !important',
  },
  servicerNotify: {
    fontFamily: 'Roboto-Regular',
    textAlign: 'center',
    color: '#00bcd4',
    fontSize: 15,
  },
  chatBottom: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    margin: 10,
    color: '#FFF'
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  root: {
    width: '95%',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block'
  },
  menuItem: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& $primary': {
        color: theme.palette.common.white,
      },
    },
  },
  primary: {},
  left: {
    border: '1px solid #e6e6e6',
    height: '608px',
    overflow: 'auto',
  },
  center: {
    border: '1px solid #e6e6e6',
    height: '608px',
  },
  right: {
    border: '1px solid #e6e6e6',
    height: '608px',
    display: 'flex',
    flexDirection: 'column',
  },
  chat: {
    height: '490px',
    width: '100%',
    overflow: 'auto',
    marginBottom: 10,
  },
  img: {
    borderRadius: '20px',
    width: '40px',
    height: '40px',
  },
  top: {
    height: '21px',
    paddingTop: '15px',
    paddingBottom: '15px',
    paddingLeft: '29px',
    backgroundColor: '#eceff1',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  chatTextField: {
    width: '100%',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  bubble_y: {
    fontSize: "16px",
    position: "relative",
    display: "inline-block",
    padding: "10px",
    borderRadius: "5px",
    border: '1px solid #eaeaeb',
    minWidth: '20%',
    maxWidth: '70%',
    marginLeft: '10px',
    marginTop: '10px',
  },

  bubble_m: {
    fontSize: "16px",
    display: "inline-block",
    padding: "10px",
    borderRadius: "5px",
    border: '1px solid #00b0ff',
    backgroundColor: "#00b0ff",
    minWidth: '20%',
    maxWidth: '70%',
    marginRight: '10px',
    marginTop: '10px',
    float: 'right',
  },

  b_you: {
    maxWidth: '100%',
    color: "#fff",
    alignSelf: 'flex-start',
  },
  b_me: {
    float: 'right',
    color: "#1a1a1a",
    maxWidth: '100%',
    backgroundColor: "#eceff1",
    alignSelf: "flex-end",
  },
  list: {
    width: '200px'
  },
});

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00bcd4',
    },
    secondary: green
  },
  typography: {
    useNextVariants: true,
  },
});


const mapStateToProps = state => {
  return {
    userProfile: state.user.profile,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    doSeenMessage: (topicID) => dispatch(seenMessage(topicID)),
    doUpdateUnreadMessageCount: (topicID, unreadCount) => dispatch(updateUnreadMessageCount(topicID, unreadCount)),
    doGetListTopic: () => dispatch(getListTopic()),
    doGetTopic: (topicID) => dispatch(getTopic(topicID)),
    doGetVisitorInfo: (visitorID) => dispatch(getVisitorInfo(visitorID)),
    doGetListUser: () => dispatch(getListUser()),
    doUpdateVisitorInfo: (visitorID, email, notes, phoneNumber) => dispatch(updateVisitorInfo(visitorID, email, notes, phoneNumber)),
    doTransferTopic: (topicID, servicerID) => dispatch(transferTopic(topicID, servicerID)),
  };
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(LiveChat));
