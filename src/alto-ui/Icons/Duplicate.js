import React from 'react';
import Icon from './Icon';

const Duplicate = props => (
  <Icon {...props}>
    {ownProps => (
      <g>
        <path
          {...ownProps}
          d="M12,27H5a1,1,0,0,1-1-1V5A1,1,0,0,1,5,4H21a1,1,0,0,1,1,1V7a1,1,0,0,1-2,0V6H6V25h6a1,1,0,0,1,0,2Z"
        />
        <path
          {...ownProps}
          d="M31,32H15a1,1,0,0,1-1-1V10a1,1,0,0,1,1-1H31a1,1,0,0,1,1,1V31A1,1,0,0,1,31,32ZM16,30H30V11H16Z"
        />
      </g>
    )}
  </Icon>
);

Duplicate.displayName = 'Duplicate';

export default Duplicate;
