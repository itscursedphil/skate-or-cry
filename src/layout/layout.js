import React from 'react';
import Menu from '../menu/menu';
import NotificationBar from '../notifications/notifications';

const Layout = props => (
  <div>
    <Menu />
    {props.children}
    <NotificationBar />
  </div>
);

export default Layout;
