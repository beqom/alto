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
  }

  componentWillUnmount() {
    this.close();
  }

  setContentNode(contentNode) {
    this.contentNode = contentNode;
  }

  open() {
    const { onClose, openFocusTargetId } = this.props;
    if (onClose) {
      document.addEventListener('keydown', this.handleKeyDown);
      document.addEventListener('click', this.handleClickOutside);
    }
    focusId(openFocusTargetId);
  }

  close() {
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('click', this.handleClickOutside);
    focusId(this.props.closeFocusTargetId);
  }

  handleKeyDown(e) {
    if (e.key === 'Escape') {
      this.props.onClose();
    }
  }

  handleClickOutside(e) {
    if (this.contentNode && !this.contentNode.contains(e.target)) {
      this.props.onClose();
    }
  }

  render() {
    const { open, children, blocking, onClose } = this.props;
    const focusOut = !!open && !blocking && !!onClose;
    return (
      <Fragment>
        {open && blocking && <div className="Overlay__overlay" />}
        {focusOut && (
          <div
            aria-hidden="true"
            tabIndex="0"
            role="button"
            className="Overlay__focus-out"
            onFocus={onClose}
          />
        )}
        <div ref={this.setContentNode} aria-hidden={!open} className="Overlay">
          <FocusTrap
            active={open && blocking}
            className="Overlay__focus-trap"
            focusTrapOptions={{ clickOutsideDeactivates: true }}
          >
            {children}
          </FocusTrap>
        </div>
        {focusOut && (
          <div
            aria-hidden="true"
            tabIndex="0"
            role="button"
            className="Overlay__focus-out"
            onFocus={onClose}
          />
        )}
      </Fragment>
    );
  }
}

Overlay.displayName = 'Overlay';

Overlay.defaultProps = {
  blocking: false,
};

Overlay.propTypes = {
  children: PropTypes.any,
  onClose: PropTypes.func,
  openFocusTargetId: PropTypes.string.isRequired,
  closeFocusTargetId: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  blocking: PropTypes.bool,
};

export default Overlay;
