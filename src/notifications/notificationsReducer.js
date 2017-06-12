import {
  TOGGLE_NOTIFICATION,
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
