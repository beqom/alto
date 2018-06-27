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

const Alert = ({ id, className, filled, success, warning, error, show, onClose, children }) => {
  if (show === false) return null;
  const Icon = getIcon(success, warning, error);
  return (
    <div
      id={id}
      className={bemClass(
        'Alert',
        { filled, success, warning, error, closable: !!onClose },
        className
      )}
    >
      <Icon className="Alert__icon" />
      <div className="Alert__message">{children}</div>
      {onClose && <CloseIcon className="Alert__close" onClick={onClose} />}
    </div>
  );
};

Alert.displayName = 'Alert';

Alert.defaultProps = {};

Alert.propTypes = {
  id: PropTypes.string,
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
