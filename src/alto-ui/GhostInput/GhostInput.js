import React from 'react';
import PropTypes from 'prop-types';

import { bemClass } from '../helpers/bem';
import ContentEditable from '../ContentEditable';

import './GhostInput.scss';

const GhostInput = React.forwardRef((props, ref) => {
  const { className, value, placeholder, ...remainingProps } = props;

  return (
    <ContentEditable
      {...remainingProps}
      ref={ref}
      className={bemClass('GhostInput', { placeholder: !value }, className)}
      value={value}
      title={!value ? placeholder : undefined}
    />
  );
});

GhostInput.propTypes = {
  area: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
};

export default GhostInput;
