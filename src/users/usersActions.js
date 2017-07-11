export const ADD_USER = 'ADD_USER';
export const SELECT_USER = 'SELECT_USER';
export const SET_USER_TASK_COMPLETED = 'SET_USER_TASK_COMPLETED';
export const SET_USER_TASK_UNCOMPLETED = 'SET_USER_TASK_UNCOMPLETED';

export const addUser = ({
  name,
  nickname,
  image,
  completedTasks,
  failedTasks,
  activeDailyTask,
  transactions,
  id
}) => {
  return {
    type: ADD_USER,
    payload: {
      name,
      nickname,
      image,
      completedTasks,
      failedTasks,
      activeDailyTask,
      transactions,
      id
    }
  };
};

export const selectUser = id => {
  return {
    type: SELECT_USER,
    payload: {
      id
    }
  };
};

export const setUserTaskCompleted = (taskId, userId, points) => {
  return {
    type: SET_USER_TASK_COMPLETED,
    payload: {
      userId,
      taskId,
      points
    }
  };
};

export const setUserTaskUncompleted = (taskId, userId) => {
  return {
    type: SET_USER_TASK_UNCOMPLETED,
    payload: {
      userId,
      taskId
    }
  };
};
