import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';

const ListOutline = props => (
  <g>
    <rect {...props} x="15" y="8" width="9" height="2" />
    <rect {...props} x="15" y="12" width="9" height="2" />
    <rect {...props} x="15" y="16" width="9" height="2" />
    <rect {...props} x="15" y="20" width="9" height="2" />
    <rect {...props} x="15" y="24" width="9" height="2" />
    <rect {...props} x="11" y="8" width="2" height="2" />
    <rect {...props} x="11" y="12" width="2" height="2" />
    <rect {...props} x="11" y="16" width="2" height="2" />
    <rect {...props} x="11" y="20" width="2" height="2" />
    <rect {...props} x="11" y="24" width="2" height="2" />
    <path
      {...props}
      d="M28,2H8A2,2,0,0,0,6,4V32a2,2,0,0,0,2,2H28a2,2,0,0,0,2-2V4A2,2,0,0,0,28,2Zm0,30H8V4H28Z"
    />
  </g>
);

const ListSolid = props => (
  <g>
    <path
      {...props}
      d="M28,2H8A2,2,0,0,0,6,4V32a2,2,0,0,0,2,2H28a2,2,0,0,0,2-2V4A2,2,0,0,0,28,2ZM13,26H11V24h2Zm0-4H11V20h2Zm0-4H11V16h2Zm0-4H11V12h2Zm0-4H11V8h2ZM25,26H15V24H25Zm0-4H15V20H25Zm0-4H15V16H25Zm0-4H15V12H25Zm0-4H15V8H25Z"
    />
  </g>
);

const List = props => (
  <Icon {...props}>
    {props.outline
      ? ownProps => <ListOutline {...ownProps} />
      : ownProps => <ListSolid {...ownProps} />}
  </Icon>
);

List.displayName = 'List';

List.defaultProps = {
  outline: false,
};

List.propTypes = {
  outline: PropTypes.bool,
};

export default List;
