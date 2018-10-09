import React from "react";
import PropTypes from "prop-types";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";

const newColor = '#F5CA00';
const openColor = '#E82A2A';
const pendingColor = '#259ECB';
const solvedColor = '#68737D';

class StatusLabel extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            
        };
    }

    render() {
        const {classes} = this.props;
        return (
            <span className={classes[this.props.status + "Label"]}>{this.props.status.slice(0,1).toUpperCase()}</span>
        );
    }
}

const styles = {
    newLabel: {
        padding: '4px',
        width: '15px',
        textAlign: 'center',
        fontSize: '9px',
        lineHeight: '15px',
        backgroundColor: newColor,
        color: '#000000',
        borderRadius: 2,
    },
    openLabel: {
        padding: '4px',
        width: '15px',
        textAlign: 'center',
        fontSize: '9px',
        lineHeight: '15px',
        backgroundColor: openColor,
        color: '#FFFFFF',
        borderRadius: 2,
    },
    pendingLabel: {
        padding: '4px',
        width: '15px',
        textAlign: 'center',
        fontSize: '9px',
        backgroundColor: pendingColor,
        color: '#FFFFFF',
        borderRadius: 2,
    },
    solvedLabel: {
        padding: '4px',
        width: '15px',
        textAlign: 'center',
        fontSize: '9px',
        lineHeight: '15px',
        backgroundColor: solvedColor,
        color: '#FFFFFF',
        borderRadius: 2,
    },
    


}

export default withStyles(styles) (StatusLabel);
