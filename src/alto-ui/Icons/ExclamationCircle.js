import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';

const ExclamationCircleOutline = props => (
  <g>
    <path
      {...props}
      d="M18,6A12,12,0,1,0,30,18,12,12,0,0,0,18,6Zm0,22A10,10,0,1,1,28,18,10,10,0,0,1,18,28Z"
    />
    <path
      {...props}
      d="M18,20.07a1.3,1.3,0,0,1-1.3-1.3v-6a1.3,1.3,0,1,1,2.6,0v6A1.3,1.3,0,0,1,18,20.07Z"
    />
    <circle {...props} cx="17.95" cy="23.02" r="1.5" />
  </g>
);

const ExclamationCircleSolid = props => (
  <path
    {...props}
    d="M18,6A12,12,0,1,0,30,18,12,12,0,0,0,18,6Zm-1.49,6a1.49,1.49,0,0,1,3,0v6.89a1.49,1.49,0,1,1-3,0ZM18,25.5a1.72,1.72,0,1,1,1.72-1.72A1.72,1.72,0,0,1,18,25.5Z"
  />
);

const ExclamationCircle = props => (
  <Icon {...props}>
    {props.outline
      ? ownProps => <ExclamationCircleOutline {...ownProps} />
      : ownProps => <ExclamationCircleSolid {...ownProps} />}
  </Icon>
);

ExclamationCircle.displayName = 'ExclamationCircle';

ExclamationCircle.defaultProps = {
  outline: false,
};

ExclamationCircle.propTypes = {
  outline: PropTypes.bool,
};

export default ExclamationCircle;
