import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';

const MinusCircleOutline = props => (
  <g>
    <path
      {...props}
      d="M18,2A16,16,0,1,0,34,18,16,16,0,0,0,18,2Zm0,30A14,14,0,1,1,32,18,14,14,0,0,1,18,32Z"
    />
    <path
      {...props}
      d="M24,17H12a1,1,0,0,0,0,2H24a1,1,0,0,0,0-2Z"
    />
  </g>
);

const MinusCircleSolid = props => (
  <path
    {...props}
    d="M18,2A16,16,0,1,0,34,18,16,16,0,0,0,18,2Zm6,17.5H12a1.5,1.5,0,0,1,0-3H24a1.5,1.5,0,0,1,0,3Z"
  />
);

const MinusCircle = props => (
  <Icon {...props}>
    {props.outline
      ? ownProps => <MinusCircleOutline {...ownProps} />
      : ownProps => <MinusCircleSolid {...ownProps} />}
  </Icon>
);

MinusCircle.displayName = 'MinusCircle';

MinusCircle.defaultProps = {
  outline: false,
};

MinusCircle.propTypes = {
  outline: PropTypes.bool,
};

export default MinusCircle;
