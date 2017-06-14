import API from '../api.json';
import { SET_TASKS_FILTER } from './tasksActions';

const initialState = {
  all: API.tasks,
  filter: 'all'
};

const tasks = (state = initialState, action) => {
  switch (action.type) {
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
