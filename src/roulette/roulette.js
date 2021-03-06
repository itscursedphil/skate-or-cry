import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import PageTitle from '../ui/pageTitle';
import { List } from 'material-ui/List';
import { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { connect } from 'react-redux';
import { getUsers } from '../users/usersUtils';
import { getTasks } from '../tasks/tasksUtils';
import Avatar from 'material-ui/Avatar';
import Subtitle from '../ui/subtitle';
import Checkbox from 'material-ui/Checkbox';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import DiceIcon from 'material-ui/svg-icons/places/casino';
import randomSwearWord from '../ui/randomSwearWord';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import moment from 'moment';
import {
  setUserTaskCompleted,
  setUserTaskUncompleted,
  setUserTaskFailed,
  setUserDailyTask,
  setUserDailyTaskCompleted,
  setUserDailyTaskUncompleted
} from '../users/usersActions';
import { updateTimestamp } from './rouletteActions';
import { dispatchToServer } from '../actions';

class RoulettePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.canGenerateNewTasks = this.canGenerateNewTasks.bind(this);
    this.generateRandomTasks = this.generateRandomTasks.bind(this);
    this.toggleTask = this.toggleTask.bind(this);
  }

  toggleModal(e) {
    if (e) e.preventDefault();

    this.setState({
      ...this.state,
      modalOpen: !this.state.modalOpen
    });
  }

  canGenerateNewTasks() {
    if (process.env.NODE_ENV === 'development') return true;

    const { lastUpdated } = this.props;

    if (lastUpdated === null) return true;

    const day = moment(lastUpdated).startOf('day');
    const today = moment().startOf('day');

    return !day.isSame(today);
  }

  generateRandomTasks() {
    if (!this.canGenerateNewTasks()) return;

    const {
      users,
      tasks,
      setUserDailyTask,
      setUserTaskFailed,
      updateTimestamp,
      lastUpdated
    } = this.props;

    if (lastUpdated) {
      users.map(user => {
        const isCompleted = user.completedTasks.find(
          task => task.id === user.dailyTask.taskId
        ) === undefined
          ? false
          : true;

        if (!isCompleted) setUserTaskFailed(user.dailyTask.taskId, user.id);
      });
    }

    const randomTasks = users.map(user => {
      const { completedTasks } = user;
      const possibleTasks = tasks
        .filter(task => task.points * 1.0 > 0)
        .filter(task => !completedTasks.find(c => c.id === task.id));
      const randomTaskIndex = Math.floor(Math.random() * possibleTasks.length);
      const randomTask = possibleTasks[randomTaskIndex];

      return {
        userId: user.id,
        taskId: randomTask.id
      };
    });

    updateTimestamp(Date.now());
    randomTasks.map(task => setUserDailyTask(task.taskId, task.userId));

    this.toggleModal();
  }

  toggleTask(e, taskId, userId, points) {
    e.preventDefault();

    const {
      users,
      setUserTaskCompleted,
      setUserDailyTaskCompleted,
      setUserTaskUncompleted,
      setUserDailyTaskUncompleted
    } = this.props;

    const isCompleted = users
      .find(user => user.id === userId)
      .completedTasks.find(task => task.id === taskId);

    if (!isCompleted) {
      setUserTaskCompleted(taskId, userId, points);
      setUserDailyTaskCompleted(userId);
    } else {
      setUserTaskUncompleted(taskId, userId);
      setUserDailyTaskUncompleted(userId);
    }
  }

  render() {
    const { users, tasks, lastUpdated } = this.props;

    return (
      <PageTitle title="Roulette">
        <Container>
          {lastUpdated &&
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
                {users.map(user => {
                  const dailyTask = tasks.find(
                    task => task.id === user.dailyTask.taskId
                  );

                  if (!dailyTask) return null;

                  const isCompleted = user.completedTasks.find(
                    task => task.id === user.dailyTask.taskId
                  ) === undefined
                    ? false
                    : true;

                  return (
                    <span key={user.id}>
                      <ListItem
                        leftCheckbox={<Checkbox checked={isCompleted} />}
                        onClick={e => {
                          this.toggleTask(
                            e,
                            dailyTask.id,
                            user.id,
                            dailyTask.points
                          );
                        }}
                        primaryText={
                          <div style={{ paddingRight: 32 + 'px' }}>
                            {user.nickname}
                            <span
                              style={{ padding: `8px 0`, display: 'block' }}
                            >
                              <Divider />
                            </span>
                            {dailyTask.title}<br />
                            <Subtitle>
                              <strong>{dailyTask.points} Punkte</strong>{' '}
                              {dailyTask.comment.length
                                ? ` - ${dailyTask.comment}`
                                : ''}
                            </Subtitle>
                          </div>
                        }
                        rightAvatar={<Avatar src={user.image} />}
                      />
                      <Divider />
                    </span>
                  );
                })}
              </List>
            </Row>}
          {this.canGenerateNewTasks() &&
            <FloatingActionButton
              style={{
                position: 'fixed',
                bottom: 16 + 'px',
                right: 16 + 'px',
                zIndex: 999
              }}
              onTouchTap={this.toggleModal}
            >
              <DiceIcon />
            </FloatingActionButton>}
          <Dialog
            title="Würfel rollen"
            actions={[
              <RaisedButton
                label="Abbrechen"
                secondary
                onTouchTap={this.toggleModal}
              />,
              <RaisedButton
                label="Bestätigen"
                primary
                onTouchTap={this.generateRandomTasks}
              />
            ]}
            modal={false}
            open={this.state.modalOpen}
            onRequestClose={this.toggleModal}
          >
            Eh {randomSwearWord()}, sicher dass du die Würfel neu rollen willst?
          </Dialog>
        </Container>
      </PageTitle>
    );
  }
}

