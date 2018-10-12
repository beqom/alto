import React from 'react';
import Icon from './Icon';

const Undo = props => (
  <Icon {...props}>
    {ownProps => (
      <g transform="rotate(0, 18, 18)">
        <path
          {...ownProps}
          d="M20.87,11.14h-13l5.56-5.49A1,1,0,0,0,12,4.22L4,12.13,12,20a1,1,0,0,0,1.41-1.42L7.86,13.14h13a9.08,9.08,0,0,1,9.13,9,9,9,0,0,1-5,8A1,1,0,0,0,25.93,32a11,11,0,0,0-5.06-20.82Z"
        />
      </g>
    )}
  </Icon>
);

Undo.displayName = 'Undo';

export default Undo;
