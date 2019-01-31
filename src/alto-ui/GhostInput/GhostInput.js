import React from 'react';
import PropTypes from 'prop-types';

import { bemClass } from '../helpers/bem';

import './GhostInput.scss';

const GhostInput = React.forwardRef((props, ref) => {
  const { area, ...remainingProps } = props;

  const className = bemClass(
    'GhostInput',
    {
      area,
    },
    props.className
  );

  if (area) return <textarea {...remainingProps} className={className} ref={ref} />;

  return <input {...remainingProps} className={className} ref={ref} />;
});

GhostInput.propTypes = {
  area: PropTypes.string,
  className: PropTypes.string,
};

export default GhostInput;
