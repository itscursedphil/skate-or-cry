import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import Checkbox from 'material-ui/Checkbox';
import Subtitle from '../ui/subtitle';

const UsersListItem = ({
  onClick,
  nickName,
  fullName,
  avatar,
  checked = false,
  divider = true
}) => {
  return (
    <div>
      <ListItem
        onClick={onClick}
        primaryText={
          <div>
            {nickName}<br />
            <Subtitle>{fullName}</Subtitle>
          </div>
        }
        rightAvatar={<Avatar src={avatar} />}
        leftCheckbox={<Checkbox checked={checked} />}
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
