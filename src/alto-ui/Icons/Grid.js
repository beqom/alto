import React from 'react';
import Icon from './Icon';

const Grid = props => (
  <Icon {...props}>
    {ownProps => (
      <g>
        <rect {...ownProps} x="2" y="4" width="15" height="12" rx="1" />
        <rect {...ownProps} x="19" y="4" width="15" height="12" rx="1" />
        <rect {...ownProps} x="2" y="22" width="15" height="4" rx="1" />
        <rect {...ownProps} x="19" y="22" width="15" height="4" rx="1" />
        <rect {...ownProps} x="2" y="28" width="15" height="4" rx="1" />
        <rect {...ownProps} x="19" y="28" width="15" height="4" rx="1" />
      </g>
    )}
  </Icon>
);

Grid.displayName = 'Grid';

export default Grid;