// RoulettePage.propTypes = {
//   users: PropTypes.array.isRequired
// };

const mapStateToProps = state => {
  return {
    users: getUsers(state),
    tasks: getTasks(state),
    lastUpdated: state.roulette.timestamp
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     updateTimestamp: timestamp => dispatch(updateTimestamp(timestamp)),
//     setUserTaskCompleted: (taskId, userId, points) =>
//       dispatch(setUserTaskCompleted(taskId, userId, points)),
//     setUserTaskUncompleted: (taskId, userId) =>
//       dispatch(setUserTaskUncompleted(taskId, userId)),
//     setUserTaskFailed: (taskId, userId, points) =>
//       dispatch(setUserTaskFailed(taskId, userId, points)),
//     setUserDailyTask: (taskId, userId) =>
//       dispatch(setUserDailyTask(taskId, userId)),
//     setUserDailyTaskCompleted: userId =>
//       dispatch(setUserDailyTaskCompleted(userId)),
//     setUserDailyTaskUncompleted: userId =>
//       dispatch(setUserDailyTaskUncompleted(userId))
//   };
// };

const mapDispatchToProps = dispatch => {
  return {
    updateTimestamp: timestamp =>
      dispatchToServer(dispatch)(updateTimestamp(timestamp)),
    setUserTaskCompleted: (taskId, userId, points) =>
      dispatchToServer(dispatch)(setUserTaskCompleted(taskId, userId, points)),
    setUserTaskUncompleted: (taskId, userId) =>
      dispatchToServer(dispatch)(setUserTaskUncompleted(taskId, userId)),
    setUserTaskFailed: (taskId, userId) =>
      dispatchToServer(dispatch)(setUserTaskFailed(taskId, userId, 40)),
    setUserDailyTask: (taskId, userId) =>
      dispatchToServer(dispatch)(setUserDailyTask(taskId, userId)),
    setUserDailyTaskCompleted: userId =>
      dispatchToServer(dispatch)(setUserDailyTaskCompleted(userId)),
    setUserDailyTaskUncompleted: userId =>
      dispatchToServer(dispatch)(setUserDailyTaskUncompleted(userId))
  };
};

const Roulette = connect(mapStateToProps, mapDispatchToProps)(RoulettePage);

export default Roulette;
