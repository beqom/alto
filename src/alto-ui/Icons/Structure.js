import React from 'react';
import Icon from './Icon';

const Structure = props => (
  <Icon {...props}>
    {ownProps => <path {...ownProps} d="M18,7,8,14.3V28h7.27V21h5.46v7H28V14.3Z" />}
  </Icon>
);

Structure.displayName = 'Structure';

export default Structure;
