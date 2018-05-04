import React from 'react';
import PropTypes from 'prop-types';
import { bemClass } from '../helpers/bem';
import CheckCircleIcon from '../Icons/CheckCircle';
import ExclamationTriangleIcon from '../Icons/ExclamationTriangle';
import ExclamationCircleIcon from '../Icons/ExclamationCircle';
import InfoCircleIcon from '../Icons/InfoCircle';
import CloseIcon from '../Icons/Close';

import './Alert.scss';

const getIcon = (success, warning, danger) => {
  if (success) return CheckCircleIcon;
  if (warning) return ExclamationTriangleIcon;
  if (danger) return ExclamationCircleIcon;
  return InfoCircleIcon;
};

const Alert = ({ className, filled, success, warning, error, show, onClose, children }) => {
  if (show === false) return null;
  const Icon = getIcon(success, warning, error);
  return (
    <div
      className={bemClass(
        'alert',
        { filled, success, warning, error, closable: !!onClose },
        className
      )}
    >
      <Icon className="alert__icon" />
      <div className="alert__message">{children}</div>
      {onClose && <CloseIcon className="alert__close" onClick={onClose} />}
    </div>
  );
};

Alert.displayName = 'Alert';

Alert.defaultProps = {};

Alert.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
  filled: PropTypes.bool,
  success: PropTypes.bool,
  warning: PropTypes.bool,
  error: PropTypes.bool,
  show: PropTypes.bool,
  onClose: PropTypes.func,
};

export default Alert;
