import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import FocusTrap from 'focus-trap-react';

import './Overlay.scss';

const focusId = id => {
  const domNode = document.getElementById(id);
  if (domNode) {
    domNode.focus();
  }
};

class Overlay extends React.PureComponent {
  constructor() {
    super();

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.setContentNode = this.setContentNode.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  componentDidMount() {
    if (this.props.open) {
      this.open();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.open !== this.props.open) {
      if (this.props.open) {
        this.open();
      } else {
        this.close();
      }
    }

    if (prevProps.inert !== this.props.inert) {
      if (this.props.inert) {
        this.removeCloseEventListener();
      } else {
        this.addCloseEventListener();
      }
    }
  }

  componentWillUnmount() {
    this.close();
  }

  setContentNode(contentNode) {
    this.contentNode = contentNode;
  }

  open() {
    this.addCloseEventListener();
    if (this.props.openFocusTargetId) {
      focusId(this.props.openFocusTargetId);
    }
  }

  close() {
    this.removeCloseEventListener();
    if (this.props.closeFocusTargetId) {
      focusId(this.props.closeFocusTargetId);
    }
  }

  addCloseEventListener() {
    if (this.props.onClose && !this.props.inert) {
      document.addEventListener('keydown', this.handleKeyDown);
      document.addEventListener('click', this.handleClickOutside);
    }
  }

  removeCloseEventListener() {
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('click', this.handleClickOutside);
  }

  handleFocus() {
    this.cancelClose();
  }

  handleBlur(e) {
    const { open, blocking, onClose, inert } = this.props;
    if (!!open && !blocking && !!onClose && !inert) {
      this.close();
    }
  }

  handleKeyDown(e) {
    if (e.key === 'Escape') {
      this.props.onClose();
    }
  }

  handleClickOutside(e) {
    if (this.contentNode) {
      if (this.contentNode.contains(e.target)) {
        this.cancelClose();
      } else {
        this.props.onClose();
      }
    }
  }

  close() {
    this.closeTimeout = setTimeout(this.props.onClose, 0);
  }

  cancelClose() {
    clearTimeout(this.closeTimeout);
  }

  render() {
    const { open, children, blocking, inert } = this.props;
    return (
      <Fragment>
        {open && blocking && <div className="Overlay__overlay" />}
        <div
          ref={this.setContentNode}
          aria-hidden={!open || inert}
          className="Overlay"
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
        >
          <FocusTrap
            active={open && blocking && !inert}
            className="Overlay__focus-trap"
            focusTrapOptions={{ clickOutsideDeactivates: true }}
          >
            {children}
          </FocusTrap>
        </div>
      </Fragment>
    );
  }
}

Overlay.displayName = 'Overlay';

Overlay.defaultProps = {
  blocking: false,
  inert: false,
};

Overlay.propTypes = {
  children: PropTypes.any,
  onClose: PropTypes.func,
  openFocusTargetId: PropTypes.string,
  closeFocusTargetId: PropTypes.string,
  open: PropTypes.bool.isRequired,
  blocking: PropTypes.bool,
  inert: PropTypes.bool,
};

export default Overlay;
