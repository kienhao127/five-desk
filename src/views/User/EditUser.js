import React from "react";
import PropTypes from "prop-types";
import contentImg from './../../assets/img/cover.jpeg';
// @material-ui/core components
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Button from '@material-ui/core/Button';
import Avatar from "@material-ui/core/Avatar";
class EditUser extends React.Component {
    componentDidMount(){
        document.title = "EditUSer"
      }
    handleToggle = () => {
        this.setState(state => ({ open: !state.open }));
      };
      render() {
        const {classes} = this.props;
        const info = ["Luong","Hao","0123456789",
        "Team05","luongkienhao@gmail.com"];
        return (
          <div className={classes.root}>
            <GridContainer>
                <GridItem xs={12} sm={12} md={7}>
                <div className={classes.left}>
                <img className={classes.img} src={contentImg}/>
                
                <div className={classes.avH3}>
                <Avatar src="https://i.imgur.com/p9bwTYj.png"  
                className={classes.avatar}/>
                <h3 className={classes.h3}>{info[0]} {info[1]}
                <h5 className={classes.h5}>{info[2]}</h5>
                </h3>
                </div>
                </div>
                </GridItem>
                <GridItem xs={12} sm={12} md={5}>
                <div className={classes.right}>
                <div className={classes.TextField_0}>
                <TextField
                id="outlined-Ho"
                label={info[0]}
                className={classNames(classes.textField_1, classes.dense)}
                margin="dense"
                variant="outlined"
                />
                <TextField
                id="outlined-Ten"
                label={info[1]}
                className={classNames(classes.textField_1, classes.dense)}
                margin="dense"
                variant="outlined"
                />
                </div>
                <TextField
                id="outlined-SDT"
                label={info[2]}
                className={classNames(classes.textField_2, classes.dense)}
                margin="dense"
                variant="outlined"
                />
                <TextField
                id="outlined-Team"
                label={info[3]}
                className={classNames(classes.textField_2, classes.dense)}
                margin="dense"
                variant="outlined"
                />
                <TextField
                disabled
                id="standard-Email"
                defaultValue={info[4]}
                className={classes.textField_2}
                margin="dense"
                variant="outlined"
                />
                <Button
                variant="contained"
                color="primary"
                className={classNames(classes.textField_2, classes.cssbt)}
                >
                Cập nhật
                </Button>
                <TextField
                id="outlined-Old_password"
                label="Mật khẩu cũ"
                className={classNames(classes.textField_3, classes.dense)}
                margin="dense"
                variant="outlined"
                />
                <TextField
                id="outlined-New_password"
                label="Mật khẩu mới"
                className={classNames(classes.textField_2, classes.dense)}
                margin="dense"
                variant="outlined"
                />
                <TextField
                id="outlined-Retype_password"
                label="Nhập lại mật khẩu"
                className={classNames(classes.textField_2, classes.dense)}
                margin="dense"
                variant="outlined"
                />
                <Button
                variant="contained"
                color="primary"
                className={classNames(classes.textField_2, classes.cssbt)}
                >
                Đổi mật khẩu
                </Button>
                </div>
                </GridItem>
            </GridContainer>
          </div>
        );
      }
}
const styles = theme => ({

    root:{
        width: '95%', 
        fontFamily: 'Roboto',
        marginLeft: 'auto',
        marginRight: 'auto',
    },

    TextField_0: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            width: '99.5%',
        },
        [theme.breakpoints.down('sm')]: {
            width: '60%',
        },
        [theme.breakpoints.down('xs')]: {
            width: '79%',
        },
    },

    textField_1: {
        marginBottom: 20,
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
        marginBottom: 20,
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
      textField_3: {
        marginTop: 50,
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
    img: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        width: '100%',
        height: '68%',
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },

    avatar: {
        width: 130,
        height:130,
        
    },
    
    h3: {
        fontFamily: 'roboto-medium',
        fontSize: 26,
        [theme.breakpoints.up('md')]:{
            marginLeft: 141,
            marginTop: -55,
        },
        [theme.breakpoints.down('sm')]:{
            marginLeft: 141,
            marginTop: -55,
        },
        
    },
    avH3:{
        [theme.breakpoints.up('md')]:{
            marginLeft: '5%',
            marginTop: '-13%',
        },
    },
    h5:{
        fontFamily: 'roboto-light',
        fontSize: 20,
        [theme.breakpoints.up('md')]:{
            marginTop: '0%',
        },
        [theme.breakpoints.down('sm')]:{
            marginTop: 0,
        },
    },
    right:{
        marginTop: -9,
        [theme.breakpoints.down('sm')]: {
            width: '95%',
        },
    },
    cssbt:{
        backgroundColor: "#47525E",
        '&:hover': {
      backgroundColor: "#1A100B",
    },
    },
});
export default withStyles(styles)(EditUser)