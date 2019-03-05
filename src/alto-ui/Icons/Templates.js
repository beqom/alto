import React from 'react';
import Icon from './Icon';

const Templates = props => (
  <Icon {...props}>
    {ownProps => (
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <rect {...ownProps} x="0.5" y="0.5" width="14" height="14" rx="2" />
        <rect {...ownProps} x="0.5" y="21.5" width="14" height="14" rx="2" />
        <rect {...ownProps} x="21.5" y="0.5" width="14" height="14" rx="2" />
        <rect {...ownProps} x="21.5" y="21.5" width="14" height="14" rx="2" />
      </g>
    )}
  </Icon>
);

Templates.displayName = 'Templates';

export default Templates;
