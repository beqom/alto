import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';

const CopyOutline = props => (
  <g>
    <path
      {...props}
      d="M29.5,7h-19A1.5,1.5,0,0,0,9,8.5v24A1.5,1.5,0,0,0,10.5,34h19A1.5,1.5,0,0,0,31,32.5V8.5A1.5,1.5,0,0,0,29.5,7ZM29,32H11V9H29Z"
    />
    <path
      {...props}
      d="M26,3.5A1.5,1.5,0,0,0,24.5,2H5.5A1.5,1.5,0,0,0,4,3.5v24A1.5,1.5,0,0,0,5.5,29H6V4H26Z"
    />
  </g>
);

const CopySolid = props => (
  <g>
    <path
      {...props}
      d="M27,3.56A1.56,1.56,0,0,0,25.43,2H5.57A1.56,1.56,0,0,0,4,3.56V28.44A1.56,1.56,0,0,0,5.57,30h.52V4.07H27Z"
    />
    <rect {...props} x="8" y="6" width="23" height="28" rx="1.5" ry="1.5" />
  </g>
);

const Copy = props => (
  <Icon {...props}>
    {props.outline
      ? ownProps => <CopyOutline {...ownProps} />
      : ownProps => <CopySolid {...ownProps} />}
  </Icon>
);

Copy.displayName = 'Copy';

Copy.defaultProps = {
  outline: false,
};

Copy.propTypes = {
  outline: PropTypes.bool,
};

export default Copy;
