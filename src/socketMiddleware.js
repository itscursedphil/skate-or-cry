import {
  LOGIN_USER_SUCCESS,
  LOGOUT_USER
} from "./authentication/authenticationActions";
import { addTransaction } from "./transactions/transactionsActions";
import { addCategory } from "./categories/categoriesActions";
import { addUser } from "./users/usersActions";
import { addTask } from "./tasks/tasksActions";
import { addAchievement } from "./achievements/achievementsActions";
import { updateTimestamp } from "./roulette/rouletteActions";
import { SET_INITIAL_STATE } from "./actions";
import { loginUserSuccess } from "./authentication/authenticationActions";

const socketMiddleware = () => {
  let socket;

  return ({ dispatch }) => next => action => {
    const initialize = () => {
      if (process.env.NODE_ENV === "development")
        console.log("Creating socket connection");

      socket = new WebSocket(
        "ws://skate-or-cry.northeurope.cloudapp.azure.com/"
        // "ws://192.168.178.41:80"
      );
      socket.onopen = e => console.log(e);
      socket.onmessage = e => transformMessageToAction(e);

      // setInterval(() => {
      //   if (socket && socket.readyState === 3) {
      //     fetch('/api/session', {
      //       method: 'get',
      //       credentials: 'same-origin'
      //     })
      //       .then(res => {
      //         if (res.status !== 200) return console.log(res);
      //         const data = res.json();
      //         dispatch(loginUserSuccess(data.username));
      //       })
      //       .catch(err => console.log(err));
      //   }
      // }, 1000 * 2);

      next(action);
    };

    const setInitialState = () => {
      // if (process.env.NODE_ENV === "development") {
      //   console.log("Set initial state");
      //   console.log(action);
      // }

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
      users.map(user => dispatch(addUser(user)));
      tasks.map(task => dispatch(addTask(task)));
      achievements.map(achievement => dispatch(addAchievement(achievement)));
      dispatch(updateTimestamp(roulette.timestamp));
    };

    const close = () => {
      socket.close();
      return next(action);
    };

    const transformMessageToAction = e => {
      const data = JSON.parse(e.data);

      // if (process.env.NODE_ENV === "development") {
      //   console.log("Transforming action");
      //   console.log("Event:", e);
      //   console.log("Data:", data);
      // }

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
    } else if (action.meta && action.meta.sender === "client") {
      if (process.env.NODE_ENV === "development") {
        console.log("Dispatching to server");
        console.log(action);
      }

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
