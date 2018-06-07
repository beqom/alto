import React from 'react';
import PropTypes from 'prop-types';

import TreeItem from './components/TreeItem';
import { getKey } from './helpers';

import './Tree.scss';

const Tree = props => (
  <ul className="Tree">
    {props.items.map((child, index) => (
      <TreeItem
        key={getKey(child, props.keyField)}
        {...props}
        noCache={props.noCache}
        item={child}
        index={index}
      />
    ))}
  </ul>
);

Tree.displayName = 'Tree';

Tree.defaultProps = {
  keyField: 'id',
  noCache: false,
};

Tree.propTypes = {
  items: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    // promise
    PropTypes.object,
  ]).isRequired,
  keyField: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  noCache: PropTypes.bool,
};

export default Tree;
