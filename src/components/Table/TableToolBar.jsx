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
import { deleteMail } from '../../store/actions/mail';
import { connect } from "react-redux";
import { ToastContainer, ToastStore } from 'react-toasts';

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
  tableTitle: {
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
  row: {
    display: 'flex',
  }
});

class TableToolbar extends React.Component {

  onDeleteMail = () => {
    this.props.doDeleteMail(this.props.selectedMailID)
    .then(resJson => { 
      if (resJson.returnCode == 1){
        ToastStore.success('Xóa mail thành công!');
      }
    })
  }

  render() {
    const { numSelected, classes, tableTitle, tableTitleSecondary } = this.props;

    return (
      
      <Toolbar
        className={classNames(classes.root)}
      >

                 <ToastContainer position={ToastContainer.POSITION.BOTTOM_LEFT} store={ToastStore} />
        <div className={classes.title}>
          <Typography id="tableTitle">
            <div className={classes.tableTitle}>{tableTitle}</div>
            <div className={classes.tableTitleSecondary}>{tableTitleSecondary}</div>
          </Typography>
        </div>
        {this.props.children}
        <div className={classes.actions}>
          {numSelected > 0 ? (
            <div className={classes.row}>
              <Tooltip title="Báo cáo spam">
                <IconButton className={classes.button}>
                  <ErrorIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Xóa">
                <IconButton className={classes.button} onClick={this.onDeleteMail}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </div>
          ) : (
              null
            )}
        </div>
      </Toolbar>
    )
  };
};

TableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

const mapStateToProps = state => {
  return {
      selectedMailID: state.mail.selectedMailID,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    doDeleteMail: (listMailID) => dispatch(deleteMail(listMailID)),
  };
};
export default withStyles(toolbarStyles)(connect( mapStateToProps ,mapDispatchToProps)(TableToolbar));