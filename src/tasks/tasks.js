import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List } from 'material-ui/List';
import { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import {
  setUserTaskCompleted,
  setUserTaskUncompleted,
  setUserTaskFailed,
  setUserTaskUnfailed
} from '../users/usersActions';
import { setTasksFilter } from './tasksActions';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import PageWarning from '../ui/pageWarning';
import { getTasksForActiveCategory, getTasksFilter } from './tasksUtils';
import { getActiveUser, getActiveUserId } from '../users/usersUtils';
import PageTitle from '../ui/pageTitle';
import { dispatchToServer } from '../actions';
import SimpleTask from './simpleTask';
import MultiplierTask from './multiplierTask';
import randomSwearWord from '../ui/randomSwearWord';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';

class TasksPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
      activeTask: null
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.incrementTask = this.incrementTask.bind(this);
    this.decrementTask = this.decrementTask.bind(this);
    this.taskCompleted = this.taskCompleted.bind(this);
    this.taskFailed = this.taskFailed.bind(this);
  }

  toggleModal(e, taskId, userId, points) {
    e.preventDefault();

    this.setState({
      ...this.state,
      modalOpen: !this.state.modalOpen,
      activeTask: this.state.modalOpen
        ? null
        : {
            taskId,
            userId,
            points
          }
    });
  }

  incrementTask(taskId, userId, points, isCompleted, isFailed) {
    const { setUserTaskCompleted, setUserTaskUnfailed } = this.props;

    if (!isFailed) {
      setUserTaskCompleted(taskId, userId, points);
    }

    if (!isCompleted) {
      setUserTaskUnfailed(taskId, userId);
    }
  }

  decrementTask(taskId, userId, points, isCompleted, isFailed) {
    const { setUserTaskUncompleted, setUserTaskFailed } = this.props;

    if (!isFailed) {
      setUserTaskUncompleted(taskId, userId);
    }

    if (!isCompleted) {
      setUserTaskFailed(taskId, userId, points);
    }
  }

  taskCompleted(e) {
    e.preventDefault();

    const { setUserTaskCompleted } = this.props;
    const { taskId, userId, points } = this.state.activeTask;

    setUserTaskCompleted(taskId, userId, points);

    this.toggleModal(e);
  }

  taskFailed(e) {
    e.preventDefault();

    const { setUserTaskFailed } = this.props;
    const { taskId, userId, points } = this.state.activeTask;

    setUserTaskFailed(taskId, userId, points);

    this.toggleModal(e);
  }

  render() {
    const {
      tasks,
      user,
      activeUserId,
      setUserTaskCompleted,
      setUserTaskUncompleted,
      setUserTaskFailed,
      setUserTaskUnfailed,
      filter,
      setTasksFilter
    } = this.props;
    return (
      <PageWarning users categories>
        <PageTitle title="Aufgaben">
          <Container>
            <Row>
              <Col>
                <SelectField
                  floatingLabelText="Filter"
                  value={filter}
                  onChange={(e, i, v) => setTasksFilter(v)}
                  fullWidth
                >
                  <MenuItem value={'all'} primaryText="Alle" />
                  <Divider />
                  <MenuItem value={'completed'} primaryText="Erledigt" />
                  <Divider />
                  <MenuItem value={'uncompleted'} primaryText="Unerledigt" />
                  <Divider />
                  <MenuItem value={'failed'} primaryText="Versagt" />
                </SelectField>
              </Col>
            </Row>
            <Row>
              <List
                style={{
                  width: 100 + '%'
                }}
              >
                {tasks.map(task => {
                  const userCompletedTasks = user.completedTasks.filter(
                    c => c.id === task.id
                  );
                  const userFailedTasks = user.failedTasks.filter(
                    c => c.id === task.id
                  );
                  const isCompleted = userCompletedTasks.length > 0;
                  const isFailed = userFailedTasks.length > 0;
                  if (
                    filter === 'all' ||
                    (filter === 'completed' && isCompleted) ||
                    (filter === 'uncompleted' && !isCompleted) ||
                    (filter === 'failed' && isFailed)
                  ) {
                    return task.multiplier
                      ? <MultiplierTask
                          key={task.id}
                          onIncrement={e => {
                            e.preventDefault();
                            this.incrementTask(
                              task.id,
                              user.id,
                              task.points,
                              isCompleted,
                              isFailed
                            );
                          }}
                          onDecrement={e => {
                            e.preventDefault();
                            this.decrementTask(
                              task.id,
                              user.id,
                              task.points,
                              isCompleted,
                              isFailed
                            );
                          }}
                          title={task.title}
                          points={task.points}
                          count={
                            userCompletedTasks.length - userFailedTasks.length
                          }
                          comment={task.comment}
                          tba={task.tba}
                        />
                      : <SimpleTask
                          key={task.id}
                          onClick={e => {
                            e.preventDefault();

                            if (filter === 'failed')
                              return setUserTaskUnfailed(task.id, user.id);

                            if (task.tba)
                              return this.toggleModal(
                                e,
                                task.id,
                                user.id,
                                task.points
                              );

                            if (isCompleted) {
                              setUserTaskUncompleted(task.id, user.id);
                            } else {
                              setUserTaskCompleted(
                                task.id,
                                user.id,
                                task.points
                              );
                            }
                          }}
                          title={task.title}
                          points={task.points}
                          comment={task.comment}
                          isChecked={
                            filter === 'failed' ? isFailed : isCompleted
                          }
                          tba={task.tba}
                        />;
                  } else {
                    return null;
                  }
                })}
              </List>
            </Row>
            <Dialog
              title="Aufgabe erledigt?"
              actions={[
                <RaisedButton
                  label="Abbrechen"
                  onTouchTap={this.toggleModal}
                  fullWidth
                />,
                <RaisedButton
                  label="Versagt"
                  secondary
                  onTouchTap={this.taskFailed}
                  fullWidth
                />,
                <RaisedButton
                  label="Geschafft"
                  primary
                  onTouchTap={this.taskCompleted}
                  fullWidth
                />
              ]}
              modal={false}
              open={this.state.modalOpen}
              onRequestClose={this.toggleModal}
            >
              Eh {randomSwearWord()}, hast du die Aufgabe geschafft oder nicht?
            </Dialog>
          </Container>
        </PageTitle>
      </PageWarning>
    );
  }
}

