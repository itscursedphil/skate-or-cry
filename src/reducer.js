import { combineReducers } from 'redux';
import { SET_PAGE_TITLE } from './actions';
import users from './users/usersReducer';
import categories from './categories/categoriesReducer';
import tasks from './tasks/tasksReducer';
import notifications from './notifications/notificationsReducer';
import transactions from './transactions/transactionsReducer';
import achievements from './achievements/achievementsReducer';
import authentication from './authentication/authenticationReducer';
import roulette from './roulette/rouletteReducer';

const inititalState = {
  pageTitle: ''
};

const app = (state = inititalState, action) => {
  switch (action.type) {
    case SET_PAGE_TITLE:
      return {
        ...state,
        pageTitle: action.payload.title
      };

    default:
      return state;
  }
};

const reducer = combineReducers({
  app,
  users,
  categories,
  tasks,
  notifications,
  transactions,
  achievements,
  authentication,
  roulette
});

export default reducer;
