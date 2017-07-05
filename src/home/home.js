import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const HomePage = ({ activeUserId, activeCategoryId, history }) => {
  if (activeUserId < 0) {
    <Redirect
      to={{
        pathname: '/users'
      }}
    />;
  } else if (activeCategoryId < 0) {
    <Redirect
      to={{
        pathname: '/categories'
      }}
    />;
  } else {
    <Redirect
      to={{
        pathname: '/tasks'
      }}
    />;
  }
  return null;
};

HomePage.propTypes = {
  activeUserId: PropTypes.number.isRequired,
  activeCategoryId: PropTypes.number.isRequired,
  history: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => {
  return {};
};

const mapStateToProps = state => {
  return {
    activeUserId: state.users.active,
    activeCategoryId: state.categories.active
  };
};

const Home = connect(mapStateToProps, mapDispatchToProps)(HomePage);

export default Home;
