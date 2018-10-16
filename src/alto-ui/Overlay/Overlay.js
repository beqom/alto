import React, { Fragment } from 'react';
import classnames from 'classnames';
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
    this.handleFocusOutside = this.handleFocusOutside.bind(this);
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
    this.removeCloseEventListener();
    clearTimeout(this.closingTimeout);
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
    const { blocking, onClose, inert } = this.props;
    if (onClose && !inert) {
      document.addEventListener('keydown', this.handleKeyDown);
      // using capture will allow to detect the click on a node that will disapear
      // after this click -> remove an item of list for example by clicking on this item
      document.addEventListener('click', this.handleClickOutside, true);

      if (!blocking) {
        document.addEventListener('focusin', this.handleFocusOutside);
      }
    }
  }

  removeCloseEventListener() {
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('click', this.handleClickOutside, true);
    document.removeEventListener('focusin', this.handleFocusOutside);
  }

  handleFocusOutside(e) {
    if (this.contentNode && this.props.open && !this.contentNode.contains(e.target)) {
      this.dispatchClose();
    }
  }

  handleKeyDown(e) {
    if (e.key === 'Escape' || e.key === 'Esc') {
      this.dispatchClose();
    }
  }

  handleClickOutside(e) {
    if (this.contentNode && !this.contentNode.contains(e.target)) {
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
      <Fragment>
        {open && blocking && <div className={classnames('Overlay__overlay', className)} />}
        <div ref={this.setContentNode} aria-hidden={!open || inert} className="Overlay">
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
  className: PropTypes.string,
  onClose: PropTypes.func,
  openFocusTargetId: PropTypes.string,
  closeFocusTargetId: PropTypes.string,
  open: PropTypes.bool.isRequired,
  blocking: PropTypes.bool,
  inert: PropTypes.bool,
};

export default Overlay;
