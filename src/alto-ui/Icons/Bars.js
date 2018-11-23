import React from 'react';
import Icon from './Icon';

const Bars = props => (
  <Icon {...props}>
    {ownProps => (
      <g>
        <path {...ownProps} d="M32,29H4a1,1,0,0,1,0-2H32a1,1,0,0,1,0,2Z" />
        <path {...ownProps} d="M32,19H4a1,1,0,0,1,0-2H32a1,1,0,0,1,0,2Z" />
        <path {...ownProps} d="M32,9H4A1,1,0,0,1,4,7H32a1,1,0,0,1,0,2Z" />
      </g>
    )}
  </Icon>
);

Bars.displayName = 'Bars';

export default Bars;
