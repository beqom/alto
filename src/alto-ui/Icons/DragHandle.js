import React from 'react';
import Icon from './Icon';

const DragHandle = props => (
  <Icon {...props}>
    {ownProps => (
      <g {...ownProps}>
        <path
          {...ownProps}
          d="M11.94,21a3,3,0,1,1,3-3A3,3,0,0,1,11.94,21Zm12.12,0a3,3,0,1,1,3-3A3,3,0,0,1,24.06,21Zm0,12a3,3,0,1,1,3-3A3,3,0,0,1,24.06,33ZM24.06,9a3,3,0,1,1,3-3A3,3,0,0,1,24.06,9ZM11.94,33a3,3,0,1,1,3-3A3,3,0,0,1,11.94,33ZM11.94,9a3,3,0,1,1,3-3A3,3,0,0,1,11.94,9Z"
        />
      </g>
    )}
  </Icon>
);

DragHandle.displayName = 'DragHandle';

export default DragHandle;
