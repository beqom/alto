import React from 'react';
import PropTypes from 'prop-types';

import TreeItem from './components/TreeItem';
import { getKey } from './helpers';

import './Tree.scss';

const Tree = props => (
  <ul id={props.id} className="Tree">
    {props.items.map((child, index) => (
      <TreeItem
        {...props}
        id={props.id ? `${props.id}__item--${getKey(child, props.keyField)}-${index}` : undefined}
        key={getKey(child, props.keyField)}
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
  id: PropTypes.string,
  items: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    // promise
    PropTypes.object,
  ]).isRequired,
  keyField: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  noCache: PropTypes.bool,
  // eslint-disable-next-line react/no-unused-prop-types
  childrenPerPage: PropTypes.number,
  // eslint-disable-next-line react/no-unused-prop-types
  labels: PropTypes.object,
};

export default Tree;
