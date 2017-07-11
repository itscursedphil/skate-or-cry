export const getUsers = state => [...state.users.all];

export const getUserById = (state, id) =>
  getUsers(state).find(user => user.id === id);

export const getUserCompletedTasks = (state, userId) => [
  ...getUserById(state, userId).completedTasks
];

export const getActiveUserCompletedTasks = state =>
  getUserCompletedTasks(state, getActiveUserId(state));

export const getActiveUserId = state => state.users.active;

export const getActiveUser = state =>
  getUserById(state, getActiveUserId(state));

export const userTaskIsCompleted = (state, userId, taskId) =>
  getUserCompletedTasks(state, userId).filter(task => task.id === taskId)
    .length > 0;

export const activeUserTaskIsCompleted = (state, taskId) =>
  userTaskIsCompleted(state, getActiveUserId(state), taskId);

export const getActiveUserTransactions = state => [
  ...getActiveUser(state).transactions
];
