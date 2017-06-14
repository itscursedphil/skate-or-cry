export const TOGGLE_NOTIFICATION = 'TOGGLE_NOTIFICATION';
export const OPEN_NOTIFICATION = 'OPEN_NOTIFICATION';
export const CLOSE_NOTIFICATION = 'CLOSE_NOTIFICATION';
export const SET_NOTIFICATION_MESSAGE = 'SET_NOTIFICATION_MESSAGE';

export const toggleNotification = () => {
  return {
    type: TOGGLE_NOTIFICATION
  };
};

export const openNotification = () => {
  return {
    type: OPEN_NOTIFICATION
  };
};

export const closeNotification = () => {
  return {
    type: CLOSE_NOTIFICATION
  };
};

export const setNoticationMessage = message => {
  return {
    type: SET_NOTIFICATION_MESSAGE,
    payload: {
      message
    }
  };
};
