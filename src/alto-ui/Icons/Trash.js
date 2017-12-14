import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';

const TrashOutline = props => (
  <g>
    <path
      {...props}
      d="M27.14,34H8.86A2.93,2.93,0,0,1,6,31V11.23H8V31a.93.93,0,0,0,.86,1H27.14A.93.93,0,0,0,28,31V11.23h2V31A2.93,2.93,0,0,1,27.14,34Z"
    />
    <path {...props} d="M30.78,9H5A1,1,0,0,1,5,7H30.78a1,1,0,0,1,0,2Z" />
    <rect {...props} x="21" y="13" width="2" height="15" />
    <rect {...props} x="13" y="13" width="2" height="15" />
    <path {...props} d="M23,5.86H21.1V4H14.9V5.86H13V4a2,2,0,0,1,1.9-2h6.2A2,2,0,0,1,23,4Z" />
  </g>
);

const TrashSolid = props => (
  <g>
    <path
      {...props}
      d="M6,9V31a2.93,2.93,0,0,0,2.86,3H27.09A2.93,2.93,0,0,0,30,31V9Zm9,20H13V14h2Zm8,0H21V14h2Z"
    />
    <path
      {...props}
      d="M30.73,5H23V4A2,2,0,0,0,21,2h-6.2A2,2,0,0,0,13,4V5H5A1,1,0,1,0,5,7H30.73a1,1,0,0,0,0-2Z"
    />
  </g>
);

const Trash = props => (
  <Icon {...props}>
    {props.outline
      ? ownProps => <TrashOutline {...ownProps} />
      : ownProps => <TrashSolid {...ownProps} />}
  </Icon>
);

Trash.displayName = 'Trash';

Trash.defaultProps = {
  outline: false,
};

Trash.propTypes = {
  outline: PropTypes.bool,
};

export default Trash;
