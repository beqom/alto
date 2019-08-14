import React from 'react';
import PropTypes from 'prop-types';

import { bemClass } from '../helpers/bem';
import './ButtonGroup.scss';

const getHandleChange = (index, active, items, onChange) => () => {
  if (!active) return onChange(items[index].value);
  // if only 2 items, clicking active one trigger the other one
  if (active && items.length === 2) return onChange(items[1 - index].value);
  return null;
};

function ButtonGroup({ className, items, onChange, value, small }) {
  if (!Array.isArray(items) || items.length < 2) return null;
  return (
    <div className={bemClass('ButtonGroup', {}, className)}>
      {items.map((item, index) => {
        const active = item.value === value;
        return (
          <button
            key={item.value}
            id={item.id}
            className={bemClass('ButtonGroup__button', { active, small })}
            onClick={getHandleChange(index, active, items, onChange)}
          >
            {item.title}
          </button>
        );
      })}
    </div>
  );
}

ButtonGroup.propTypes = {
  className: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      value: PropTypes.any,
      title: PropTypes.string,
    })
  ),
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any,
  small: PropTypes.any,
};

ButtonGroup.defaultProps = {
  className: '',
  items: [],
  value: null,
  small: false,
};

export default ButtonGroup;
