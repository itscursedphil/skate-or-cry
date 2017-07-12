import React from 'react';
import { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import Subtitle from '../ui/subtitle';
import NotificationIcon from 'material-ui/svg-icons/social/notifications-active';

const SimpleTask = ({ onClick, title, points, comment, isChecked, tba }) =>
  <span>
    <ListItem
      onClick={onClick}
      primaryText={
        <div
          style={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <span>
              {title}
            </span>
            <Subtitle>
              <strong>{points} Punkte</strong>
              {comment.length ? ` - ${comment}` : ''}
            </Subtitle>
          </div>
          {tba
            ? <span style={{ marginLeft: 'auto' }}>
                <NotificationIcon />
              </span>
            : null}
        </div>
      }
      leftCheckbox={<Checkbox checked={isChecked} />}
      style={{
        opacity: isChecked ? 0.4 : 1
      }}
    />
    <Divider />
  </span>;

export default SimpleTask;
