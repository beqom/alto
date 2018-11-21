import React from 'react';
import Icon from './Icon';

const DragHandle = props => (
  <Icon {...props}>
    {ownProps => (
      <g {...ownProps} transform="rotate(0, 18, 18)">
        <circle cx="15" cy="12" r="1.5" />
        <circle cx="15" cy="24" r="1.5" />
        <circle cx="21" cy="12" r="1.5" />
        <circle cx="21" cy="24" r="1.5" />
        <circle cx="21" cy="18" r="1.5" />
        <circle cx="15" cy="18" r="1.5" />
      </g>
    )}
  </Icon>
);

DragHandle.displayName = 'DragHandle';

export default DragHandle;
