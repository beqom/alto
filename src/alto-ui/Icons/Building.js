import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';

const BuildingOutline = props => (
  <g>
    <path {...props} d="M31,8H23v2h8V31H23v2H33V10A2,2,0,0,0,31,8Z" />
    <path
      {...props}
      d="M19.88,3H6.12A2.12,2.12,0,0,0,4,5.12V33H22V5.12A2.12,2.12,0,0,0,19.88,3ZM20,31H17V28H9v3H6V5.12A.12.12,0,0,1,6.12,5H19.88a.12.12,0,0,1,.12.12Z"
    />
    <rect {...props} x="8" y="8" width="2" height="2" />
    <rect {...props} x="12" y="8" width="2" height="2" />
    <rect {...props} x="16" y="8" width="2" height="2" />
    <rect {...props} x="8" y="13" width="2" height="2" />
    <rect {...props} x="12" y="13" width="2" height="2" />
    <rect {...props} x="16" y="13" width="2" height="2" />
    <rect {...props} x="8" y="18" width="2" height="2" />
    <rect {...props} x="12" y="18" width="2" height="2" />
    <rect {...props} x="16" y="18" width="2" height="2" />
    <rect {...props} x="8" y="23" width="2" height="2" />
    <rect {...props} x="12" y="23" width="2" height="2" />
    <rect {...props} x="16" y="23" width="2" height="2" />
    <rect {...props} x="23" y="13" width="2" height="2" />
    <rect {...props} x="27" y="13" width="2" height="2" />
    <rect {...props} x="23" y="18" width="2" height="2" />
    <rect {...props} x="27" y="18" width="2" height="2" />
    <rect {...props} x="23" y="23" width="2" height="2" />
    <rect {...props} x="27" y="23" width="2" height="2" />
  </g>
);

const BuildingSolid = props => (
  <g>
    <path
      {...props}
      d="M31,8H22V33H33V10A2,2,0,0,0,31,8ZM26,25H24V23h2Zm0-5H24V18h2Zm0-5H24V13h2Zm4,10H28V23h2Zm0-5H28V18h2Zm0-5H28V13h2Z"
    />
    <path
      {...props}
      d="M17.88,3H6.12A2.12,2.12,0,0,0,4,5.12V33H9V30h6v3h5V5.12A2.12,2.12,0,0,0,17.88,3ZM9,25H7V23H9Zm0-5H7V18H9Zm0-5H7V13H9Zm0-5H7V8H9Zm4,15H11V23h2Zm0-5H11V18h2Zm0-5H11V13h2Zm0-5H11V8h2Zm4,15H15V23h2Zm0-5H15V18h2Zm0-5H15V13h2Zm0-5H15V8h2Z"
    />
  </g>
);

const Building = props => (
  <Icon {...props}>
    {props.outline
      ? ownProps => <BuildingOutline {...ownProps} />
      : ownProps => <BuildingSolid {...ownProps} />}
  </Icon>
);

Building.displayName = 'Building';

Building.defaultProps = {
  outline: false,
};

Building.propTypes = {
  outline: PropTypes.bool,
};

export default Building;
