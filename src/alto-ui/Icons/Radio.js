import React from 'react';
import Icon from './Icon';

const Radio = props => (
  <Icon {...props}>
    {ownProps => (
      <g>
        <path
          {...ownProps}
          d="M18,3A15,15,0,1,0,33,18,15,15,0,0,0,18,3Zm-.47,28.12C10.55,31.12,4.88,25,4.88,18S10.55,4.88,17.53,4.88,31.12,11,31.12,18,24.51,31.12,17.53,31.12Z"
        />
        <circle cx="18" cy="18" r="6.85" />
      </g>
    )}
  </Icon>
);

export default Radio;
