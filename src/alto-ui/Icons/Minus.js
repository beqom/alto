import React from 'react';
import Icon from './Icon';

const Minus = props => (
  <Icon {...props}>
    {ownProps => (
      <g>
        <path {...ownProps} d="M26,17H10a1,1,0,0,0,0,2H26a1,1,0,0,0,0-2Z" />
      </g>
    )}
  </Icon>
);

Minus.displayName = 'Minus';

export default Minus;
