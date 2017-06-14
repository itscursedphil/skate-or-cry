import {
  TOGGLE_NOTIFICATION,
  OPEN_NOTIFICATION,
  CLOSE_NOTIFICATION,
  SET_NOTIFICATION_MESSAGE
} from './notificationsActions';

const initialState = {
  message: '',
  open: false
};

const notifications = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_NOTIFICATION:
      return {
        ...state,
        open: !state.open
      };

    case OPEN_NOTIFICATION:
      return {
        ...state,
        open: true
      };

    case CLOSE_NOTIFICATION:
      return {
        ...state,
        open: false
      };

    case SET_NOTIFICATION_MESSAGE:
      return {
        ...state,
        message: action.payload.message
      };

    default:
      return state;
  }
};

export default notifications;
