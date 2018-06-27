import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import CSSTransition from 'react-transition-group/CSSTransition';
import TransitionGroup from 'react-transition-group/TransitionGroup';

import Overlay from '../Overlay';
import CloseButton from '../CloseButton';

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
    <TransitionGroup>
      {open && (
        <CSSTransition classNames="sidenav__panel--transition" in={open} timeout={350}>
          <div className="sidenav__panel">
            <div className={classnames('sidenav__panel-container', panelClassName)}>
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
        </CSSTransition>
      )}
    </TransitionGroup>
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
