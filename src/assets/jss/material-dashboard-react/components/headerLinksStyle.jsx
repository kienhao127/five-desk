import {
  defaultFont,
  dangerColor
} from "assets/jss/material-dashboard-react.jsx";

import dropdownStyle from "assets/jss/material-dashboard-react/dropdownStyle.jsx";

const headerLinksStyle = theme => ({
  ...dropdownStyle(theme),
  search: {
    "& > div": {
      marginTop: "0"
    },
    [theme.breakpoints.down("sm")]: {
      margin: "10px 15px !important",
      float: "none !important",
      paddingTop: "1px",
      paddingBottom: "1px",
      padding: "0!important",
      width: "60%",
      marginTop: "40px",
      "& input": {
        color: "#FFFFFF"
      }
    }
  },
  linkText: {
    zIndex: "4",
    ...defaultFont,
    fontSize: "14px",
    margin: "0px"
  },
  icons:{
  },
  buttonLink: {
    marginRight: 20,
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      margin: "10px 15px 0",
      width: "-webkit-fill-available",
      "& svg": {
        width: "50px",
        height: "30px",
        marginRight: "15px",
        marginLeft: "-15px"
      },
      "& .fab,& .fas,& .far,& .fal,& .material-icons": {
        fontSize: "24px",
        lineHeight: "30px",
        width: "24px",
        height: "30px",
        marginRight: "15px",
        marginLeft: "-15px"
      },
      "& > span": {
        justifyContent: "flex-start",
        width: "100%"
      }
    }
  },
  searchButton: {
    marginRight: 20,
    [theme.breakpoints.down("sm")]: {
      top: "-50px !important",
      marginRight: "22px",
      float: "right"
    }
  },
  margin: {
    zIndex: "4",
    margin: "0"
  },
  searchIcon: {
    width: "17px",
    zIndex: "4"
  },
  notifications: {
    zIndex: "4",
    [theme.breakpoints.up("md")]: {
      position: "absolute",
      top: "2px",
      border: "1px solid #FFF",
      right: "4px",
      fontSize: "9px",
      background: dangerColor,
      color: "#FFFFFF",
      minWidth: "16px",
      height: "16px",
      borderRadius: "10px",
      textAlign: "center",
      lineHeight: "16px",
      verticalAlign: "middle",
      display: "block"
    },
    [theme.breakpoints.down("sm")]: {
      ...defaultFont,
      fontSize: "14px",
      marginRight: "8px"
    }
  },
  manager: {
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    },
    display: "inline-block"
  },
  searchWrapper: {
    [theme.breakpoints.down("sm")]: {
      width: "-webkit-fill-available",
      margin: "10px 15px 0"
    },
    display: "inline-block"
  },
  avatar:{
    [theme.breakpoints.down("sm")]: {
      marginRight: '15px',
      marginLeft: '-10px',
      width: 35,
      height: 35,
    },
    [theme.breakpoints.up("md")]: {
      margin: '-10px',
      width: 40,
      height: 40,
    }
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
    alginItems: 'center'
  },
  userInfoMenuItem:{
    paddingLeft: 20,
  },
  userInfoName:{
    fontFamily: 'roboto-medium',
    fontSize: 20,
    color: '#666',
  },
  userInfoSecondary: {
    fontFamily: 'roboto',
    fontSize: 14,
    color: '#68737D',
  },
  logoutLabel:{
    color: '#666',
    fontSize: 20,
  },
  peperContainer:{
    width: 300,
  },
});

export default headerLinksStyle;
