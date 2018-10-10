import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
// @material-ui/icons
import DeleteIcon from "@material-ui/icons/Delete";
import ErrorIcon from "@material-ui/icons/Error";

const toolbarStyles = theme => ({
    root: {
      paddingRight: theme.spacing.unit,
    },
    spacer: {
      flex: '1 1 50%',
    },
    actions: {
      color: theme.palette.text.secondary,
    },
    title: {
      flex: '0 0 auto',
    },
    tableTitle:{
        fontFamily: 'Roboto-Medium',
        fontSize: '20px'
    },
    tableTitleSecondary: {
        fontFamily: 'Roboto',
        fontSize: 14,
        color: '#68737D'
    },
    button: {
      
    },
  });
  
  let TableToolbar = props => {
    const { numSelected, classes, tableTitle, tableTitleSecondary} = props;
  
    return (
      <Toolbar
        className={classNames(classes.root)}
      >
        <div className={classes.title}>
            <Typography variant="h6" id="tableTitle">
              <div className={classes.tableTitle}>{tableTitle}</div>
              <div className={classes.tableTitleSecondary}>{tableTitleSecondary}</div>
            </Typography>
        </div>
        {props.children}
        <div className={classes.actions}>
          {numSelected > 0 ? (
            <div>
            <Tooltip title="Báo cáo spam">
              <IconButton className={classes.button}>
                <ErrorIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Xóa">
              <IconButton className={classes.button}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            </div>
          ) : (
            null
          )}
        </div>
      </Toolbar>
    );
  };
  
  TableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
  };
  
  export default withStyles(toolbarStyles)(TableToolbar);