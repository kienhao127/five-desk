import React from "react";
import PropTypes from "prop-types";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { ListItemSecondaryAction, Typography } from "@material-ui/core";
import Avatar from '@material-ui/core/Avatar';
import { Button } from "@material-ui/core";
import { loadUserFromToken, getListUser } from "../../store/actions/user";
import { connect } from "react-redux";

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

var realList = [];

const menuItems2 = [
  { imgSrc: avatar, name: "Hao Luong", editText: "Chỉnh sửa" },
  { imgSrc: avatar, name: "Luong Hao", editText: "Chỉnh sửa" }
];

class User extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      listUser: null,
    };

  }

  componentDidMount() {
    this.props.doGetListUser()
      .then((resJson) => {
        console.log('doGetListUser111111');
        console.log(resJson);
        //console.log(resJson.users[0].UserID);
        var i;

        for (i = 0; i < resJson.users.length; i++) {
          realList.push({ imgSrc: resJson.users[i].Avatar, name: resJson.users[i].FirstName + " " + resJson.users[i].LastName, editText: "Chỉnh sửa" });
        }
        console.log(realList);
        this.setState({
          listUser: resJson.users,
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button>
          a
        </Button>
        <GridContainer spacing={24}>
          <GridItem xs={6}>
            <div className={classes.gridItem}>
              <div>
                <Typography component="h3" variant="2" gutterBottom className={classes.title}>
                  Thành viên (2/20)
              </Typography>
              </div>
              <div>
                <List dense={true}>
                  {realList.map((item, key) => (
                    <ListItem key={key} role={undefined} dense button className={classes.listItem}>
                      <Avatar alt="Thành viên" src={item.imgSrc} />
                      <ListItemText primary={item.name} secondary={item.editText}></ListItemText>
                    </ListItem>
                  ))}
                </List>
              </div>
            </div>
          </GridItem>

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
        </GridContainer>
      </div>
    );
  }
}

const styles = {
  gridItem: {
    overflow: "auto",
    height: "85vh",
  },
  title: {
    fontWeight: "bold",
    color: "#47525E",
    paddingLeft: "20px",
  },

}

const mapStateToProps = state => {
  return {
    userProfile: state.user.profile,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadUserFromToken: () => dispatch(loadUserFromToken()),
    doGetListUser: () => dispatch(getListUser()),
  };
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(User));