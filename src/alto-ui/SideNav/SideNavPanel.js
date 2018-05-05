import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Overlay from '../Overlay';
import VisuallyHidden from '../VisuallyHidden';
import CloseIcon from '../Icons/Close';
import { bemClass } from '../helpers/bem';

const SideNavPanel = ({
  open,
  children,
  title,
  onClose,
  closeFocusTargetId,
  className,
  panelClassName,
}) => (
  <Overlay
    open={open}
    openFocusTargetId={`${closeFocusTargetId}__open`}
    onClose={onClose}
    closeFocusTargetId={closeFocusTargetId}
  >
    <div className={bemClass('sidenav__panel', { open }, panelClassName)} aria-hidden={!open}>
      <div className="sidenav__panel-container">
        <header className="sidenav__panel-header">
          <div className="sidenav__panel-title">{title}</div>
          <button
            id={`${closeFocusTargetId}__open`}
            onClick={onClose}
            className="sidenav__panel-close"
            tabIndex={open ? 0 : -1}
          >
            <CloseIcon />
            <div className="sidenav__panel-close-label">
              <span aria-hidden="true">ESC</span>
              <VisuallyHidden>Close {title} panel.</VisuallyHidden>
            </div>
          </button>
        </header>
        <div className={classnames('sidenav__panel-body', className)}>{children}</div>
      </div>
    </div>
  </Overlay>
);

SideNavPanel.displayName = 'SideNavPanel';

SideNavPanel.defaultProps = {};

SideNavPanel.propTypes = {
  className: PropTypes.string,
  panelClassName: PropTypes.string,
  open: PropTypes.bool.isRequired,
  children: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  closeFocusTargetId: PropTypes.string.isRequired,
};

export default SideNavPanel;
