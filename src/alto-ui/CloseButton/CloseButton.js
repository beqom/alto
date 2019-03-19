import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import VisuallyHidden from '../VisuallyHidden';
import Link from '../Link';
import CloseIcon from '../Icons/Close';
import useEventListener from '../hooks/useEventListener';

import './CloseButton.scss';

const CloseButton = ({ a11yLabel, className, open, onClose, ...props }) => {
  const Component = props.href || props.to ? Link : 'button';

  useEventListener(useRef(document), 'keydown', e => {
    if (e.key === 'Escape') onClose();
  })(open && typeof onClose === 'function');

  return (
    <Component onClick={onClose} {...props} className={classnames('CloseButton', className)}>
      <CloseIcon className="CloseButton__icon" />
      <div className="CloseButton__label">
        <span aria-hidden="true">ESC</span>
        <VisuallyHidden>{a11yLabel}</VisuallyHidden>
      </div>
    </Component>
  );
};

CloseButton.propTypes = {
  className: PropTypes.string,
  href: PropTypes.string,
  to: PropTypes.string,
  a11yLabel: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

export default CloseButton;
