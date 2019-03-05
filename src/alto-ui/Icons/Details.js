import React from 'react';
import Icon from './Icon';

const Details = props => (
  <Icon {...props}>
    {ownProps => (
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <rect stroke={ownProps.fill} x="0.5" y="0.5" width="35" height="35" rx="3" fill="none" />
        <path
          {...ownProps}
          d="M7,29 L29,29 L29,12 L7,12 L7,29 Z M8.24467519,27.7824363 L27.7538605,27.7824363 L27.7538605,13.2189978 L8.24467519,13.2189978 L8.24467519,27.7824363 Z"
        />
        <path
          {...ownProps}
          d="M7,12 L29,12 L29,8 L7,8 L7,12 Z M8.24467519,10.9463898 L27.7538605,10.9463898 L27.7538605,9.05237062 L8.24467519,9.05237062 L8.24467519,10.9463898 Z"
        />
        <polygon {...ownProps} points="8 18.925 29 18.925 29 18.075 8 18.075" />
        <polygon {...ownProps} points="8 23.925 29 23.925 29 23.075 8 23.075" />
        <polygon {...ownProps} points="14.075 29 14.925 29 14.925 13 14.075 13" />
        <polygon {...ownProps} points="21.075 29 21.925 29 21.925 13 21.075 13" />
      </g>
    )}
  </Icon>
);

Details.displayName = 'Details';

export default Details;
