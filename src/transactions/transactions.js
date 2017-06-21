import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PageWarning from '../ui/pageWarning';
import { Container, Row, Col } from 'reactstrap';
import { List } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Chip from 'material-ui/Chip';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TransactionsListItem from './transactionsListItem';
import TransactionsFilter from './transactionsFilter';
import { getUserById, getActiveUserId } from '../users/usersUtils';
import { getTransactionsForActiveUser } from './transactionsUtils';

const TransactionsPage = ({ userTransactions, getUser, activeUserId }) => {
  // if (activeUserId < 0) return <PageWarning users />;
  return (
    <Container>
      <Row>
        <Col>
          <TransactionsFilter value="all" onChangeHandler={(e, i, v) => null} />
        </Col>
      </Row>
      <Row>
        <List style={{ width: 100 + '%' }}>
          {userTransactions.map(transaction => {
            const { id, senderId, receiverId, ammount } = transaction;
            const sender = getUser(senderId);
            const receiver = getUser(receiverId);
            const itemProps = {
              activeUserId,
              sender,
              receiver,
              ammount
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
      >
        <ContentAdd />
      </FloatingActionButton>
    </Container>
  );
};

TransactionsPage.propTypes = {
  userTransactions: PropTypes.array.isRequired,
  getUser: PropTypes.func.isRequired,
  // getUserName: PropTypes.func.isRequired,
  activeUserId: PropTypes.number.isRequired
};

const mapDispatchToProps = dispatch => {
  return {};
};

const mapStateToProps = state => {
  return {
    userTransactions: getTransactionsForActiveUser(state),
    getUser: id => getUserById(state, id),
    // getUserName: id => getUserById(state, id).nickname,
    activeUserId: getActiveUserId(state)
  };
};

const Transactions = connect(mapStateToProps, mapDispatchToProps)(
  TransactionsPage
);

export default Transactions;