TasksPage.propTypes = {
  tasks: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  activeUserId: PropTypes.number.isRequired,
  setUserTaskCompleted: PropTypes.func.isRequired,
  setUserTaskUncompleted: PropTypes.func.isRequired,
  setUserTaskFailed: PropTypes.func.isRequired,
  setUserTaskUnfailed: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  setTasksFilter: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    setUserTaskCompleted: (taskId, userId, points) => {
      dispatchToServer(dispatch)(setUserTaskCompleted(taskId, userId, points));
    },
    setUserTaskUncompleted: (taskId, userId) => {
      dispatchToServer(dispatch)(setUserTaskUncompleted(taskId, userId));
    },
    setUserTaskFailed: (taskId, userId, points) => {
      dispatchToServer(dispatch)(setUserTaskFailed(taskId, userId, points));
    },
    setUserTaskUnfailed: (taskId, userId) => {
      dispatchToServer(dispatch)(setUserTaskUnfailed(taskId, userId));
    },
    setTasksFilter: filter => {
      console.log(filter);
      dispatch(setTasksFilter(filter));
    }
  };
};

const mapStateToProps = state => {
  return {
    tasks: getTasksForActiveCategory(state),
    user: getActiveUser(state) || {},
    activeUserId: getActiveUserId(state),
    filter: getTasksFilter(state)
  };
};

const Tasks = connect(mapStateToProps, mapDispatchToProps)(TasksPage);

export default Tasks;
