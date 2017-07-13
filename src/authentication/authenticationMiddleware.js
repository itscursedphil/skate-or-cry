import { store } from '../index';
import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  loginUserSuccess
} from './authenticationActions';

const authenticationMiddleware = () => {
  //Make request to see if cookie exists and user already has a session on the server
  // if (process.env.NODE_ENV === 'production') {
  //   fetch('/api/session', {
  //     method: 'get',
  //     credentials: 'same-origin'
  //   })
  //     .then(res => {
  //       if (res.status !== 200) return console.log(res);
  //       const data = res.json();
  //       store.dispatch(loginUserSuccess(data.username));
  //     })
  //     .catch(err => console.log(err));
  // } else {
  //   store.dispatch(loginUserSuccess('schlong'));
  // }

  if (process.env.NODE_ENV === 'development') {
    console.log('Environment: ', process.env.NODE_ENV);
  }

  return ({ dispatch }) => next => action => {
    //Call server if user tries to login
    if (action.type === LOGIN_USER_REQUEST) {
      if (process.env.NODE_ENV !== 'development') {
        return fetch('/api/login', {
          method: 'post',
          body: `user=${action.payload.username}&password=${action.payload
            .password}`,
          credentials: 'same-origin'
        })
          .then(res => {
            if (res.status !== 200) return console.log(res);

            dispatch(loginUserSuccess(action.payload.username));
          })
          .catch(err => console.log(err));
      } else {
        dispatch(loginUserSuccess(action.payload.username));
      }
    }
    return next(action);
  };
};

export default authenticationMiddleware;
