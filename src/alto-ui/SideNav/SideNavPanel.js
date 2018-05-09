import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Overlay from '../Overlay';
import CloseButton from '../CloseButton';
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
          <CloseButton
            id={`${closeFocusTargetId}__open`}
            onClick={onClose}
            tabIndex={open ? 0 : -1}
            a11yLabel="Close Panel"
          />
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
