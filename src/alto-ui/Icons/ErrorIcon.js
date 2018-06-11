import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';

const ErrorOutline = props => (
  <g>
    <circle {...props} cx="18" cy="26.06" r="1.33" />
    <path {...props} d="M18,22.61a1,1,0,0,1-1-1v-12a1,1,0,1,1,2,0v12A1,1,0,0,1,18,22.61Z" />
    <path
      {...props}
      d="M18,34A16,16,0,1,1,34,18,16,16,0,0,1,18,34ZM18,4A14,14,0,1,0,32,18,14,14,0,0,0,18,4Z"
    />
  </g>
);

const ErrorSolid = props => (
  <path
    {...props}
    d="M18,2.1a16,16,0,1,0,16,16A16,16,0,0,0,18,2.1ZM16.6,8.8a1.4,1.4,0,0,1,2.8,0v12a1.4,1.4,0,0,1-2.8,0ZM18,28.6a1.8,1.8,0,1,1,1.8-1.8A1.8,1.8,0,0,1,18,28.6Z"
  />
);

const ErrorIcon = props => (
  <Icon {...props}>
    {props.outline
      ? ownProps => <ErrorOutline {...ownProps} />
      : ownProps => <ErrorSolid {...ownProps} />}
  </Icon>
);

ErrorIcon.displayName = 'Error';

ErrorIcon.defaultProps = {
  outline: false,
};

ErrorIcon.propTypes = {
  outline: PropTypes.bool,
};

export default ErrorIcon;
