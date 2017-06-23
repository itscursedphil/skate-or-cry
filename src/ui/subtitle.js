import React from 'react';

const Subtitle = ({ children }) =>
  <span
    style={{
      color: 'rgba(0, 0, 0, 0.3)',
      fontSize: 0.75 + 'em'
    }}
  >
    {children}
  </span>;

export default Subtitle;
