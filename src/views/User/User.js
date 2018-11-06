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

class User extends React.Component {

  constructor(props) {
    super(props);

    this.state = {

    };

  }

  componentDidMount() {
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
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
                  {menuItems.map((item, key) => (
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

export default withStyles(styles)(User);
