import React from 'react';
import Icon from './Icon';

const Duplicate = props => (
  <Icon {...props}>
    {ownProps => (
      <g>
        <g fillRule="evenodd" fill="none" stroke="none" id="Icons/Dash/Duplicate">
          <path
            stroke={ownProps.fill}
            fill="#FFF"
            d="M8.5,0.5 C7.3954305,0.5 6.5,1.3954305 6.5,2.5 L6.5,27.5 C6.5,28.6045695 7.3954305,29.5 8.5,29.5 L33.5,29.5 C34.6045695,29.5 35.5,28.6045695 35.5,27.5 L35.5,2.5 C35.5,1.3954305 34.6045695,0.5 33.5,0.5 L8.5,0.5 Z"
          />
          <path
            fill="#FFF"
            stroke={ownProps.fill}
            d="M2.5,6.5 C1.3954305,6.5 0.5,7.3954305 0.5,8.5 L0.5,33.5 C0.5,34.6045695 1.3954305,35.5 2.5,35.5 L27.5,35.5 C28.6045695,35.5 29.5,34.6045695 29.5,33.5 L29.5,8.5 C29.5,7.3954305 28.6045695,6.5 27.5,6.5 L2.5,6.5 Z"
          />
        </g>
        <path {...ownProps} stroke={ownProps.fill} d="M 15,13.880993 V 28.119007" />
        <path {...ownProps} stroke={ownProps.fill} d="M 7.9999998,21 H 22" />
      </g>
    )}
  </Icon>
);

Duplicate.displayName = 'Duplicate';

export default Duplicate;
