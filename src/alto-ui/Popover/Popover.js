import React from 'react';
import PropTypes from 'prop-types';

import { bemClass } from '../helpers/bem';
import RelativeBox from '../RelativeBox';
import Overlay from '../Overlay';

import './Popover.scss';

class Popover extends React.Component {
  constructor() {
    super();

    this.targetRef = React.createRef();
  }

  renderTrigger() {
    const { target } = this.props;
    if (target instanceof Element || this.props.targetRef) return null;
    if (typeof target === 'function') return target(this.targetRef);
    return (
      <div ref={this.targetRef} className="Popover__trigger">
        {target}
      </div>
    );
  }

  render() {
    const {
      className,
      children,
      onClose,
      openFocusTargetId,
      closeFocusTargetId,
      open,
      target,
      ...relativeBoxProps
    } = this.props;

    return (
      <Overlay
        onClose={onClose}
        openFocusTargetId={openFocusTargetId}
        closeFocusTargetId={closeFocusTargetId}
        open={open}
        render
      >
        {this.renderTrigger()}
        {open && (
          <RelativeBox
            className={bemClass('Popover', {}, className)}
            margin={6.4}
            targetRef={this.targetRef}
            {...relativeBoxProps}
          >
            {children}
          </RelativeBox>
        )}
      </Overlay>
    );
  }
}

Popover.displayName = 'Popover';

Popover.defaultProps = {};

Popover.propTypes = {
  target: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.element,
    PropTypes.object,
    PropTypes.func,
  ]).isRequired,
  targetRef: PropTypes.shape({
    current: PropTypes.object,
  }),
  className: PropTypes.string,
  children: PropTypes.any,
  top: PropTypes.bool,
  right: PropTypes.bool,
  left: PropTypes.bool,
  start: PropTypes.bool,
  end: PropTypes.bool,
  onClose: PropTypes.func,
  openFocusTargetId: PropTypes.string,
  closeFocusTargetId: PropTypes.string,
  open: PropTypes.bool,
};

export default Popover;
