import React from 'react';
import Icon from './Icon';

const Content = props => (
  <Icon {...props}>
    {ownProps => (
      <g {...ownProps} fill="none" fillRule="evenodd">
        <rect x="0.5" y="0.5" width="35" height="35" rx="3" stroke={ownProps.fill} />
        <path
          {...ownProps}
          stroke={ownProps.fill}
          strokeWidth="2"
          d="M30.5958135,29.5 L5.85723818,29.5 L30.5958135,29.5 Z"
        />
        <path
          {...ownProps}
          stroke={ownProps.fill}
          strokeWidth="2"
          d="M30.5958135,21.5 L5.85723818,21.5 L30.5958135,21.5 Z"
        />
        <path
          {...ownProps}
          stroke={ownProps.fill}
          strokeWidth="2"
          d="M30.7385754,13.5 L6,13.5 L30.7385754,13.5 Z"
        />
        <path
          {...ownProps}
          stroke={ownProps.fill}
          strokeWidth="2"
          d="M19.7385754,5.5 L6,5.5 L19.7385754,5.5 Z"
        />
      </g>
    )}
  </Icon>
);

Content.displayName = 'Content';

export default Content;
