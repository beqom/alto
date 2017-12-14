import React from 'react';
import Icon from './Icon';

const EllipsisHorizontal = props => (
  <Icon {...props}>
    {ownProps => (
      <g>
        <circle {...ownProps} cx="31.1" cy="18" r="2.9" />
        <circle {...ownProps} cx="18" cy="18" r="2.9" />
        <circle {...ownProps} cx="4.9" cy="18" r="2.9" />
      </g>
    )}
  </Icon>
);

EllipsisHorizontal.displayName = 'EllipsisHorizontal';

export default EllipsisHorizontal;
