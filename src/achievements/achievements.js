import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import { getAchievements } from './achievementsUtils';
import { getUsers, getUserById } from '../users/usersUtils';
import Divider from 'material-ui/Divider';
import { List } from 'material-ui/List';
import { ListItem } from 'material-ui/List';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import DoneIcon from 'material-ui/svg-icons/action/done';
import { updateAchievements } from './achievementsActions';
import {
  openNotification,
  setNoticationMessage
} from '../notifications/notificationsActions';
import PageTitle from '../ui/pageTitle';

class AchievementsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      achievements: []
    };

    this.userChangedHandler = this.userChangedHandler.bind(this);
  }

  userChangedHandler(userId, achievement) {
    if (userId === achievement.userId) return;

    this.setState({
      ...this.state,
      achievements: [
        ...this.state.achievements.filter(a => a.id !== achievement.id),
        {
          ...achievement,
          userId
        }
      ]
    });
  }

  render() {
    const { achievements, users, getUser, submitAchievements } = this.props;
    const newAchievements = this.state.achievements;

    return (
      <PageTitle title="Achievements">
        <Container>
          <Row
            style={{
              paddingBottom: 64 + 'px'
            }}
          >
            <List
              style={{
                width: 100 + '%'
              }}
            >
              {achievements.map(achievement =>
                <span key={achievement.id}>
                  <ListItem
                    primaryText={
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column'
                        }}
                      >
                        <div>{achievement.title}</div>
                        <SelectField
                          floatingLabelText="Gewinner:"
                          hintText="Benutzer auswählen"
                          value={
                            newAchievements.find(a => a.id === achievement.id)
                              ? getUser(
                                  newAchievements.find(
                                    a => a.id === achievement.id
                                  ).userId
                                ).id
                              : achievement.userId > -1
                                ? getUser(achievement.userId).id
                                : null
                          }
                          floatingLabelFixed={true}
                          onChange={(e, i, v) =>
                            this.userChangedHandler(v, achievement)}
                          fullWidth
                        >
                          {users.map(user =>
                            <MenuItem
                              style={{
                                paddingTop: 8 + 'px',
                                paddingBottom: 8 + 'px'
                              }}
                              key={user.id}
                              value={user.id}
                              label={user.nickname}
                              primaryText={
                                <div
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center'
                                  }}
                                >
                                  <Avatar src={user.image} />
                                  <span
                                    style={{
                                      paddingLeft: 16 + 'px',
                                      paddingRight: 16 + 'px'
                                    }}
                                  >
                                    {user.nickname}
                                  </span>
                                </div>
                              }
                            />
                          )}
                        </SelectField>
                      </div>
                    }
                  />
                  <Divider />
                </span>
              )}
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
              submitAchievements(newAchievements);
            }}
          >
            <DoneIcon />
          </FloatingActionButton>
        </Container>
      </PageTitle>
    );
  }
}

AchievementsPage.propTypes = {
  achievements: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
  getUser: PropTypes.func.isRequired,
  submitAchievements: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    achievements: getAchievements(state),
    users: getUsers(state),
    getUser: id => getUserById(state, id)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    submitAchievements: achievements => {
      dispatch(updateAchievements(achievements));
      dispatch(setNoticationMessage(`Achievements wurden aktualisiert`));
      dispatch(openNotification());
    }
  };
};

const Achievements = connect(mapStateToProps, mapDispatchToProps)(
  AchievementsPage
);

export default Achievements;
