import { store } from "../index";
import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  loginUserSuccess
} from "./authenticationActions";

const authenticationMiddleware = () => {
  // fetch(
  //   // "http://skate-or-cry.northeurope.cloudapp.azure.com/api/session"
  //   "http://192.168.178.41:80/api/session",
  //   {
  //     method: "get",
  //     credentials: "same-origin",
  //     mode: "cors"
  //   }
  // )
  //   .then(res => {
  //     if (res.status !== 200) return console.log(res);
  //     const data = res.json();
  //     store.dispatch(loginUserSuccess(data.username));
  //   })
  //   .catch(err => console.log(err));

  return ({ dispatch }) => next => action => {
    //Call server if user tries to login
    if (action.type === LOGIN_USER_REQUEST) {
      return fetch(
        // "/api/login",
        "http://192.168.178.41:80/api/login",
        {
          method: "post",
          body: `user=${action.payload.username}&password=${
            action.payload.password
          }`,
          credentials: "include",
          mode: "cors"
        }
      )
        .then(res => {
          if (res.status !== 200) return console.log(res);

          dispatch(loginUserSuccess(action.payload.username));
        })
        .catch(err => console.log(err));
    }
    return next(action);
  };
};

export default authenticationMiddleware;
