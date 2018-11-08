import React from 'react';
import Icon from './Icon';

const RowDensityComfortable = props => (
  <Icon {...props}>
    {ownProps => (
      <g>
        <path
          {...ownProps}
          d="M32,14 L4,14 C3.44771525,14 3,13.3284271 3,12.5 C3,11.6715729 3.44771525,11 4,11 L32,11 C32.5522847,11 33,11.6715729 33,12.5 C33,13.3284271 32.5522847,14 32,14 Z M32,26 L4,26 C3.44771525,26 3,25.3284271 3,24.5 C3,23.6715729 3.44771525,23 4,23 L32,23 C32.5522847,23 33,23.6715729 33,24.5 C33,25.3284271 32.5522847,26 32,26 Z"
        />
      </g>
    )}
  </Icon>
);

RowDensityComfortable.displayName = 'RowDensityComfortable';

export default RowDensityComfortable;
