export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGOUT_USER = 'LOGOUT_USER';

export const loginUserRequest = (username, password) => {
  return {
    type: LOGIN_USER_REQUEST,
    payload: {
      username,
      password
    }
  };
};

export const loginUserSuccess = username => {
  return {
    type: LOGIN_USER_SUCCESS,
    payload: {
      username
    }
  };
};

export const logoutUser = () => {
  return {
    type: LOGOUT_USER
  };
};
