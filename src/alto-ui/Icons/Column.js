import React from 'react';
import Icon from './Icon';

const Column = props => (
  <Icon {...props}>
    {ownProps => (
      <g>
        <rect {...ownProps} x="2.25" y="6.75" width="13.5" height="2.25" />
        <rect {...ownProps} x="20.25" y="6.75" width="13.5" height="2.25" />
        <rect {...ownProps} x="2.25" y="13.5" width="13.5" height="2.25" />
        <rect {...ownProps} x="20.25" y="13.5" width="13.5" height="2.25" />
        <rect {...ownProps} x="2.25" y="20.25" width="13.5" height="2.25" />
        <rect {...ownProps} x="20.25" y="20.25" width="13.5" height="2.25" />
        <rect {...ownProps} x="2.25" y="27" width="13.5" height="2.25" />
        <rect {...ownProps} x="20.25" y="27" width="13.5" height="2.25" />
      </g>
    )}
  </Icon>
);

export default Column;
