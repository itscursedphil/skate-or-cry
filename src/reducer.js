import { combineReducers } from 'redux';
import users from './users/usersReducer';
import categories from './categories/categoriesReducer';
import tasks from './tasks/tasksReducer';
import notifications from './notifications/notificationsReducer';
import transactions from './transactions/transactionsReducer';

const reducer = combineReducers({
  users,
  categories,
  tasks,
  notifications,
  transactions
});

export default reducer;
