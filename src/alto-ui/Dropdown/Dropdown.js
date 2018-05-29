import React from 'react';
import PropTypes from 'prop-types';

import { bemClass } from '../helpers/bem';
import Overlay from '../Overlay';

import './Dropdown.scss';

const Dropdown = ({
  className,
  children,
  top,
  right,
  center,
  onClose,
  openFocusTargetId,
  closeFocusTargetId,
  open,
}) => (
  <Overlay
    onClose={onClose}
    openFocusTargetId={openFocusTargetId}
    closeFocusTargetId={closeFocusTargetId}
    open={open}
  >
    <div
      className={bemClass(
        'Dropdown',
        { top, bottom: !top, left: !right && !center, center, right, open },
        className
      )}
    >
      {children}
    </div>
  </Overlay>
);

Dropdown.displayName = 'Dropdown';

Dropdown.defaultProps = {};

Dropdown.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
  top: PropTypes.bool,
  right: PropTypes.bool,
  center: PropTypes.bool,
  onClose: PropTypes.func,
  openFocusTargetId: PropTypes.string,
  closeFocusTargetId: PropTypes.string,
  open: PropTypes.bool,
};

export default Dropdown;
