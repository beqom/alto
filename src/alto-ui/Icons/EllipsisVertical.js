import React from 'react';
import Icon from './Icon';

const EllipsisVertical = props => (
  <Icon {...props}>
    {ownProps => (
      <g>
        <circle {...ownProps} cx="18" cy="4.9" r="2.9"  />
        <circle {...ownProps} cx="18" cy="18" r="2.9"  />
        <circle {...ownProps} cx="18" cy="31.1" r="2.9"  />
      </g>
    )}
  </Icon>
);

EllipsisVertical.displayName = 'EllipsisVertical';

export default EllipsisVertical;
