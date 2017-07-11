import API from '../api.json';
import { SET_TASKS_FILTER, ADD_TASK } from './tasksActions';

// const initialState = {
//   all: API.tasks,
//   filter: 'all'
// };

const initialState = {
  all: [],
  filter: 'all'
};

const tasks = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        all: [
          ...state.all,
          {
            ...action.payload
          }
        ]
      };

    case SET_TASKS_FILTER:
      return {
        ...state,
        filter: action.payload.filter
      };

    default:
      return state;
  }
};

export default tasks;
