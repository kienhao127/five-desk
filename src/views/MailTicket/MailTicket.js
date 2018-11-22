import React from "react";
import { Link, Route, Switch } from 'react-router-dom'
import PropTypes from "prop-types";
import { connect } from "react-redux";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { ListItemSecondaryAction, Typography } from "@material-ui/core";
import { getNotCloseByUserID, getUnassignedTicket, getAllNotClose, getNewSticket, getPendingSticket, getClosedSticket, getDeletedSticket, deleteMail, selectedMail, countQuantityMail } from "../../store/actions/mail";

import { ToastContainer, ToastStore } from 'react-toasts';
import NewMailTicket from 'views/MailTicket/NewMailTicket';
import { get } from "https";

//Socket
import io from 'socket.io-client';
const socket = io('https://fivedesk.herokuapp.com')

const tableHead = [
  { id: 'status', lable: '' },
  { id: 'subject', label: 'Chủ đề' },
  { id: 'requester', label: 'Người yêu cầu' },
  { id: 'requestTime', label: 'Thời gian' },
  { id: 'type', label: 'Loại' },
  { id: 'priority', label: 'Độ ưu tiên' },
];

let tableData = [
]

class MailTicket extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedTicketFilterButton: 0,
      tableTitle: 'Ticket chưa giải quyết của bạn',
      tableTitleSecondary: 0 + ' tickets',
      menuItems: [
        { content: "Ticket chưa giải quyết của bạn", number: 0 },
        { content: "Ticket chưa chuyển nhượng", number: 0 },
        { content: "Tất cả ticket chưa giải quyết", number: 0 },
        { content: "Ticket mới", number: 0 },
        { content: "Ticket chờ duyệt", number: 0 },
        { content: "Ticket đã hoàn tất", number: 0 },
        { content: "Ticket đã xóa", number: 0 },],
    };

    socket.on('incomingMail', this.onReceiveMessage);
  }

  onReceiveMessage = () => {
    console.log('socket incoming mail');
    var token = sessionStorage.getItem('token');
    this.props.doCountQuantityMail(token)
      .then(resJson => {
        this.setState({
          menuItems: resJson.countMail,
        })
        this.getListByKey(this.state.selectedTicketFilterButton, this.state.menuItems[this.state.selectedTicketFilterButton])
      })
      .catch(error => {

      })
  }

  convertData(name, mail) {
    var listItem = [];
    for (var i = 0; i < mail.length; i++) {
      listItem.push({
        id: mail[i].MailId,
        subject: mail[i].Subject,
        requester: mail[i].Request,
        requestTime: mail[i].UpdateTime,
        type: mail[i].MailType,
        priority: mail[i].Priority,
        status: mail[i].Status
      })
    }
    return listItem;
  }
  setStateUpdate(key, item) {
    this.setState({
      selectedTicketFilterButton: key,
      tableTitle: item.content,
      tableTitleSecondary: item.number + ' tickets',
    });
  }
  getListByKey(key, item) {
    var UserId = this.state.userID;
    var token = sessionStorage.getItem('token');
    if (key == 0) {
      this.props.doGetNotCloseByUserID(token).then((resJson) => {
        tableData = this.convertData('open', resJson.mail);
        this.setStateUpdate(key, item);
      })
        .catch(error => {
          console.log(error);
        });
    } else if (key == 1) {
      this.props.doGetUnassignedTicket(token).then((resJson) => {
        tableData = this.convertData('new', resJson.mail);
        console.log(tableData);
        this.setStateUpdate(key, item);
      })
        .catch(error => {
          console.log(error);
        });
    } else if (key == 2) {
      this.props.doGetAllNotClose(token).then((resJson) => {
        tableData = this.convertData('open', resJson.mail);
        this.setStateUpdate(key, item);
      })
        .catch(error => {
          console.log(error);
        });
    } else if (key == 3) {
      this.props.doGetNewTicket(token).then((resJson) => {
        tableData = this.convertData('new', resJson.mail);
        this.setStateUpdate(key, item);
      })

        .catch(error => {
          console.log(error);
        });
    } else if (key == 4) {
      this.props.doGetPendingTicket(token).then((resJson) => {
        tableData = this.convertData('pending', resJson.mail);
        this.setStateUpdate(key, item);

      })
        .catch(error => {
          console.log(error);
        });
    } else if (key == 5) {
      this.props.doGetClosedSticket(token).then((resJson) => {
        tableData = this.convertData('solved', resJson.mail);
        this.setStateUpdate(key, item);
      })
        .catch(error => {
          console.log(error);
        });
    } else if (key == 6) {
      this.props.doGetDeletedSticket(token).then((resJson) => {
        tableData = this.convertData('delete', resJson.mail);
        this.setStateUpdate(key, item);
      })
        .catch(error => {
          console.log(error);
        });
    }
  }

  componentDidMount() {
    var token = sessionStorage.getItem('token');
    this.props.doCountQuantityMail(token)
      .then(resJson => {
        this.setState({
          menuItems: resJson.countMail,
        })
        this.props.doGetNotCloseByUserID(token)
        .then((value) => {
          tableData = this.convertData('open', value.mail);
          this.setStateUpdate(0, resJson.countMail[0]);
        })
        .catch(error => {
          console.log(error);
        });
      })
      .catch(error => {

      })
  }


  onTicketFilterClick = (key, item) => {
    this.getListByKey(key, item);
  }


  render() {
    const { classes } = this.props;
    return (
      <GridContainer className={classes.gridContainer}>
        <ToastContainer position={ToastContainer.POSITION.BOTTOM_LEFT} store={ToastStore} />
        <GridItem xs={12} sm={3} md={3} >
          <List dense={true}>
            {this.state.menuItems.map((item, key) => (
              <ListItem
                key={key}
                role={undefined}
                dense
                button
                selected={this.state.selectedTicketFilterButton === key ? true : false}
                onClick={() => this.onTicketFilterClick(key, item)}
                className={classes.listItem}>
                <ListItemText
                  primary={item.content}
                />
                <ListItemSecondaryAction>
                  <Typography>{item.number}</Typography>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </GridItem>
        <GridItem xs={12} sm={9} md={9} className={classes.tableGridItem}>
          <Table
            tableTitle={this.state.tableTitle}
            tableTitleSecondary={this.state.tableTitleSecondary}
            tableHead={tableHead}
            tableData={tableData}
          />
        </GridItem>
      </GridContainer>
    );
  }
}

const styles = {
  gridContainer: {
  },
  listItem: {
    margin: ' 0px 15px',
  },
};
const mapStateToProps = state => {
  return {
    userProfile: state.user.profile,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    doGetNotCloseByUserID: (token) => dispatch(getNotCloseByUserID(token)),
    doGetUnassignedTicket: (token) => dispatch(getUnassignedTicket(token)),
    doGetAllNotClose: (token) => dispatch(getAllNotClose(token)),
    doGetNewTicket: (token) => dispatch(getNewSticket(token)),
    doGetPendingTicket: (token) => dispatch(getPendingSticket(token)),
    doGetClosedSticket: (token) => dispatch(getClosedSticket(token)),
    doGetDeletedSticket: (token) => dispatch(getDeletedSticket(token)),
    doCountQuantityMail: (token) => dispatch(countQuantityMail(token)),
  };
};
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(MailTicket));
