import React from 'react';
import { connect } from 'react-redux';
import { Container, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import { List } from 'material-ui/List';
import UsersListItem from './usersListItem';
import { selectUser } from './usersActions';
import {
  toggleNotification,
  setNoticationMessage
} from '../notifications/notificationsActions';

const UsersList = ({ users, active, onUserSelected }) => (
  <Container>
    <Row>
      <h1>Users</h1>
      <List style={{ width: 100 + '%' }}>
        {users.map((user, i) => (
          <UsersListItem
            key={user.id}
            onClick={() => onUserSelected(user.id, user.nickname)}
            nickName={user.nickname}
            fullName={user.name}
            avatar={user.image}
            checked={user.id === active}
            divider={i < users.length - 1}
          />
        ))}
      </List>
    </Row>
  </Container>
);

UsersList.propTypes = {
  users: PropTypes.array.isRequired,
  active: PropTypes.number.isRequired,
  onUserSelected: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    onUserSelected: (id, name) => {
      dispatch(selectUser(id));
      dispatch(setNoticationMessage(`${name} wurde ausgewählt`));
      dispatch(toggleNotification());
    }
  };
};

const mapStateToProps = state => {
  return {
    users: state.users.all,
    active: state.users.active
  };
};

const Users = connect(mapStateToProps, mapDispatchToProps)(UsersList);

export default Users;
