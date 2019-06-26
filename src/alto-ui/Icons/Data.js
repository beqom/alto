import React from 'react';
import Icon from './Icon';

const Data = props => (
  <Icon {...props}>
    {ownProps => (
      <g>
        <rect {...ownProps} x="2" y="2" width="32" height="8" />
        <rect {...ownProps} x="2" y="12" width="32" height="8" />
        <path
          {...ownProps}
          d="M21,27v1a3,3,0,0,0,.77,2H2V22H25.18A2.77,2.77,0,0,0,25,23v1H24A3,3,0,0,0,21,27Z"
        />
        <path {...ownProps} d="M34,22v2.18A2.77,2.77,0,0,0,33,24H32V23a2.77,2.77,0,0,0-.18-1Z" />
        <path
          {...ownProps}
          d="M34,27v1a1,1,0,0,1-1,1H30v3a1,1,0,0,1-1,1H28a1,1,0,0,1-1-1V29H24a1,1,0,0,1-1-1V27a1,1,0,0,1,1-1h3V23a1,1,0,0,1,1-1h1a1,1,0,0,1,1,1v3h3A1,1,0,0,1,34,27Z"
        />
      </g>
    )}
  </Icon>
);

Data.displayName = 'Data';

export default Data;
