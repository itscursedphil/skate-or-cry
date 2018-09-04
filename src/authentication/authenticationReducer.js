import { LOGIN_USER_SUCCESS, LOGOUT_USER } from "./authenticationActions";

const initialState = {
  authenticated: false,
  username: null
};

const authentication = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        authenticated: true,
        username: action.payload.username
      };

    case LOGOUT_USER:
      return {
        ...state,
        authenticated: false,
        username: null
      };

    default:
      return state;
  }
};

export default authentication;
