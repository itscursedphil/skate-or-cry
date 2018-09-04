import {
  ADD_USER,
  SELECT_USER,
  SET_USER_TASK_COMPLETED,
  SET_USER_TASK_UNCOMPLETED,
  SET_USER_TASK_FAILED,
  SET_USER_TASK_UNFAILED,
  SET_USER_DAILY_TASK,
  SET_USER_DAILY_TASK_COMPLETED,
  SET_USER_DAILY_TASK_UNCOMPLETED
} from "./usersActions";

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
          let deleted = false;
          return {
            ...user,
            completedTasks: user.completedTasks.filter(task => {
              const isTask = task.id === action.payload.taskId;
              const keepTask = !isTask || !(isTask && !deleted);
              if (isTask) {
                deleted = true;
              }
              return keepTask;
            })
          };
        })
      };

    case SET_USER_TASK_FAILED:
      return {
        ...state,
        all: state.all.map(user => {
          if (user.id !== action.payload.userId) return user;
          return {
            ...user,
            failedTasks: [
              ...user.failedTasks,
              {
                id: action.payload.taskId,
                points: action.payload.points
              }
            ]
          };
        })
      };

    case SET_USER_TASK_UNFAILED:
      return {
        ...state,
        all: state.all.map(user => {
          if (user.id !== action.payload.userId) return user;
          let deleted = false;
          return {
            ...user,
            failedTasks: user.failedTasks.filter(task => {
              const isTask = task.id === action.payload.taskId;
              const isPoints = task.points === action.payload.points;
              const keepTask =
                !isTask || !isPoints || !(isTask && isPoints && !deleted);
              if (isTask && isPoints) {
                deleted = true;
              }
              return keepTask;
            })
          };
        })
      };

    case SET_USER_DAILY_TASK:
      return {
        ...state,
        all: state.all.map(user => {
          if (user.id !== action.payload.userId) return user;
          return {
            ...user,
            dailyTask: {
              taskId: action.payload.taskId,
              completed: false
            }
          };
        })
      };

    case SET_USER_DAILY_TASK_COMPLETED:
      return {
        ...state,
        all: state.all.map(user => {
          if (user.id !== action.payload.userId) return user;
          return {
            ...user,
            dailyTask: {
              ...user.dailyTask,
              completed: true
            }
          };
        })
      };

    case SET_USER_DAILY_TASK_UNCOMPLETED:
      return {
        ...state,
        all: state.all.map(user => {
          if (user.id !== action.payload.userId) return user;
          return {
            ...user,
            dailyTask: {
              ...user.dailyTask,
              completed: false
            }
          };
        })
      };

    default:
      return state;
  }
};

export default users;
