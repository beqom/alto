import React from 'react';
import PropTypes from 'prop-types';

import Overlay from '../Overlay';
import Button from '../Button';
import { bemClass } from '../helpers/bem';

const SideNavPanel = ({ open, children, title, onClose, closeFocusTargetId }) => (
  <Overlay open={open} openFocusTargetId={`${closeFocusTargetId}__open`} onClose={onClose} closeFocusTargetId={closeFocusTargetId}>
    <div className={bemClass('sidenav__panel', { open })} aria-hidden={!open}>
      <div className="sidenav__panel-container">
        <header className="sidenav__panel-header">
          <div className="sidenav__panel-title">
            {title}
          </div>
          <Button id={`${closeFocusTargetId}__open`} outline small onClick={onClose}>
            CLOSE
          </Button>
        </header>
        <div className="sidenav__panel-body">
          {children}
        </div>
      </div>
    </div>
  </Overlay>
);

SideNavPanel.displayName = 'SideNavPanel';

SideNavPanel.defaultProps = {
};

SideNavPanel.propTypes = {
  open: PropTypes.bool.isRequired,
  children: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  closeFocusTargetId: PropTypes.string.isRequired,
};

export default SideNavPanel;
