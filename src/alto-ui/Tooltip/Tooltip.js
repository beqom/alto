import React from 'react';
import PropTypes from 'prop-types';

import { bemClass } from '../helpers/bem';
import CheckCircleIcon from '../Icons/CheckCircle';
import ExclamationTriangleIcon from '../Icons/ExclamationTriangle';
import ExclamationCircleIcon from '../Icons/ExclamationCircle';
import InfoCircleIcon from '../Icons/InfoCircle';

import './Tooltip.scss';

const getIcon = ({ info, success, warning, error }) => {
  if (info) return InfoCircleIcon;
  if (success) return CheckCircleIcon;
  if (warning) return ExclamationTriangleIcon;
  if (error) return ExclamationCircleIcon;
  return null;
};

const Tooltip = ({
  className,
  children,
  content,
  info,
  success,
  error,
  warning,
  small,
  medium,
  large,
  show,
  left,
  right,
  top,
}) => {
  const Icon = getIcon({
    info,
    success,
    error,
    warning,
  });
  const elt = (
    <div
      className={bemClass(
        'Tooltip',
        {
          info,
          success,
          error,
          warning,
          small,
          medium,
          large,
          left,
          right,
          top,
          bottom: !top && !left && !right,
          visible: show,
        },
        className
      )}
    >
      {Icon && (
        <Icon
          left
          baseline
          className={bemClass('Tooltip__icon', {
            info,
            success,
            error,
            warning,
          })}
        />
      )}
      <div className="Tooltip__content">{content}</div>
    </div>
  );

  if (!children) return elt;

  return (
    <div className={bemClass('Tooltip__wrapper', {})}>
      {children}
      {elt}
    </div>
  );
};

Tooltip.displayName = 'Tooltip';

Tooltip.defaultProps = {
  show: false,
};

Tooltip.propTypes = {
  className: PropTypes.string,
  content: PropTypes.any,
  children: PropTypes.any,
  info: PropTypes.bool,
  success: PropTypes.bool,
  error: PropTypes.bool,
  warning: PropTypes.bool,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  show: PropTypes.bool,
  left: PropTypes.bool,
  right: PropTypes.bool,
  top: PropTypes.bool,
};

export default Tooltip;
