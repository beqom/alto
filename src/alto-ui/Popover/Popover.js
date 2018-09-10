import React from 'react';
import PropTypes from 'prop-types';

import { bemClass } from '../helpers/bem';
import Overlay from '../Overlay';

import './Popover.scss';

const Popover = ({
  className,
  children,
  top,
  right,
  left,
  start,
  end,
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
    <span
      className={bemClass('Popover__arrow', {
        open,
        bottom: !top && !left && !right,
        top,
        left,
        right,
      })}
    />
    <div
      className={bemClass(
        'Popover',
        {
          open,
          bottom: !top && !left && !right,
          top,
          left,
          right,
          center: !start && !end,
          start,
          end,
        },
        className
      )}
    >
      {children}
    </div>
  </Overlay>
);

Popover.displayName = 'Popover';

Popover.defaultProps = {};

Popover.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
  top: PropTypes.bool,
  right: PropTypes.bool,
  left: PropTypes.bool,
  start: PropTypes.bool,
  end: PropTypes.bool,
  onClose: PropTypes.func,
  openFocusTargetId: PropTypes.string,
  closeFocusTargetId: PropTypes.string,
  open: PropTypes.bool,
};

export default Popover;
