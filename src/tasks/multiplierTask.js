import React from 'react';
import { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import ArrowUpIcon from 'material-ui/svg-icons/navigation/arrow-drop-up';
import ArrowDownIcon from 'material-ui/svg-icons/navigation/arrow-drop-down';
import Subtitle from '../ui/subtitle';

const MultiplierTask = ({
  title,
  points,
  comment,
  count,
  onIncrement,
  onDecrement
}) =>
  <span>
    <ListItem
      primaryText={
        <div
          style={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <div
            style={{
              width: 56 + 'px',
              flexShrink: 0
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: 24 + 'px',
                overflow: 'visible'
              }}
            >
              <span onClick={onIncrement}><ArrowUpIcon /></span>
              <span>{count}</span>
              <span onClick={onDecrement}><ArrowDownIcon /></span>
            </div>
          </div>
          <div>
            <div>{title}</div>
            <Subtitle>
              <strong>{points} Punkte</strong>
              {comment.length ? ` - ${comment}` : ''}
            </Subtitle>
          </div>
        </div>
      }
    />
    <Divider />
  </span>;

export default MultiplierTask;
