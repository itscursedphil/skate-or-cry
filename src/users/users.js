import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { List } from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import UsersListItem from './usersListItem';
import { selectUser } from './usersActions';
import { selectCategory } from '../categories/categoriesActions';
import {
  openNotification,
  setNoticationMessage
} from '../notifications/notificationsActions';
import { getUsers, getActiveUserId } from './usersUtils';

const UsersList = ({ users, active, onUserSelected, history }) =>
  <Container>
    <Row>
      <List style={{ width: 100 + '%' }}>
        {users.map((user, i) =>
          <UsersListItem
            key={user.id}
            onClick={() => onUserSelected(user.id, user.nickname, history)}
            nickName={user.nickname}
            fullName={user.name}
            avatar={user.image}
            checked={user.id === active}
            divider={i < users.length - 1}
          />
        )}
      </List>
    </Row>
    {active > -1 &&
      <Row>
        <Col>
          <Link to="/categories">
            <RaisedButton label="Zu den Aufgaben" primary fullWidth />
          </Link>
        </Col>
      </Row>}
  </Container>;

UsersList.propTypes = {
  users: PropTypes.array.isRequired,
  active: PropTypes.number.isRequired,
  onUserSelected: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    onUserSelected: (id, name, history) => {
      dispatch(selectUser(id));
      dispatch(selectCategory(-1));
      dispatch(setNoticationMessage(`${name} wurde ausgewählt`));
      dispatch(openNotification());
      history.push('/categories');
    }
  };
};

const mapStateToProps = state => {
  return {
    users: getUsers(state),
    active: getActiveUserId(state)
  };
};

const Users = connect(mapStateToProps, mapDispatchToProps)(UsersList);

export default Users;
