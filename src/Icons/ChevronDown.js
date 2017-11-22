import React from 'react';
import Icon from './Icon';

const ChevronDown = props => (
  <Icon {...props}>
    {ownProps => (
      <g transform="rotate(180, 18, 18)">
        <path
          {...ownProps}
          d="M29.52,22.52,18,10.6,6.48,22.52a1.7,1.7,0,0,0,2.45,2.36L18,15.49l9.08,9.39a1.7,1.7,0,0,0,2.45-2.36Z"
        />
      </g>
    )}
  </Icon>
);

ChevronDown.displayName = 'ChevronDown';

export default ChevronDown;
