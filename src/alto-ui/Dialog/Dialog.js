import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import VisuallyHidden from '../VisuallyHidden';
import CloseIcon from '../Icons/Close';
import Button from '../Button';
import Overlay from '../Overlay';

import './Dialog.scss';

const Dialog = props => {
  const {
    id,
    className,
    children,
    open,
    title,
    onClose,
    buttons,
    closeFocusTargetId,
    inert,
  } = props;
  const openFocusTargetId =
    props.openFocusTargetId ||
    `${id}__${buttons && buttons.length ? `button--${buttons.length}` : 'close-button'}`;
  
  const labels = Object.assign({}, { a11yClose: 'Close' }, props.labels);
  return (
    <Overlay
      onClose={onClose}
      openFocusTargetId={openFocusTargetId}
      closeFocusTargetId={closeFocusTargetId}
      open={open}
      blocking
      inert={inert}
    >
      {open && (
        <div
          className={classnames('Dialog', className)}
          role="dialog"
          aria-modal="true"
          aria-labelledby={`${id}__title`}
        >
          {(!!title || !!onClose) && (
            <header className="Dialog__header">
              {!!title && (
                <h2 id={`${id}__title`} className="Dialog__title">
                  {title}
                </h2>
              )}
              {!!onClose && (
                <button
                  id={`${id}__close-button`}
                  className="Dialog__close-button"
                  onClick={onClose}
                  disabled={inert}
                >
                  <CloseIcon />
                  <div className="Dialog__close-label">
                    <span aria-hidden="true">ESC</span>
                    <VisuallyHidden>{labels.a11yClose}</VisuallyHidden>
                  </div>
                </button>
              )}
            </header>
          )}
          {!!title && <hr className="Dialog__header-stroke" />}
          <div className="Dialog__body">{children}</div>
          {!!buttons &&
            !!buttons.length && (
              <footer className="Dialog__footer">
                {buttons
                  .map(btn => (typeof btn === 'string' ? { children: btn } : btn))
                  .map((btn, index) => (
                    <li key={btn.children}>
                      <Button
                        id={`${id}__button--${index + 1}`}
                        className="Dialog__button"
                        outline={index < buttons.length - 1}
                        onClick={onClose}
                        {...btn}
                        disabled={inert || btn.disabled}
                      />
                    </li>
                  ))}
              </footer>
            )}
        </div>
      )}
    </Overlay>
  );
};

Dialog.displayName = 'Dialog';

Dialog.defaultProps = {
  open: false,
  inert: false,
};

Dialog.propTypes = {
  id: PropTypes.string.isRequired,
  openFocusTargetId: PropTypes.string,
  closeFocusTargetId: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.any,
  open: PropTypes.bool,
  inert: PropTypes.bool,
  labels: PropTypes.shape({
    a11yClose: PropTypes.string.isRequired,
  }),
  title: PropTypes.string,
  onClose: PropTypes.func,
  buttons: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        children: PropTypes.string.isRequired,
        onClick: PropTypes.func,
      }),
    ])
  ),
};

export default Dialog;
