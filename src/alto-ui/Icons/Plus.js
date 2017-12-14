import React from 'react';
import Icon from './Icon';

const Plus = props => (
  <Icon {...props}>
    {ownProps => (
      <g>
        <path
          {...ownProps}
          d="M30,17H19V6a1,1,0,1,0-2,0V17H6a1,1,0,0,0-1,1,.91.91,0,0,0,1,.94H17V30a1,1,0,1,0,2,0V19H30a1,1,0,0,0,1-1A1,1,0,0,0,30,17Z"
        />
      </g>
    )}
  </Icon>
);

Plus.displayName = 'Plus';

export default Plus;
