import {
  ADD_USER,
  SELECT_USER,
  SET_USER_TASK_COMPLETED,
  SET_USER_TASK_UNCOMPLETED
} from './usersActions';
import API from '../api.json';

// const initialState = {
//   all: API.users.sort((nameA, nameB) => {
//     const nicknameA = nameA.nickname;
//     const nicknameB = nameB.nickname;
//
//     return nicknameA > nicknameB;
//   }),
//   active: -1
// };

const initialState = {
  all: [],
  active: -1
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        all: [...state.all, action.payload]
      };
    case SELECT_USER:
      return {
        ...state,
        active: action.payload.id
      };

    case SET_USER_TASK_COMPLETED:
      return {
        ...state,
        all: state.all.map(user => {
          if (user.id !== action.payload.userId) return user;
          return {
            ...user,
            completedTasks: [
              ...user.completedTasks,
              {
                id: action.payload.taskId,
                points: action.payload.points
              }
            ]
          };
        })
      };

    case SET_USER_TASK_UNCOMPLETED:
      return {
        ...state,
        all: state.all.map(user => {
          if (user.id !== action.payload.userId) return user;
          return {
            ...user,
            completedTasks: user.completedTasks.filter(
              task => task.id !== action.payload.taskId
            )
          };
        })
      };

    default:
      return state;
  }
};

export default users;
