export const SET_TASKS_FILTER = 'SET_TASKS_FILTER';

export const setTasksFilter = filter => {
  return {
    type: SET_TASKS_FILTER,
    payload: {
      filter
    }
  };
};
