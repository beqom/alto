import React from 'react';
import Icon from './Icon';

const Pergamen = props => (
  <Icon {...props}>
    {ownProps => (
      <g>
        <path {...ownProps} d="M31,8a4,4,0,0,0-4-4V4l0,0H11a3.51,3.51,0,0,1,2.37,1.47A3.76,3.76,0,0,1,14.07,8ZM12.86,9,13,8.38a2.92,2.92,0,0,0-.44-2.3s0,0,0,0a2,2,0,0,0-3.38.76A3.83,3.83,0,0,0,9,8V30a.5.5,0,0,1-1,0V26H4a6.51,6.51,0,0,0,1.46,4.54A5,5,0,0,0,9,32H23a4,4,0,0,0,4-4V9ZM23,27H13a1,1,0,0,1,0-2H23a1,1,0,0,1,0,2Zm0-6H13a1,1,0,0,1,0-2H23a1,1,0,0,1,0,2Zm0-6H13a1,1,0,0,1,0-2H23a1,1,0,0,1,0,2Z" />
      </g>
    )}
  </Icon>
);

Pergamen.displayName = 'Pergamen';

export default Pergamen;