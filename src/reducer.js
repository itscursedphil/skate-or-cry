import { combineReducers } from 'redux';
import users from './users/usersReducer';
import categories from './categories/categoriesReducer';
import tasks from './tasks/tasksReducer';
import notifications from './notifications/notificationsReducer';

const reducer = combineReducers({
  users,
  categories,
  tasks,
  notifications
});

export default reducer;
