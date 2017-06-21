import React from 'react';
import Avatar from 'material-ui/Avatar';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import { ListItem } from 'material-ui/List';

const TransactionsListItem = ({ activeUserId, sender, receiver, ammount }) => {
  const type = activeUserId === sender.id
    ? 'sent'
    : activeUserId === receiver.id ? 'received' : '';
  return (
    <ListItem
      primaryText={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            src={
              type === 'sent'
                ? receiver.image
                : type === 'received' ? sender.image : ''
            }
          />
          <div style={{ paddingLeft: 16 + 'px', paddingRight: 16 + 'px' }}>
            <span
              style={{
                color: 'rgba(0, 0, 0, 0.3)',
                fontSize: 0.8 + 'em',
                marginBottom: 0.4 + 'em',
                display: 'inline-block'
              }}
            >
              {type === 'sent'
                ? `Gesendet an ${receiver.nickname}`
                : type === 'received' ? `Erhalten von ${sender.nickname}` : ''}
            </span>
            <br />
            {/* <Chip style={{ marginTop: 8 + 'px' }}> */}
            {ammount} Pts.
            {/* </Chip> */}
          </div>
          <ChevronRight style={{ marginLeft: 'auto' }} />
        </div>
      }
    />
  );
};

export default TransactionsListItem;
