import {
  LOGIN_USER_SUCCESS,
  LOGOUT_USER
} from './authentication/authenticationActions';
import { addTransaction } from './transactions/transactionsActions';
import { addCategory } from './categories/categoriesActions';
import { addUser } from './users/usersActions';
import { addTask } from './tasks/tasksActions';
import { addAchievement } from './achievements/achievementsActions';
import { updateTimestamp } from './roulette/rouletteActions';
import { SET_INITIAL_STATE } from './actions';

const socketMiddleware = () => {
  let socket;

  return ({ dispatch }) => next => action => {
    const initialize = () => {
      console.log('Creating socket connection');
      socket = new WebSocket('ws://martingawlita.dyndns.org/');
      socket.onopen = e => console.log(e);
      socket.onmessage = e => transformMessageToAction(e);
      next(action);
    };

    const setInitialState = () => {
      console.log('Set initial state');
      console.log(action);
      const {
        transactions,
        users,
        categories,
        tasks,
        achievements,
        roulette
      } = action.payload;
      transactions.map(transaction => dispatch(addTransaction(transaction)));
      categories.map(category => dispatch(addCategory(category)));
      users.map(user => {
        if (user.name === 'Philip Plagge') {
          return dispatch(
            addUser({
              ...user,
              nickname: 'Schlong'
            })
          );
        } else {
          return dispatch(addUser(user));
        }
      });
      tasks.map(task => dispatch(addTask(task)));
      achievements.map(achievement => dispatch(addAchievement(achievement)));
      dispatch(updateTimestamp(roulette.timestamp));
    };

    const close = () => {
      socket.close();
      return next(action);
    };

    const transformMessageToAction = e => {
      console.log('Transforming action');
      console.log('Event:', e);
      const data = JSON.parse(e.data);
      console.log('Data:', data);
      if (data.meta.success) {
        dispatch({
          type: data.type,
          payload: data.payload
        });
      }
    };

    if (action.type === LOGIN_USER_SUCCESS) {
      return initialize();
    } else if (action.type === SET_INITIAL_STATE) {
      return setInitialState();
    } else if (action.type === LOGOUT_USER) {
      return close();
    } else if (action.meta && action.meta.sender === 'client') {
      console.log('Dispatching to server');
      console.log(action);
      return socket.send(
        JSON.stringify({
          type: action.type,
          payload: action.payload
        })
      );
    }
    return next(action);
  };
};

export default socketMiddleware;
