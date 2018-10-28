import React from "react";
import PropTypes from "prop-types";
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import GridContainer from "./../../components/Grid/GridContainer";
import GridItem from "./../../components/Grid/GridItem";
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SendIcon from '@material-ui/icons/Send';
import AttachmentIcon from '@material-ui/icons/Attachment';
import { IconButton } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import avatar from "assets/img/avatar.png";
import Hidden from "@material-ui/core/Hidden";
import Drawer from '@material-ui/core/Drawer';
import AccountIcon from '@material-ui/icons/AccountCircle';

const ListUser = [
  { imgSrc: avatar, name: "Hao Luong" },
  { imgSrc: avatar, name: "Hao Luong" },
  { imgSrc: avatar, name: "Hao Luong" },
  { imgSrc: avatar, name: "Hao Luong" },
  { imgSrc: avatar, name: "Hao Luong" },
  { imgSrc: avatar, name: "Hao Luong" },
  { imgSrc: avatar, name: "Hao Luong" },
  { imgSrc: avatar, name: "Hao Luong" },
  { imgSrc: avatar, name: "Hao Luong" },
  { imgSrc: avatar, name: "Hao Luong" },
  { imgSrc: avatar, name: "Hao Luong" },
  { imgSrc: avatar, name: "Hao Luong" },
  { imgSrc: avatar, name: "Hao Luong" },
  { imgSrc: avatar, name: "Hao Luong" },
  { imgSrc: avatar, name: "Hao Luong" },
];
const img_me = "https://i.imgur.com/p9bwTYj.png";

class LiveChat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      right: false,
    };
  }
  componentDidMount() {
    const ps = new PerfectScrollbar(this.refs.left);
    const ps2 = new PerfectScrollbar(this.refs.chat);
  }
  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };
  render() {
    const { classes } = this.props;
    const sideList = (
      <div className={classes.list}>
        <MenuList>
                  {ListUser.map((item, key) => (
                    <MenuItem className={classes.menuItem} key={key}>
                      <Avatar className={classes.img}
                        src={item.imgSrc} />
                      <ListItemText classes={{ primary: classes.primary }}
                        inset primary={item.name} />
                    </MenuItem>
                  ))}

                </MenuList>
      </div>
    );
    return (
      <div className={classes.root}>
        <Hidden smDown implementation="css">
          <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
              <div className={classes.left} ref="left">
                <MenuList>
                  {ListUser.map((item, key) => (
                    <MenuItem className={classes.menuItem} key={key}>
                      <Avatar className={classes.img}
                        src={item.imgSrc} />
                      <ListItemText classes={{ primary: classes.primary }}
                        inset primary={item.name} />
                    </MenuItem>
                  ))}

                </MenuList>
              </div>
            </GridItem>
            <GridItem xs={12} sm={12} md={7} style={{ marginLeft: -30 }}>
              <div className={classes.right}>
                <div className={classes.top}>
                  To: Hello World
        </div>
                <div className={classes.chat} ref="chat">
                  <div style={{ clear: 'both' }}>
                    <Avatar src={img_me}
                      className={classes.img_y} />
                    <div className={classes.bubble_y}>
                      <div className={classes.b_you}>
                        Hello gahote ashsw dwisdn sad dwd
                  </div>
                    </div>
                  </div>
                  <div style={{ clear: 'both' }}>

                    <Avatar src={avatar}
                      className={classes.img_m} />
                    <div className={classes.bubble_m}>
                      <div className={classes.me}>
                        Hello
                </div>
                    </div>
                  </div>
                </div>
                <div className={classes.write}>
                  <TextField
                    id="outlined-bare"
                    className={classes.textField}
                    variant="outlined"
                    InputProps={{
                      endAdornment: <InputAdornment position="end">
                        <IconButton>
                          <AttachmentIcon />
                        </IconButton>
                        <IconButton>
                          <SendIcon />
                        </IconButton>
                      </InputAdornment>,
                    }}
                  />
                </div>
              </div>
            </GridItem>
          </GridContainer>
        </Hidden>
        <div className={classes.navIconHide}>

          <IconButton
            buttonRef={node => {
              this.anchorEl = node;
            }}
            aria-owns={this.state.open ? 'menu-list-grow' : null}
            aria-haspopup="true"
            onClick={this.toggleDrawer('right', true)}
            className={classes.navIconHide}
            style={{ float: 'right', marginTop: 3 }}
          >
            <AccountIcon />
          </IconButton>
          <div className={classes.right}>
            <div className={classes.top}>
              To: Hello World
        </div>
            <div className={classes.chat} ref="chat">
              <div style={{ clear: 'both' }}>
                <Avatar src={img_me}
                  className={classes.img_y} />
                <div className={classes.bubble_y}>
                  <div className={classes.b_you}>
                    Hello gahote ashsw dwisdn sad dwd
                  </div>
                </div>
              </div>
              <div style={{ clear: 'both' }}>
                <Avatar src={avatar}
                  className={classes.img_m} />
                <div className={classes.bubble_m}>
                  <div className={classes.me}>
                    Hello
                </div>
                </div>
              </div>
            </div>
            <div className={classes.write}>
              <TextField
                id="outlined-bare"
                className={classes.textField}
                variant="outlined"
                InputProps={{
                  endAdornment: <InputAdornment position="end">
                    <IconButton>
                      <AttachmentIcon />
                    </IconButton>
                    <IconButton>
                      <SendIcon />
                    </IconButton>
                  </InputAdornment>,
                }}
              />
            </div>
          </div>
        </div>

        <Drawer anchor="right" open={this.state.right} onClose={this.toggleDrawer('right', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('right', false)}
            onKeyDown={this.toggleDrawer('right', false)}
          >
            {sideList}
          </div>
        </Drawer>

      </div>
    );
  }
}
const styles = theme => ({
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  root: {
    width: '95%',
    marginLeft: 'auto',
    marginRight: 'auto',
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
    height: '508px',
    overflow: 'auto'
  },
  right: {
    border: '1px solid #e6e6e6',
    height: '508px',

  },
  img: {
    borderRadius: '50%',
    width: '13%',
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
  },
  textField: {
    width: 'calc(100% - 58px)',
    height: '46px',
  },
  write: {
    marginLeft: '24px',
    height: '48px',
  },
  chat: {
    height: '400px',
    width: '100%',
  },
  bubble_y: {
    fontSize: "16px",
    position: "relative",
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
    wordWrap: 'break-word',
  },

  bubble_m: {
    fontSize: "16px",
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
  }
});
export default withStyles(styles)(LiveChat);
