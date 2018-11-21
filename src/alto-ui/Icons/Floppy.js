/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';

const FloppyOutline = props => (
  <g transform="rotate(180, 18, 18)">
    <path
      {...props}
      d="M27.36,4H6A2,2,0,0,0,4,6V30a2,2,0,0,0,2,2H30a2,2,0,0,0,2-2V8.78ZM25,30H11V22H25Zm5,0H27V22a2,2,0,0,0-2-2H11a2,2,0,0,0-2,2v8H6V6h4v6a2,2,0,0,0,2,2H24a2,2,0,0,0,2-2H12V6H26.51L30,9.59Z"
    />
  </g>
);

const FloppySolid = props => (
  <g transform="rotate(180, 18, 18)">
    <path
      {...props}
      d="M27.36,4H6A2,2,0,0,0,4,6V30a2,2,0,0,0,2,2H30a2,2,0,0,0,2-2V8.78ZM26,30H10V21.5A1.5,1.5,0,0,1,11.5,20h13A1.5,1.5,0,0,1,26,21.5ZM24,14H12a2,2,0,0,1-2-2V6h2v6H26A2,2,0,0,1,24,14Z"
    />
  </g>
);

const Floppy = props => (
  <Icon {...props}>
    {props.outline
      ? ownProps => <FloppyOutline {...ownProps} />
      : ownProps => <FloppySolid {...ownProps} />}
  </Icon>
);

Floppy.displayName = 'Floppy';

Floppy.defaultProps = {
  outline: true,
  badged: false,
};

Floppy.propTypes = {
  outline: PropTypes.bool,
  badged: PropTypes.bool,
};

export default Floppy;
