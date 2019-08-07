import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import FocusTrap from 'focus-trap-react';
import Portal from '../Portal';

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
    this.handleFocusOutside = this.handleFocusOutside.bind(this);
    this.dispatchClose = this.dispatchClose.bind(this);

    this.contentRef = React.createRef();
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
        clearTimeout(this.closingTimeout);
        this.removeCloseEventListener();
      } else {
        this.addCloseEventListener();
      }
    }
  }

  componentWillUnmount() {
    this.removeCloseEventListener();
    clearTimeout(this.closingTimeout);
    this.props.removeOverlay();
  }

  contains(node) {
    const { include } = this.props;
    if (this.contentRef.current && this.contentRef.current.contains(node)) return true;
    if (include) {
      const elt = include instanceof Element ? include : include.current;
      if (elt && elt.contains(node)) return true;
    }
    return false;
  }

  open() {
    this.props.pushOverlay();
    this.addCloseEventListener();
    if (this.props.openFocusTargetId) {
      focusId(this.props.openFocusTargetId);
    }
  }

  close() {
    this.props.removeOverlay();
    this.removeCloseEventListener();
    if (this.props.closeFocusTargetId) {
      focusId(this.props.closeFocusTargetId);
    }
  }

  addCloseEventListener() {
    const { blocking, onClose, inert } = this.props;
    if (onClose && !inert) {
      document.addEventListener('keydown', this.handleKeyDown);

      if (!blocking) {
        // using capture will allow to detect the click on a node that will disapear
        // after this click -> remove an item of list for example by clicking on this item
        document.addEventListener('click', this.handleClickOutside, true);
        document.addEventListener('focusin', this.handleFocusOutside);
        window.addEventListener('blur', this.handleWindowBlur);
      }
    }
  }

  removeCloseEventListener() {
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('click', this.handleClickOutside, true);
    document.removeEventListener('focusin', this.handleFocusOutside);
    window.removeEventListener('blur', this.handleWindowBlur);
  }

  handleFocusOutside(e) {
    if (!this.contains(e.target)) {
      this.dispatchClose();
    }
  }

  handleKeyDown(e) {
    if (e.key === 'Escape' || e.key === 'Esc') {
      this.dispatchClose();
    }
  }

  handleClickOutside(e) {
    if (!this.contains(e.target)) {
      this.dispatchClose();
    }
  }

  dispatchClose() {
    clearTimeout(this.closingTimeout);
    this.closingTimeout = setTimeout(this.props.onClose, 0);
  }

  render() {
    const { open, children, blocking, inert, className } = this.props;
    return (
      <Portal display={open}>
        {open && blocking && <div className={classnames('Overlay__overlay', className)} />}
        <div ref={this.contentRef} aria-hidden={!open || inert} className="Overlay">
          {blocking ? (
            <FocusTrap
              active={open && !inert}
              className="Overlay__focus-trap"
              focusTrapOptions={{ clickOutsideDeactivates: true }}
            >
              {children}
            </FocusTrap>
          ) : (
            children
          )}
        </div>
        {open && !blocking && !inert && (
          <div
            aria-hidden="true"
            // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
            tabIndex="0"
            onFocus={this.dispatchClose}
          />
        )}
      </Portal>
    );
  }
}

Overlay.displayName = 'Overlay';

Overlay.defaultProps = {
  blocking: false,
};

Overlay.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  onClose: PropTypes.func,
  openFocusTargetId: PropTypes.string,
  closeFocusTargetId: PropTypes.string,
  open: PropTypes.bool.isRequired,
  blocking: PropTypes.bool,
  inert: PropTypes.bool.isRequired,
  include: PropTypes.object,
  pushOverlay: PropTypes.func.isRequired,
  removeOverlay: PropTypes.func.isRequired,
};

export default Overlay;
