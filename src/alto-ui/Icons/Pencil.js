import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';

const PencilOutline = props => (
  <path
    {...props}
    d="M33.87,8.32,28,2.42a2.07,2.07,0,0,0-2.92,0L4.27,23.2l-1.9,8.2a2.06,2.06,0,0,0,2,2.5,2.14,2.14,0,0,0,.43,0L13.09,32,33.87,11.24A2.07,2.07,0,0,0,33.87,8.32ZM12.09,30.2,4.32,31.83l1.77-7.62L21.66,8.7l6,6ZM29,13.25l-6-6,3.48-3.46,5.9,6Z"
  />
);

const PencilSolid = props => (
  <g>
    <path
      {...props}
      d="M4.22,23.2l-1.9,8.2a2.06,2.06,0,0,0,2,2.5,2.14,2.14,0,0,0,.43,0L13,32,28.84,16.22,20,7.4Z"
    />
    <path
      {...props}
      d="M33.82,8.32l-5.9-5.9a2.07,2.07,0,0,0-2.92,0L21.72,5.7l8.83,8.83,3.28-3.28A2.07,2.07,0,0,0,33.82,8.32Z"
    />
  </g>
);

const Pencil = props => (
  <Icon {...props}>
    {props.outline
      ? ownProps => <PencilOutline {...ownProps} />
      : ownProps => <PencilSolid {...ownProps} />}
  </Icon>
);

Pencil.displayName = 'Pencil';

Pencil.defaultProps = {
  outline: false,
};

Pencil.propTypes = {
  outline: PropTypes.bool,
};

export default Pencil;
