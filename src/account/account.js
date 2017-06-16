import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PageWarning from '../ui/pageWarning';

const AccountPage = ({ activeUserId }) => {
  if (activeUserId < 0) return <PageWarning users />;
  return (
    <h1>
      Account
    </h1>
  );
};

AccountPage.propTypes = {
  activeUserId: PropTypes.number.isRequired
};

const mapDispatchToProps = dispatch => {
  return {};
};

const mapStateToProps = state => {
  return {
    activeUserId: state.users.active
  };
};

const Account = connect(mapStateToProps, mapDispatchToProps)(AccountPage);

export default Account;
