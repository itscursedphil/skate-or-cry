import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { closeNotification } from './notificationsActions';
import Snackbar from 'material-ui/Snackbar';

const Notification = ({ open = false, message = '', onClose }) => (
  <Snackbar
    open={open}
    message={message}
    autoHideDuration={2000}
    onRequestClose={onClose}
  />
);

Notification.propTypes = {
  open: PropTypes.bool.isRequired,
  message: PropTypes.string,
  onClose: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    message: state.notifications.message,
    open: state.notifications.open
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onClose: () => {
      dispatch(closeNotification());
    }
  };
};

const NotificationBar = connect(mapStateToProps, mapDispatchToProps)(
  Notification
);

export default NotificationBar;
