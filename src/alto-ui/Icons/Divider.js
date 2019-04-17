import React from 'react';
import Icon from './Icon';

const Divider = props => (
  <Icon {...props}>
    {ownProps => (
      <g>
        <path
          {...ownProps}
          d="M25,22v7a1,1,0,0,1-1,1H12a1,1,0,0,1-1-1V22a1,1,0,0,0-1-1h0a1,1,0,0,0-1,1v9a1,1,0,0,0,1,1H26a1,1,0,0,0,1-1V22a1,1,0,0,0-1-1h0A1,1,0,0,0,25,22ZM9,5v9a1,1,0,0,0,1,1h0a1,1,0,0,0,1-1V7a1,1,0,0,1,1-1H24a1,1,0,0,1,1,1v7a1,1,0,0,0,1,1h0a1,1,0,0,0,1-1V5a1,1,0,0,0-1-1H10A1,1,0,0,0,9,5Z"
        />
        <rect {...ownProps} x="4" y="17" width="28" height="2" rx="1" />
      </g>
    )}
  </Icon>
);

Divider.displayName = 'Divider';

export default Divider;
