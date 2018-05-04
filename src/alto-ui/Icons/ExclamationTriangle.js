import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';

const ExclamationTriangleOutline = props => (
  <g>
    <path
      {...props}
      d="M18,21.32a1.3,1.3,0,0,0,1.3-1.3V14a1.3,1.3,0,1,0-2.6,0v6A1.3,1.3,0,0,0,18,21.32Z"
    />
    <circle {...props} cx="17.95" cy="24.27" r="1.5" />
    <path
      {...props}
      d="M30.33,25.54,20.59,7.6a3,3,0,0,0-5.27,0L5.57,25.54A3,3,0,0,0,8.21,30H27.69a3,3,0,0,0,2.64-4.43Zm-1.78,1.94a1,1,0,0,1-.86.49H8.21a1,1,0,0,1-.88-1.48L17.07,8.55a1,1,0,0,1,1.76,0l9.74,17.94A1,1,0,0,1,28.55,27.48Z"
    />
  </g>
);

const ExclamationTriangleSolid = props => (
  <path
    {...props}
    d="M30.33,25.54,20.59,7.6a3,3,0,0,0-5.27,0L5.57,25.54A3,3,0,0,0,8.21,30H27.69a3,3,0,0,0,2.64-4.43ZM16.46,12.74a1.49,1.49,0,0,1,3,0v6.89a1.49,1.49,0,1,1-3,0ZM18,26.25a1.72,1.72,0,1,1,1.72-1.72A1.72,1.72,0,0,1,18,26.25Z"
  />
);

const ExclamationTriangle = props => (
  <Icon {...props}>
    {props.outline
      ? ownProps => <ExclamationTriangleOutline {...ownProps} />
      : ownProps => <ExclamationTriangleSolid {...ownProps} />}
  </Icon>
);

ExclamationTriangle.displayName = 'ExclamationTriangle';

ExclamationTriangle.defaultProps = {
  outline: false,
};

ExclamationTriangle.propTypes = {
  outline: PropTypes.bool,
};

export default ExclamationTriangle;
