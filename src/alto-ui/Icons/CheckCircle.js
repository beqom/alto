import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';

const CheckCircleOutline = props => (
  <g>
    <path
      {...props}
      d="M18,6A12,12,0,1,0,30,18,12,12,0,0,0,18,6Zm0,22A10,10,0,1,1,28,18,10,10,0,0,1,18,28Z"
    />
    <path
      {...props}
      d="M16.34,23.74l-5-5a1,1,0,0,1,1.41-1.41l3.59,3.59,6.78-6.78a1,1,0,0,1,1.41,1.41Z"
    />
  </g>
);

const CheckCircleSolid = props => (
  <path
    {...props}
    d="M30,18A12,12,0,1,1,18,6,12,12,0,0,1,30,18Zm-4.77-2.16a1.4,1.4,0,0,0-2-2l-6.77,6.77L13,17.16a1.4,1.4,0,0,0-2,2l5.45,5.45Z"
  />
);

const CheckCircle = props => (
  <Icon {...props}>
    {props.outline
      ? ownProps => <CheckCircleOutline {...ownProps} />
      : ownProps => <CheckCircleSolid {...ownProps} />}
  </Icon>
);

CheckCircle.displayName = 'CheckCircle';

CheckCircle.defaultProps = {
  outline: false,
};

CheckCircle.propTypes = {
  outline: PropTypes.bool,
};

export default CheckCircle;
