import React, { Component } from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { isAuthenticated } from '../authentication/authenticationUtils';
import PropTypes from 'prop-types';

class PrivateRouteComponent extends Component {
  shouldComponentUpdate() {
    console.log('Update');
    return true;
  }
  render() {
    const {
      component: Component,
      dispatch,
      authenticated,
      ...rest
    } = this.props;
    return (
      <Route
        {...rest}
        render={props =>
          authenticated
            ? <Component {...props} />
            : <Redirect
                to={{
                  pathname: '/login'
                }}
              />}
      />
    );
  }
}

PrivateRouteComponent.propTypes = {
  authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    authenticated: isAuthenticated(state)
  };
};

const PrivateRoute = connect(mapStateToProps)(PrivateRouteComponent);

export default PrivateRoute;
