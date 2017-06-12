import { combineReducers } from 'redux';
import users from './users/usersReducer';
import notifications from './notifications/notificationsReducer';

const reducer = combineReducers({
  users,
  notifications
});

export default reducer;
