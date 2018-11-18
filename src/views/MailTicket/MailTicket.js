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
import { getNotCloseByUserID, getUnassignedTicket, getAllNotClose, getNewSticket,getPendingSticket,getClosedSticket,getDeletedSticket} from "../../store/actions/mail";

import NewMailTicket from 'views/MailTicket/NewMailTicket';
import { get } from "https";

const menuItems = [ 
  {path: '/yourunsolvedtickets', content: "Ticket chưa giải quyết của bạn", number: 0}, 
  {path: '/unassignedtickets', content: "Ticket chưa chuyển nhượng", number: 0},
  {path: '/allunsolvedtickets', content: "Tất cả ticket chưa giải quyết", number: 0},
  {path: '/newtickets', content: "Ticket mới", number: 0}, 
  {path: '/pendingtickets', content: "Ticket chờ duyệt", number: 0},
  {path: '/solvedtickets', content: "Ticket đã hoàn tất", number: 0},
  {path: '/unsolvedtickets', content: "Ticket chưa hoàn tất", number: 0}, 
  {path: '/deletedtickets', content: "Ticket đã xóa", number: 0},
];

const tableHead = [
  { id: 'status', lable: ''},
  { id: 'subject', label: 'Chủ đề' },
  { id: 'requester', label: 'Người yêu cầu' },
  { id: 'requestTime', label: 'Thời gian' },
  { id: 'type', label: 'Loại'},
  { id: 'priority', label: 'Độ ưu tiên' },
  { id: 'assignee', label: 'Chuyển nhượng' },
];

let tableData =[
]

