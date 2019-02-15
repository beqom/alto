import React from 'react';
import Icon from './Icon';

const DropdownIcon = props => (
  <Icon {...props}>
    {ownProps => (
      <path {...ownProps} d="M26.8,15H9.56l9,9ZM18,33A15,15,0,1,1,33,18,15,15,0,0,1,18,33Z" />
    )}
  </Icon>
);

export default DropdownIcon;
