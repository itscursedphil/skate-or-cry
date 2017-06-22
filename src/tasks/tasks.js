import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List } from 'material-ui/List';
import { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import {
  setUserTaskCompleted,
  setUserTaskUncompleted
} from '../users/usersActions';
import { setTasksFilter } from './tasksActions';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import PageWarning from '../ui/pageWarning';
import { getTasksForActiveCategory, getTasksFilter } from './tasksUtils';
import { getActiveUser, getActiveUserId } from '../users/usersUtils';
import { getActiveCategoryId } from '../categories/categoriesUtils';

const TasksPage = ({
  tasks,
  user,
  activeUserId,
  onTaskClicked,
  filter,
  setFilter
}) =>
  <PageWarning users categories>
    <Container>
      <Row>
        <Col>
          <SelectField
            floatingLabelText="Filter"
            value={filter}
            onChange={(e, i, v) => setFilter(v)}
            fullWidth
          >
            <MenuItem value={'all'} primaryText="Alle" />
            <Divider />
            <MenuItem value={'completed'} primaryText="Erledigt" />
            <Divider />
            <MenuItem value={'uncompleted'} primaryText="Unerledigt" />
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
            const isCompleted =
              user.completed.filter(c => c.id === task.id).length > 0;

            if (
              filter === 'all' ||
              (filter === 'completed' && isCompleted) ||
              (filter === 'uncompleted' && !isCompleted)
            ) {
              return (
                <span key={task.id}>
                  <ListItem
                    onClick={e => {
                      e.preventDefault();
                      onTaskClicked(
                        task.id,
                        activeUserId,
                        task.points,
                        isCompleted
                      );
                    }}
                    primaryText={task.title}
                    secondaryText={
                      <div>
                        <strong>{task.points} Punkte</strong>
                        {task.comment.length ? ` - ${task.comment}` : ''}
                      </div>
                    }
                    leftCheckbox={<Checkbox checked={isCompleted} />}
                    // rightIcon={
                    //   isCompleted ? <IconChecked /> : <IconUnchecked />
                    // }
                    style={{
                      // backgroundColor: isCompleted ? '#ececec' : 'transparent'
                      opacity: isCompleted ? 0.4 : 1
                    }}
                  />
                  <Divider />
                </span>
              );
            } else {
              return null;
            }
          })}
        </List>
      </Row>
    </Container>
  </PageWarning>;

TasksPage.propTypes = {
  tasks: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  activeUserId: PropTypes.number.isRequired,
  onTaskClicked: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    onTaskClicked: (taskId, userId, points, completed) => {
      if (!completed) {
        return dispatch(setUserTaskCompleted(taskId, userId, points));
      } else if (completed) {
        return dispatch(setUserTaskUncompleted(taskId, userId));
      }
    },
    setFilter: filter => {
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
