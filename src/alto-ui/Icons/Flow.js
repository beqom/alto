import React from 'react';
import Icon from './Icon';

const Flow = props => (
  <Icon {...props}>
    {ownProps => (
      <g>
        <polygon {...ownProps} points="2 11 2 24 10 17 2 11" />
        <polygon {...ownProps} points="14 11 14 24 22 17 14 11" />
        <polygon {...ownProps} points="26 11 26 24 34 17 26 11" />
      </g>
    )}
  </Icon>
);

Flow.displayName = 'Flow';

export default Flow;
