export const ADD_TASK = 'ADD_TASK';
export const SET_TASKS_FILTER = 'SET_TASKS_FILTER';

export const addTask = ({ catId, comment, id, multiplier, points, title }) => {
  return {
    type: ADD_TASK,
    payload: {
      catId,
      comment,
      id,
      multiplier,
      points,
      title
    }
  };
};

export const setTasksFilter = filter => {
  return {
    type: SET_TASKS_FILTER,
    payload: {
      filter
    }
  };
};
