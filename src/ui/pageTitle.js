import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setPageTitle } from '../actions';

class PageTitleComponent extends Component {
  componentWillMount() {
    this.props.setTitle();
  }

  render() {
    return this.props.children;
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setTitle: () => dispatch(setPageTitle(ownProps.title || ''))
  };
};

const PageTitle = connect(null, mapDispatchToProps)(PageTitleComponent);

export default PageTitle;