class MailTicket extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      selectedTicketFilterButton: 0,
      tableTitle: menuItems[0].content,
      tableTitleSecondary: menuItems[0].number + ' tickets',
      
    };
  }
  getTypeID(TypeID){
    var typeName = '';
    if(TypeID == 0){

    }
    if(TypeID == 1){
      typeName = 'Câu hỏi'
    }
    return typeName;

  }
  getPriorityID(PriorityId){
    var  PriorityName = '';
    if(PriorityId == 0){

    }
    if(PriorityId == 1){
      PriorityName = 'Bình thường'
    }
    return PriorityName;

  }
  convertData(name, mail){
    var listItem = [];
    for (var i = 0; i < mail.length; i++) {
      listItem.push(  {id: 1, status: name, 
      subject: mail[i].Subject, 
      requester: mail[i].Request, 
      requestTime: mail[i].UpdateTime, 
      type: this.getTypeID(mail[i].TypeID), 
      priority: this.getPriorityID(mail[i].PriorityId), 
      assignee:  mail[i].ReplyTo},
      )
  }
    return listItem;
  }
  setStateUpdate(key, item){
    this.setState({
      selectedTicketFilterButton: key,
      tableTitle: item.content,
      tableTitleSecondary: item.number + ' tickets',
    });
  }
  getListByKey(key, item){
      if(key == 0){
        this.props.doGetNotCloseByUserID(this.state.userID).then((resJson) => {
          tableData = this.convertData('notclose',resJson.mail);
          menuItems[0].number  =  resJson.mail.length;
          this.setStateUpdate(key, item);
        })
        .catch(error => {
          console.log(error);
        }) ; 
      }else if(key == 1){
        this.props.doGetUnassignedTicket(this.state.userID).then((resJson) => {
          menuItems[1].number  =  resJson.mail.length;
          tableData = this.convertData('unassign',resJson.mail);
          console.log( tableData);
          this.setStateUpdate(key, item);
        })
        .catch(error => {
          console.log(error);
        }) ; 
      }else if(key == 2){
        this.props.doGetAllNotClose(this.state.userID).then((resJson) => {
          tableData = this.convertData('notclose',resJson.mail);
          menuItems[2].number  =  resJson.mail.length;
          this.setStateUpdate(key, item);
        })
        .catch(error => {
          console.log(error);
        }) ; 
      }else if(key == 3){
        this.props.doGetNewTicket(this.state.userID).then((resJson) => {
          tableData = this.convertData('new',resJson.mail);
          menuItems[3].number  =  resJson.mail.length;
          this.setStateUpdate(key, item);
        })
        
        .catch(error => {
          console.log(error);
        }) ;
      }else if(key == 4){
        this.props.doGetPendingTicket(this.state.userID).then((resJson) => {
          tableData = this.convertData('pending',resJson.mail);
          menuItems[4].number  =  resJson.mail.length;
          this.setStateUpdate(key, item);
    
        })
        .catch(error => {
          console.log(error);
        }) ;  
      }else if(key == 5){
        this.props.doGetClosedSticket(this.state.userID).then((resJson) => {
          menuItems[5].number  =  resJson.mail.length;
          tableData = this.convertData('close',resJson.mail);
          this.setStateUpdate(key, item);
        })
        .catch(error => {
          console.log(error);
        }) ; 
      }else if(key == 6){
      }else if(key == 7){
        this.props.doGetDeletedSticket(this.state.userID).then((resJson) => {
          tableData = this.convertData('delete',resJson.mail);
          menuItems[7].number  =  resJson.mail.length;
          this.setStateUpdate(key, item);
        })
        .catch(error => {
          console.log(error);
        }) ;
      }
  }
  componentDidMount(){
        this.props.doGetNotCloseByUserID(this.state.userID).then((resJson) => {
          console.log('doGetNotCloseByUserID' + resJson);
          tableData = this.convertData('new',resJson.mail);
          menuItems[0].number  =  resJson.mail.length;
        })
        .catch(error => {
          console.log(error);
        }) ; 
        this.props.doGetUnassignedTicket(this.state.userID).then((resJson) => {
          menuItems[1].number  =  resJson.mail.length;
        })
        .catch(error => {
          console.log(error);
        }) ; 
        this.props.doGetAllNotClose(this.state.userID).then((resJson) => {
          menuItems[2].number  =  resJson.mail.length;
        })
        .catch(error => {
          console.log(error);
        }) ; 
        this.props.doGetNewTicket(this.state.userID).then((resJson) => {
          menuItems[3].number  =  resJson.mail.length;
        })
        
        .catch(error => {
          console.log(error);
        }) ;
        this.props.doGetPendingTicket(this.state.userID).then((resJson) => {
          menuItems[4].number  =  resJson.mail.length;
    
        })
        .catch(error => {
          console.log(error);
        }) ;  
        this.props.doGetClosedSticket(this.state.userID).then((resJson) => {
          menuItems[5].number  =  resJson.mail.length;
        })
        .catch(error => {
          console.log(error);
        }) ; 
        this.props.doGetDeletedSticket(this.state.userID).then((resJson) => {
          menuItems[7].number  =  resJson.mail.length;
        })
        .catch(error => {
          console.log(error);
        }) ;
      
  }
  

  onTicketFilterClick = (key, item) => {
    this.getListByKey(key,item);
  }

 
  render() {
    const {classes} = this.props;
    return (
      <GridContainer className={classes.gridContainer}>
        <GridItem xs={12} sm={3} md={3} >
          <List dense={true}>
            {menuItems.map((item, key) => (
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
  gridContainer:{
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
    doGetNotCloseByUserID: (UserId) => dispatch(getNotCloseByUserID(UserId)),
    doGetUnassignedTicket: () => dispatch(getUnassignedTicket()),
    doGetAllNotClose : () => dispatch(getAllNotClose()),
    doGetNewTicket: () => dispatch(getNewSticket()),
    doGetPendingTicket: () => dispatch(getPendingSticket()),
    doGetClosedSticket: () => dispatch(getClosedSticket()),
    doGetDeletedSticket: () => dispatch(getDeletedSticket()),

  };
};
export default withStyles(styles)(connect( mapStateToProps ,mapDispatchToProps)(MailTicket));
