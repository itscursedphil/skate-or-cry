import { combineReducers } from 'redux';
import users from './users/usersReducer';
import categories from './categories/categoriesReducer';
import tasks from './tasks/tasksReducer';
import notifications from './notifications/notificationsReducer';
import transactions from './transactions/transactionsReducer';
import achievements from './achievements/achievementsReducer';

const reducer = combineReducers({
  users,
  categories,
  tasks,
  notifications,
  transactions,
  achievements
});

export default reducer;
