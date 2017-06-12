import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'material-ui/List';
import IconChecked from 'material-ui/svg-icons/toggle/check-box';
import IconUnchecked
  from 'material-ui/svg-icons/toggle/check-box-outline-blank';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';

const UsersListItem = (
  {
    onClick,
    nickName,
    fullName,
    avatar,
    checked = false,
    divider = true
  }
) => {
  return (
    <div>
      <ListItem
        onClick={onClick}
        primaryText={nickName}
        secondaryText={fullName}
        leftAvatar={<Avatar src={avatar} />}
        rightIcon={checked ? <IconChecked /> : <IconUnchecked />}
        // rightCheckbox={<Checkbox />}
      />
      {divider && <Divider />}
    </div>
  );
};

UsersListItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  nickName: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  divider: PropTypes.bool
};

export default UsersListItem;
