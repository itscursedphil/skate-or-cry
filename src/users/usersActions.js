export const ADD_USER = "ADD_USER";
export const SELECT_USER = "SELECT_USER";
export const SET_USER_TASK_COMPLETED = "SET_USER_TASK_COMPLETED";
export const SET_USER_TASK_UNCOMPLETED = "SET_USER_TASK_UNCOMPLETED";
export const SET_USER_TASK_FAILED = "SET_USER_TASK_FAILED";
export const SET_USER_TASK_UNFAILED = "SET_USER_TASK_UNFAILED";
export const SET_USER_DAILY_TASK = "SET_USER_DAILY_TASK";
export const SET_USER_DAILY_TASK_COMPLETED = "SET_USER_DAILY_TASK_COMPLETED";
export const SET_USER_DAILY_TASK_UNCOMPLETED =
  "SET_USER_DAILY_TASK_UNCOMPLETED";

export const addUser = ({
  name,
  nickname,
  team,
  image,
  completedTasks,
  failedTasks,
  dailyTask,
  transactions,
  id
}) => {
  return {
    type: ADD_USER,
    payload: {
      name,
      nickname,
      team,
      image,
      completedTasks,
      failedTasks,
      dailyTask,
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

export const setUserTaskFailed = (taskId, userId, points) => {
  return {
    type: SET_USER_TASK_FAILED,
    payload: {
      taskId,
      userId,
      points
    }
  };
};

export const setUserTaskUnfailed = (taskId, userId, points) => {
  return {
    type: SET_USER_TASK_UNFAILED,
    payload: {
      taskId,
      userId,
      points
    }
  };
};

export const setUserDailyTask = (taskId, userId) => {
  return {
    type: SET_USER_DAILY_TASK,
    payload: {
      taskId,
      userId
    }
  };
};

export const setUserDailyTaskCompleted = userId => {
  return {
    type: SET_USER_DAILY_TASK_COMPLETED,
    payload: {
      userId
    }
  };
};

export const setUserDailyTaskUncompleted = userId => {
  return {
    type: SET_USER_DAILY_TASK_UNCOMPLETED,
    payload: {
      userId
    }
  };
};
