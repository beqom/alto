import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { bemClass } from '../helpers/bem';

import './Overlay.scss';

const focusId = id => {
  const domNode = document.getElementById(id);
  if (domNode) {
    domNode.focus();
  }
}

class Overlay extends React.PureComponent {
  constructor() {
    super();

    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    if (this.props.open) {
      this.open();
    }
  }

  componentDidUpdate(prevProps) {
    if(prevProps.open !== this.props.open) {
      if(this.props.open) {
        this.open();
      } else {
        this.close();
      }
    }
  }

  open() {
    document.addEventListener('keydown', this.handleKeyDown);
    focusId(this.props.openFocusTargetId);
  }

  close() {
    document.removeEventListener('keydown', this.handleKeyDown);
    focusId(this.props.closeFocusTargetId);
  }

  handleKeyDown(e) {
    if(e.key === 'Escape') {
      this.props.onClose();
    }
  }

  render() {
    const { open, onClose, children, darken } = this.props;
    return (
      <Fragment>
        {open && <button className={bemClass('Overlay', { darken })} onClick={onClose} />}
        {open && <div tabIndex="0" role="button" className="Overlay__focus-out" onFocus={onClose} />}
        {children}
        {open && <div tabIndex="0" role="button" className="Overlay__focus-out" onFocus={onClose} />}
      </Fragment>
    )
  }
};

Overlay.displayName = 'Overlay';

Overlay.defaultProps = {
};

Overlay.propTypes = {
  children: PropTypes.any.isRequired,
  onClose: PropTypes.func.isRequired,
  openFocusTargetId: PropTypes.string.isRequired,
  closeFocusTargetId: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  darken: PropTypes.bool,
};

export default Overlay;
