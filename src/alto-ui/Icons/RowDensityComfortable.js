import React from 'react';
import Icon from './Icon';

const RowDensityComfortable = props => (
  <Icon {...props}>
    {ownProps => (
      <g>
        <path
          {...ownProps}
          d="M32,26 L4,26 C3.44771525,26 3,25.5522847 3,25 C3,24.4477153 3.44771525,24 4,24 L32,24 C32.5522847,24 33,24.4477153 33,25 C33,25.5522847 32.5522847,26 32,26 Z M32,12 L4,12 C3.44771525,12 3,11.5522847 3,11 C3,10.4477153 3.44771525,10 4,10 L32,10 C32.5522847,10 33,10.4477153 33,11 C33,11.5522847 32.5522847,12 32,12 Z"
        />
      </g>
    )}
  </Icon>
);

RowDensityComfortable.displayName = 'RowDensityComfortable';

export default RowDensityComfortable;
