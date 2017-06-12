import { SELECT_USER } from './usersActions';
import API from '../api.json';

const initialState = {
  all: API.users,
  active: -1
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_USER:
      return {
        ...state,
        active: action.payload.id
      };

    default:
      return state;
  }
};

export default users;
