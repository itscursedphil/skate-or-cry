import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './App';
import reducer from './reducer';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import authenticationMiddleware from './authentication/authenticationMiddleware';
import socketMiddleware from './socketMiddleware';
import { loginUserSuccess } from './authentication/authenticationActions';

const middlewares = [authenticationMiddleware(), socketMiddleware()];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

let store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);

if (process.env.NODE_ENV === 'production') {
  fetch('/api/session', {
    method: 'get',
    credentials: 'same-origin'
  })
    .then(res => {
      if (res.status !== 200) return console.log(res);
      const data = res.json();
      store.dispatch(loginUserSuccess(data.username));
    })
    .catch(err => console.log(err));
} else {
  store.dispatch(loginUserSuccess('schlong'));
}

injectTapEventPlugin();

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();

const preloader = document.getElementById('preloader');
if (process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () =>
    setTimeout(() => (preloader.style.display = 'none'), 2000)
  );
} else {
  preloader.style.display = 'none';
}
