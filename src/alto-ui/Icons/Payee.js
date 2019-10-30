import React from 'react';
import Icon from './Icon';

const Payee = props => (
  <Icon {...props}>
    {ownProps => (
      <g>
        <path {...ownProps} d="M18,20.88c-4.88,0-9.55,1.22-9.55,4.74v1.93c0,.25.35.45.77.45H26.78c.42,0,.77-.2.77-.45V25.62c0-3.52-4.67-4.74-9.55-4.74" />
        <path {...ownProps} d="M18,7a6,6,0,1,0,6,6,6,6,0,0,0-6-6" />
      </g>
    )}
  </Icon>
);

Payee.displayName = 'Payee';

export default Payee;
