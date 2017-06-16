import React from 'react';
import { Link } from 'react-router-dom';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import MenuItemUI from 'material-ui/MenuItem';

const MenuItem = ({ link, label, icon, onClick }) =>
  <Link to={link}>
    <MenuItemUI
      onTouchTap={onClick}
      leftIcon={icon}
      rightIcon={<ChevronRight />}
    >
      {label}
    </MenuItemUI>
  </Link>;

export default MenuItem;
