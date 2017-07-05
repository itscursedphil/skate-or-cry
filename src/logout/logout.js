import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isAuthenticated } from '../authentication/authenticationUtils';
import { logoutUser } from '../authentication/authenticationActions';

const LogoutPage = ({ logoutUser, history, authenticated }) => {
  if (authenticated) {
    logoutUser();
  } else {
    history.push('/login');
  }
  return <h1>Logging out...</h1>;
};

LogoutPage.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    authenticated: isAuthenticated(state)
  };
};

const mapDispatchToProps = {
  logoutUser
};

const Logout = connect(mapStateToProps, mapDispatchToProps)(LogoutPage);

export default Logout;
