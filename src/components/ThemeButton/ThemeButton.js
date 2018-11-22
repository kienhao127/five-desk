import React from "react";
import PropTypes from "prop-types";
// @material-ui/core
import {withStyles, createMuiTheme, MuiThemeProvider} from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";

class ThemeButton extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
        
    };
  }

  componentDidMount(){
  }

  render() {
    const {classes, width, color} = this.props;
    return (
        <MuiThemeProvider theme={theme}>
            <Button onClick={this.props.onClick} variant="contained" color='primary' style={{width: this.props.width,}}>
                <Typography style={{color: this.props.textColor}}>{this.props.content}</Typography>
            </Button>
        </MuiThemeProvider>
    );
  }
}

const theme = createMuiTheme({
    palette: {
      primary: {
          main: '#00bcd4',
      },
    },
  });

export default ThemeButton;
