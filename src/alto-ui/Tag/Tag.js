import React from 'react';
import PropTypes from 'prop-types';

import { bemClass } from '../helpers/bem';

import './Tag.scss';

function Tag({ className, active, rounded, ...props }) {
  const Component = props.onClick ? 'button' : 'div';
  return (
    <Component
      {...props}
      className={bemClass(
        'Tag',
        { active, rounded, button: !!props.onClick, disabled: props.disabled },
        className
      )}
    />
  );
}

Tag.displayName = 'Tag';

Tag.defaultProps = {};

Tag.propTypes = {
  className: PropTypes.string,
  active: PropTypes.bool,
  rounded: PropTypes.bool,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export default Tag;