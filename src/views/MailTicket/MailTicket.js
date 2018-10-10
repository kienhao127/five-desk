import React from "react";
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

const menuItems = [ 
  {path: '/yourunsolved', content: "Your unsolved tickets", number: 0}, 
  {path: '/unassigned', content: "Unassigned tickets", number: 2},
  {path: '/allunsolved', content: "All unsolved tickets", number: 5},
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

const tableData =[
  {id: 1, status: 'new', subject: "Tiêu đề của mail", requester: "Tên người gửi", requestTime: "01/01/2018", type: "Câu hỏi", priority: "Bình thường", assignee: 'Lương Kiên Hào'},
  {id: 2, status: 'pending', subject: "Tiêu đề của mail", requester: "Tên người gửi", requestTime: "01/01/2018", type: "Câu hỏi", priority: "Bình thường", assignee: 'Lương Kiên Hào'},
  {id: 3, status: 'open', subject: "Tiêu đề của mail", requester: "Tên người gửi", requestTime: "01/01/2018", type: "Câu hỏi", priority: "Bình thường", assignee: 'Lương Kiên Hào'},
  {id: 4, status: 'solved', subject: "Tiêu đề của mail", requester: "Tên người gửi", requestTime: "01/01/2018", type: "Câu hỏi", priority: "Bình thường", assignee: 'Lương Kiên Hào'},
  {id: 5, status: 'new', subject: "Tiêu đề của mail", requester: "Tên người gửi", requestTime: "01/01/2018", type: "Câu hỏi", priority: "Bình thường", assignee: 'Lương Kiên Hào'},
  {id: 6, status: 'pending', subject: "Tiêu đề của mail", requester: "Tên người gửi", requestTime: "01/01/2018", type: "Câu hỏi", priority: "Bình thường", assignee: 'Lương Kiên Hào'},
  {id: 7, status: 'open', subject: "Tiêu đề của mail", requester: "Tên người gửi", requestTime: "01/01/2018", type: "Câu hỏi", priority: "Bình thường", assignee: 'Lương Kiên Hào'},
  {id: 8, status: 'solved', subject: "Tiêu đề của mail", requester: "Tên người gửi", requestTime: "01/01/2018", type: "Câu hỏi", priority: "Bình thường", assignee: 'Lương Kiên Hào'},
  {id: 9, status: 'new', subject: "Tiêu đề của mail", requester: "Tên người gửi", requestTime: "01/01/2018", type: "Câu hỏi", priority: "Bình thường", assignee: 'Lương Kiên Hào'},
  {id: 10, status: 'pending', subject: "Tiêu đề của mail", requester: "Tên người gửi", requestTime: "01/01/2018", type: "Câu hỏi", priority: "Bình thường", assignee: 'Lương Kiên Hào'},
  {id: 11, status: 'solved', subject: "Tiêu đề của mail", requester: "Tên người gửi", requestTime: "01/01/2018", type: "Câu hỏi", priority: "Bình thường", assignee: 'Lương Kiên Hào'},
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

  componentDidMount(){
    document.title = "Mail Ticket"
  }

  onTicketFilterClick = (key, item) => {
    this.setState({
      selectedTicketFilterButton: key,
      tableTitle: item.content,
      tableTitleSecondary: item.number + ' tickets',
    })
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

export default withStyles(styles)(MailTicket);
