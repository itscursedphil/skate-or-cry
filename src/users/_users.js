import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';
import { List } from 'material-ui/List';
import Snackbar from 'material-ui/Snackbar';
import UsersListItem from './usersListItem';
import API from '../api.json';

let { users } = API;
users = users.map(user => {
  user.active = false;
  return user;
});

export default class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users,
      active: -1,
      notified: false
    };

    this.onUserClicked = this.onUserClicked.bind(this);
    this.resetNotification = this.resetNotification.bind(this);
  }

  onUserClicked(i) {
    const newUsers = users.map((user, j) => {
      user.active = i === j ? true : false;
      return user;
    });
    this.setState({
      ...this.state,
      active: i,
      users: newUsers,
      notified: true
    });
  }

  resetNotification() {
    this.setState({
      ...this.state,
      notified: false
    });
  }

  render() {
    const { users, notified, active } = this.state;
    return (
      <Container>
        <Row>
          <h1>Users</h1>
          <List style={{ width: 100 + '%' }}>
            {users.map((user, i) => (
              <UsersListItem
                key={i}
                onClick={() => this.onUserClicked(i)}
                nickName={user.nickname}
                fullName={user.name}
                avatar={user.image}
                checked={user.active}
                divider={i < users.length - 1}
              />
            ))}
          </List>
          <Snackbar
            open={notified}
            message={
              `${active > -1 ? users[active].nickname : ''} wurde ausgewählt`
            }
            autoHideDuration={2000}
            onRequestClose={this.resetNotification}
          />
        </Row>
      </Container>
    );
  }
}
