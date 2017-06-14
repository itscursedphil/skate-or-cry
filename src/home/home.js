import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const HomePage = ({ activeUserId, activeCategoryId, history }) => {
  if (activeUserId < 0) {
    history.push('/users');
  } else if (activeCategoryId < 0) {
    history.push('/categories');
  } else {
    history.push('/tasks');
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
