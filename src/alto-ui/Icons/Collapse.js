import React from 'react';
import Icon from './Icon';

const Collapse = props => (
  <Icon {...props}>
    {ownProps => (
      <g>
        <path {...ownProps} d="M32,15H22.41l9.25-9.25a1,1,0,0,0-1.41-1.41L21,13.59V4a1,1,0,0,0-2,0V17H32a1,1,0,0,0,0-2Z" />
        <path {...ownProps} d="M4,19a1,1,0,0,0,0,2h9.59L4.33,30.25a1,1,0,1,0,1.41,1.41L15,22.41V32a1,1,0,0,0,2,0V19Z" />
      </g>
    )}
  </Icon>
);

Collapse.displayName = 'Collapse';

export default Collapse;
