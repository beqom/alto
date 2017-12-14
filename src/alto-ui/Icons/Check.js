import React from 'react';
import Icon from './Icon';

const Check = props => (
  <Icon {...props}>
    {ownProps => (
      <path
        {...ownProps}
        d="M13.72,27.69,3.29,17.27a1,1,0,0,1,1.41-1.41l9,9L31.29,7.29a1,1,0,0,1,1.41,1.41Z"
      />
    )}
  </Icon>
);

Check.displayName = 'Check';

export default Check;
