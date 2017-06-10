import React from 'react';
import Menu from '../menu/menu';

const Layout = props => (
  <div>
    <Menu />
    {props.children}
  </div>
);

export default Layout;
