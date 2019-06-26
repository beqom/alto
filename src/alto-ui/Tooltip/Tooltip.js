import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import { bemClass } from '../helpers/bem';
import CheckCircleIcon from '../Icons/CheckCircle';
import ExclamationTriangleIcon from '../Icons/ExclamationTriangle';
import ExclamationCircleIcon from '../Icons/ExclamationCircle';
import InfoCircleIcon from '../Icons/InfoCircle';
import RelativeBox from '../RelativeBox';
import Portal from '../Portal';

import './Tooltip.scss';

const getIcon = ({ info, success, warning, error }) => {
  if (info) return InfoCircleIcon;
  if (success) return CheckCircleIcon;
  if (warning) return ExclamationTriangleIcon;
  if (error) return ExclamationCircleIcon;
  return null;
};

function Tooltip({
  className,
  children,
  content,
  info,
  success,
  error,
  warning,
  narrow,
  wide,
  show: shouldBeVisible,
  big,
  ...relativeBoxProps
}) {
  const [visible, setVisibility] = useState(shouldBeVisible);
  const defaultRef = useRef();
  const targetRef = relativeBoxProps.targetRef || defaultRef;

  const show = () => setVisibility(true);
  const hide = () => setVisibility(false);

  useEffect(() => {
    setVisibility(shouldBeVisible);
  }, [shouldBeVisible]);

  useEffect(() => {
    if (targetRef.current) {
      targetRef.current.addEventListener('mouseenter', show);
      targetRef.current.addEventListener('mouseleave', hide);
    }
    return () => {
      if (targetRef.current) {
        targetRef.current.removeEventListener('mouseenter', show);
        targetRef.current.removeEventListener('mouseleave', hide);
      }
    };
  }, [targetRef]);

  const Icon = getIcon({
    info,
    success,
    error,
    warning,
  });

  const tooltip = !visible ? null : (
    <Portal>
      <RelativeBox
        className={bemClass(
          'Tooltip',
          {
            info,
            success,
            error,
            warning,
            narrow,
            wide,
            big,
            visible,
          },
          className
        )}
        baseClassName="Tooltip"
        bottom
        middle
        target={children ? targetRef.current : undefined}
        margin={6.4}
        {...relativeBoxProps}
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
      </RelativeBox>
    </Portal>
  );

  if (!children) return tooltip;
  return (
    <div ref={targetRef} className="Tooltip__wrapper">
      {children}
      {tooltip}
    </div>
  );
}

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
  narrow: PropTypes.bool,
  wide: PropTypes.bool,
  show: PropTypes.bool,
  big: PropTypes.bool,
};

export default Tooltip;
