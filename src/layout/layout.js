import React from 'react';
import Menu from '../menu/menu';
import NotificationBar from '../notifications/notifications';

const Layout = props =>
  <div>
    <Menu />
    <div
      style={{
        paddingTop: 64 + 'px',
        paddingBottom: 16 + 'px'
      }}
    >
      {props.children}
    </div>
    <NotificationBar />
  </div>;

export default Layout;
