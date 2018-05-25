import React from 'react';
import Icon from './Icon';

const Unknown = props => (
  <Icon {...props}>
    {ownProps => (
      <g>
        <circle {...ownProps} cx="17.58" cy="26.23" r="1.4" />
        <path
          {...ownProps}
          d="M24.7,13a5.18,5.18,0,0,0-2.16-3.56,7.26,7.26,0,0,0-5.71-1.09A11.34,11.34,0,0,0,12,10.44,1,1,0,1,0,13.26,12a9.32,9.32,0,0,1,3.94-1.72,5.29,5.29,0,0,1,4.16.74,3.21,3.21,0,0,1,1.35,2.19c.33,2.69-3.19,3.75-5.32,4.14l-.82.15v4.36a1,1,0,0,0,2,0V19.17C24.61,17.79,24.88,14.41,24.7,13Z"
        />
      </g>
    )}
  </Icon>
);

Unknown.displayName = 'Unknown';

export default Unknown;
