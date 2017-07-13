import React from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';

const Subtitle = ({ children, muiTheme }) =>
  <span
    style={{
      color: muiTheme.palette.disabledColor,
      fontSize: 0.75 + 'em'
    }}
  >
    {children}
  </span>;

export default muiThemeable()(Subtitle);
