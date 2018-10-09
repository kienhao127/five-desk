import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { ListItemSecondaryAction, Typography } from "@material-ui/core";

const menuItems = [ {path: '/yourunsolved', content: "Your unsolved tickets", number: 0}, 
                    {path: '/unassigned', content: "Unassigned tickets", number: 2},
                    {path: '/allunsolved', content: "All unsolved tickets", number: 5},]

class MailTicket extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      
    };
  
  }

  componentDidMount(){
    document.title = "Mail Ticket"
  }

  render() {
    const {classes} = this.props;
    return (
      <GridContainer>
        <GridItem xs={3} sm={3} md={3} >
          <List dense={true}>
            {menuItems.map((item, key) => (
              <ListItem
                key={key}
                role={undefined}
                dense
                button
                selected={key==1?true:false}
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
        <GridItem xs={9} sm={9} md={9}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>Ticket chưa giải quyết</h4>
              <p className={classes.cardCategoryWhite}>
                1 tickets
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="info"
                tableHead={["", "Chủ đề", "Người yêu cầu", "Ngày yêu cầu", "Loại", "Độ ưu tiên"]}
                tableData={[
                  {status: 'new', content: ["Tiêu đề của mail", "Tên người gửi", "01/01/2018", "Câu hỏi", "Bình thường"]},
                  {status: 'open', content: ["Tiêu đề của mail", "Tên người gửi", "01/01/2018", "Câu hỏi", "Bình thường"]},
                  {status: 'pending', content: ["Tiêu đề của mail", "Tên người gửi", "01/01/2018", "Câu hỏi", "Bình thường"]},
                  {status: 'solved', content: ["Tiêu đề của mail", "Tên người gửi", "01/01/2018", "Câu hỏi", "Bình thường"]},
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
    </GridContainer>
    );
  }
}

const styles = {
  girdContainer: {
    backgroundColor: 'black'
  },
  cardCategoryWhite: {
    fontFamily: 'Roboto',
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.80)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: 'Roboto-Medium',
    fontSize: '20px',
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  listItem: {
    margin: '0px 0px 0px 15px',
  },
};

export default withStyles(styles)(MailTicket);
