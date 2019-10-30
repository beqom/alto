import React from 'react';
import Icon from './Icon';

const Department = props => (
  <Icon {...props}>
    {ownProps => (
      <g>
        <polygon
          {...ownProps}
          points="23.08 17 26.54 17 28.27 14 26.54 11 23.08 11 21.34 14 23.08 17"
        />
        <polygon
          {...ownProps}
          points="16.27 21 19.73 21 21.46 18 19.73 15 16.27 15 14.54 18 16.27 21"
        />
        <polygon
          {...ownProps}
          points="23.08 25 26.54 25 28.27 22 26.54 19 23.08 19 21.34 22 23.08 25"
        />
        <polygon
          {...ownProps}
          points="9.46 17 12.92 17 14.65 14 12.92 11 9.46 11 7.73 14 9.46 17"
        />
        <polygon
          {...ownProps}
          points="9.46 25 12.92 25 14.65 22 12.92 19 9.46 19 7.73 22 9.46 25"
        />
        <polygon
          {...ownProps}
          points="16.27 29 19.73 29 21.46 26 19.73 23 16.27 23 14.54 26 16.27 29"
        />
        <polygon
          {...ownProps}
          points="16.27 13 19.73 13 21.46 10 19.73 7 16.27 7 14.54 10 16.27 13"
        />
      </g>
    )}
  </Icon>
);

Department.displayName = 'Department';

export default Department;
