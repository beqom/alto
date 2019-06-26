import React from 'react';
import PropTypes from 'prop-types';

import { bemClass } from '../helpers/bem';
import './ProgressCircle.scss';

const getSizes = (small, large) => {
  if (small) return { size: 16 * 2.5, thickness: 2 };
  if (large) return { size: 16 * 10, thickness: 6 };
  return { size: 16 * 5, thickness: 4 };
};

const ProgressCircle = ({ id, small, large, value, min, max, className, children }) => {
  const { size, thickness } = getSizes(small, large);
  const radius = size / 2 - thickness / 2;
  const len = 2 * Math.PI * radius;
  const ratio = (Math.max(Math.min(max, value || min), min) - min) / (max - min);

  return (
    <div
      id={id}
      className={bemClass('ProgressCircle', { small, large }, className)}
      style={{
        width: size,
        height: size,
      }}
    >
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        role="presentation"
        width={size}
        height={size}
        style={{ position: 'absolute' }}
      >
        <circle
          className="ProgressCircle__placeholder"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={thickness}
        />
        <circle
          className="ProgressCircle__circle"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={thickness}
          strokeDasharray={len}
          strokeDashoffset={len - len * ratio}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className={bemClass('ProgressCircle__figure', { small, large })}>
        {children || (
          <>
            <div>{Math.round(ratio * 100)}</div>
            <div className={bemClass('ProgressCircle__figure-unit', { small, large })}>%</div>
          </>
        )}
      </div>
    </div>
  );
};

ProgressCircle.displayName = 'ProgressCircle';

ProgressCircle.defaultProps = {
  min: 0,
  max: 1,
};

ProgressCircle.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.any,
  small: PropTypes.bool,
  large: PropTypes.bool,
  value: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
};

export default ProgressCircle;
