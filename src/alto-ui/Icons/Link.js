import React from 'react';
import Icon from './Icon';

const Link = props => (
  <Icon {...props}>
    {ownProps => (
      <g>
        <path
          {...ownProps}
          d="M10,31a5,5,0,0,1-3.54-8.54l5.18-5.17a1,1,0,0,1,1.41,0,1,1,0,0,1,0,1.42L7.88,23.88a3,3,0,0,0,0,4.24,3.08,3.08,0,0,0,4.24,0L19.29,21a3,3,0,0,0,0-4.24,1,1,0,0,1,1.42-1.42,5,5,0,0,1,0,7.07l-7.17,7.18A5,5,0,0,1,10,31Z"
        />
        <path
          {...ownProps}
          d="M16.5,20.5a1,1,0,0,1-.71-.29,5,5,0,0,1,0-7.07l5.92-5.92a5,5,0,0,1,7.07,7.07l-4.42,4.42a1,1,0,0,1-1.41,0,1,1,0,0,1,0-1.42l4.41-4.41a3,3,0,1,0-4.24-4.24l-5.91,5.91a3,3,0,0,0,0,4.24,1,1,0,0,1,0,1.42A1,1,0,0,1,16.5,20.5Z"
        />
      </g>
    )}
  </Icon>
);

Link.displayName = 'Link';

export default Link;
