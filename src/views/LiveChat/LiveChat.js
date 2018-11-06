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
import { IconButton, Typography } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import avatar from "assets/img/avatar.png";
import Button from "@material-ui/core/Button";
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Transfer from '@material-ui/icons/TransferWithinAStation';
import green from '@material-ui/core/colors/green';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { connect } from "react-redux";
import { getListTopic, getTopic } from "../../store/actions/chat";
import HyperText from "../../components/HyperLink/HyperLink";
import ScrollToBottom from 'react-scroll-to-bottom';
import Tooltip from '@material-ui/core/Tooltip';
import * as moment from 'moment';
import 'moment/locale/vi';
import SkyLight from 'react-skylight';
import { getVisitorInfo } from "../../store/actions/visitor";

moment.locale('vi');
const img_me = "https://i.imgur.com/p9bwTYj.png";

class LiveChat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      right: false,
      selectedVisitor: 0,
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
    };
  }

  componentDidMount() {
    console.log(this.props.userProfile);

    this.props.doGetListTopic(1)
      .then((resJson) => {
        console.log('resJson');
        console.log(resJson);
        this.setState({
          listTopic: resJson.listTopic,
        })
        this.onTopicClick(resJson.listTopic[0], 0);
      })
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
      selectedVisitor: index
    })
    console.log('TopicID: ' + topic.TopicID)
    this.props.doGetTopic(topic.TopicID)
      .then((resJson) => {
        console.log('set state');
        this.setState({
          listMessage: resJson.topic,
        })
      })
    this.props.doGetVisitorInfo(topic.TopicID)
      .then((resJson) => {
        console.log(resJson);
        this.setState({
          visitor: resJson.visitor
        })
      })

    if (topic.ServicerID == 2) {
      //gọi api update UnreadMessageCount = 0
    }
  }

  onAcceptClick = (topic) => {
    //gọi api update serviverID
    //Chấp nhận tin nhắn
  }

  onTransferClick = (topic) => {
    //gọi api danh sách user
    this.refs.listUserDialog.show();
  }


  componentDidUpdate() {
  }

  handleChange = (event) => {
    if (event.target != undefined){
      var visitor = this.state.visitor
      if (event.target.id == "email"){
        visitor.Email = event.target.value
      }
      if (event.target.id == "phoneNumber"){
        visitor.PhoneNumber = event.target.value
      }
      if (event.target.id == "note"){
        visitor.Notes = event.target.value
      }
      this.setState({
        visitor: visitor
      })
    }
  };

  onUpdateVisitorInfo = (visitor) => {
    //gọi api update visitor info
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <SkyLight hideOnOverlayClicked ref="listUserDialog">
          <Button onClick={() => this.refs.listUserDialog.hide()}>
            Ẩn dialog
        </Button>
        </SkyLight>
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
                    selected={this.state.selectedVisitor === key ? true : false}
                    onClick={() => this.onTopicClick(item, key)}
                    className={classes.listItem}>
                    <Avatar className={classes.img} src={avatar} />
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
                {this.state.topic && this.state.topic.ServicerID == 2
                  ?
                  <MuiThemeProvider theme={theme}>
                    <Tooltip title="Chuyển tin nhắn" placement='top'>
                      <IconButton variant="contained" color="primary" style={{ marginLeft: 'auto', marginRight: 10, alignItems: 'center', justifyContent: 'center' }} onClick={() => this.onTransferClick(this.state.topic)}>
                        <Transfer style={{ color: '#000' }} />
                      </IconButton>
                    </Tooltip>
                  </MuiThemeProvider>
                  : null}
              </div>
              <ScrollToBottom className={classes.chat} ref={(ref) => this.messageList = ref} >
                {this.state.listMessage && this.state.listMessage.map((message, index) => {
                  return (
                    isNaN(message.SenderID)
                      ?
                      <div style={{ clear: 'both' }} key={index}>
                        <Avatar src={avatar} className={classes.img_y} />
                        <Tooltip title={moment(message.SendTime).calendar()} placement="right">
                          <div className={classes.bubble_y}>
                            <div className={classes.b_you}>
                              <HyperText me={false} content={message.Content} />
                            </div>
                          </div>
                        </Tooltip>
                      </div>
                      :
                      <div style={{ clear: 'both' }} key={index}>
                        <Avatar src={img_me} className={classes.img_m} />
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
              {this.state.topic && this.state.topic.ServicerID == 2
                ?
                <div className={classes.chatBottom}>
                  <TextField
                    id="outlined-bare"
                    className={classes.chatTextField}
                    variant="outlined"
                    InputProps={{
                      endAdornment:
                        <InputAdornment position="end">
                          <IconButton>
                            <AttachmentIcon />
                          </IconButton>
                          <IconButton>
                            <SendIcon />
                          </IconButton>
                        </InputAdornment>,
                    }} />
                </div>
                :
                <div className={classes.chatBottom}>
                  <Typography className={classes.servicerNotify}>
                    Khách hàng không do bạn phụ trách
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
                <Typography style={{fontFamily: 'Roboto-Regular', fontSize: 20, textAlign: 'center'}}> Thông tin khách hàng </Typography>
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
                
                <TextField
                  id="phoneNumber"
                  label="Số điện thoại"
                  className={classes.textField}
                  value={this.state.visitor ? this.state.visitor.PhoneNumber : ''}
                  onChange={this.handleChange}
                  margin="normal"
                  variant="outlined"
                />
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
                <MuiThemeProvider theme={theme}>
                  <Button variant="contained" color="primary" className={classes.button} onClick={() => this.onUpdateVisitorInfo(this.state.visitor)}>
                    Cập nhật
                  </Button>
                </MuiThemeProvider>
              </div>
            </Hidden>
          </GridItemChat>
        </GridContainer>
      </div>
    );
  }
}

const styles = theme => ({
  grid:{
    padding: '0 !important',
  },
  servicerNotify: {
    fontFamily: 'Roboto-Regular',
    textAlign: 'center',
    color: '#00bcd4',
    fontSize: 20,
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
    padding: 10
  },
  chat: {
    height: '500px',
    width: '100%',
    overflow: 'auto'
  },
  img: {
    borderRadius: '20px',
    width: '40px',
    height: '40px',
  },
  img_y: {
    borderRadius: '50%',
    marginLeft: '10px',
    display: 'inline-block',
    marginTop: '23px',
    marginRight: '-5px',
  },
  img_m: {
    borderRadius: '50%',
    marginTop: '23px',
    marginRight: '5px',
    marginLeft: '-10px',
    float: 'right',
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
  write: {
    height: '48px',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  bubble_y: {
    fontSize: "16px",
    position: "relative",
    display: "inline-block",
    marginBottom: "8px",
    padding: "13px 14px",
    verticalAlign: "top",
    borderRadius: "5px",
    border: '1px solid #eaeaeb',
    backgroundColor: "#eaeaeb",
    minWidth: '20%',
    maxWidth: '90%',
    marginLeft: '15px',
    marginTop: '20px',
    wordWrap: 'break-word',
  },

  bubble_m: {
    fontSize: "16px",
    display: "inline-block",
    marginBottom: "8px",
    padding: "13px 14px",
    verticalAlign: "top",
    borderRadius: "5px",
    border: '1px solid #00b0ff',
    backgroundColor: "#00b0ff",
    minWidth: '20%',
    maxWidth: '90%',
    marginLeft: '15px',
    marginTop: '20px',
    marginRight: '15px',
    wordWrap: 'break-word',
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
    doGetListTopic: (companyID) => dispatch(getListTopic(companyID)),
    doGetTopic: (topicID) => dispatch(getTopic(topicID)),
    doGetVisitorInfo: (visitorID) => dispatch(getVisitorInfo(visitorID)),
  };
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(LiveChat));
