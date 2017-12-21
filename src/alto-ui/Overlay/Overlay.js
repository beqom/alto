import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import './Overlay.scss';

class Overlay extends React.PureComponent {
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
    const { openFocusTargetId } = this.props;
    document.getElementById(openFocusTargetId).focus();
  }

  close() {
    const { closeFocusTargetId } = this.props;
    document.getElementById(closeFocusTargetId).focus();
  }

  render() {
    const { open, onClose, children } = this.props;
    return (
      <Fragment>
        {open && <button className="Overlay" onClick={onClose} />}
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
};

export default Overlay;
