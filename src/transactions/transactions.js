import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PageWarning from '../ui/pageWarning';
import { Container, Row, Col } from 'reactstrap';
import { List } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TransactionsListItem from './transactionsListItem';
import TransactionsFilter from './transactionsFilter';
import { getUserById, getActiveUserId } from '../users/usersUtils';
import {
  getTransactionsFilter,
  getTransactionsForActiveUser,
  getFilteredTransactionsForActiveUser
} from './transactionsUtils';
import { setTransactionsFilter } from './transactionsActions';

const TransactionsPage = ({
  userTransactions,
  getUser,
  setFilter,
  filter,
  activeUserId,
  history
}) =>
  <PageWarning users>
    <Container>
      <Row>
        <Col>
          <TransactionsFilter
            value={filter}
            onChangeHandler={(e, i, v) => {
              e.preventDefault();
              setFilter(v);
            }}
          />
        </Col>
      </Row>
      <Row>
        <List style={{ width: 100 + '%' }}>
          {[...userTransactions].reverse().map(transaction => {
            const { id, senderId, receiverId, ammount } = transaction;
            const sender = getUser(senderId);
            const receiver = getUser(receiverId);
            const itemProps = {
              activeUserId,
              sender,
              receiver,
              ammount,
              id,
              history
            };

            return (
              <span key={id}>
                <TransactionsListItem {...itemProps} />
                <Divider />
              </span>
            );
          })}
        </List>
      </Row>
      <FloatingActionButton
        style={{
          position: 'fixed',
          bottom: 16 + 'px',
          right: 16 + 'px',
          zIndex: 999
        }}
        onTouchTap={e => {
          e.preventDefault();
          history.push('/transactions/add');
        }}
      >
        <ContentAdd />
      </FloatingActionButton>
    </Container>
  </PageWarning>;

TransactionsPage.propTypes = {
  userTransactions: PropTypes.array.isRequired,
  getUser: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  activeUserId: PropTypes.number.isRequired,
  history: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    setFilter: filter => dispatch(setTransactionsFilter(filter))
  };
};

const mapStateToProps = state => {
  return {
    userTransactions: getFilteredTransactionsForActiveUser(state),
    getUser: id => getUserById(state, id),
    filter: getTransactionsFilter(state),
    activeUserId: getActiveUserId(state)
  };
};

const Transactions = connect(mapStateToProps, mapDispatchToProps)(
  TransactionsPage
);

export default Transactions;
