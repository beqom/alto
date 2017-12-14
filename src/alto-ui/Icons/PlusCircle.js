import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';

const PlusCircleOutline = props => (
  <g>
    <path
      {...props}
      d="M26.17,17H19V9.83a1,1,0,0,0-2,0V17H9.83a1,1,0,0,0,0,2H17v7.17a1,1,0,0,0,2,0V19h7.17a1,1,0,0,0,0-2Z"
    />
    <path
      {...props}
      d="M18,2A16,16,0,1,0,34,18,16,16,0,0,0,18,2Zm0,30A14,14,0,1,1,32,18,14,14,0,0,1,18,32Z"
    />
  </g>
);

const PlusCircleSolid = props => (
  <path
    {...props}
    d="M34,18A16,16,0,1,1,18,2,16,16,0,0,1,34,18Zm-8.41-1.5H19.5V10.41a1.5,1.5,0,0,0-3,0V16.5H10.41a1.5,1.5,0,0,0,0,3H16.5v6.09a1.5,1.5,0,0,0,3,0V19.5h6.09a1.5,1.5,0,0,0,0-3Z"
  />
);

const PlusCircle = props => (
  <Icon {...props}>
    {props.outline
      ? ownProps => <PlusCircleOutline {...ownProps} />
      : ownProps => <PlusCircleSolid {...ownProps} />}
  </Icon>
);

PlusCircle.displayName = 'PlusCircle';

PlusCircle.defaultProps = {
  outline: false,
};

PlusCircle.propTypes = {
  outline: PropTypes.bool,
};

export default PlusCircle;
