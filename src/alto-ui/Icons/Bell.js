import React from 'react';
import Icon from './Icon';

const Bell = props => (
  <Icon {...props}>
    {ownProps => (
      <g>
        <path
          {...ownProps}
          d="M9.59,22.52a2.61,2.61,0,0,0,3.66,3.66Zm21-19.27-.91.91a10.63,10.63,0,0,0-14,1L12.24,8.58A12.56,12.56,0,0,1,8,11a14.42,14.42,0,0,1-3.76.32l-.45,0-2,2L22.53,34l2-2,0-.45a14.21,14.21,0,0,1,.29-3.79,12.38,12.38,0,0,1,2.41-4.29l3.44-3.44A10.65,10.65,0,0,0,31.53,6l.89-.9a1.32,1.32,0,1,0-1.86-1.86Z"
        />
      </g>
    )}
  </Icon>
);

Bell.displayName = 'Bell';

export default Bell;
