import React, { forwardRef } from 'react';
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
      includeTarget,
      inert,
      target,
      forwardedRef,
      ...relativeBoxProps
    } = this.props;

    const trigger = this.renderTrigger();

    return (
      <>
        {trigger}
        <Overlay
          onClose={onClose}
          openFocusTargetId={openFocusTargetId}
          closeFocusTargetId={closeFocusTargetId}
          open={open}
          include={
            includeTarget ? this.props.target || this.props.targetRef || this.targetRef : undefined
          }
          inert={inert}
        >
          {open && (
            <RelativeBox
              className={bemClass('Popover', {}, className)}
              margin={6.4}
              targetRef={trigger ? this.targetRef : undefined}
              target={trigger ? undefined : target}
              ref={forwardedRef}
              {...relativeBoxProps}
            >
              {children}
            </RelativeBox>
          )}
        </Overlay>
      </>
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
  ]),
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
  includeTarget: PropTypes.bool,
  inert: PropTypes.bool,
  forwardedRef: PropTypes.object,
};

export default forwardRef((props, forwardedRef) => <Popover {...props} ref={forwardedRef} />);
