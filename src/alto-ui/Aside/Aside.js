import React from 'react';
import PropTypes from 'prop-types';

import { bemClass } from '../helpers/bem';

import CloseButton from '../CloseButton';

import './Aside.scss';

function Aside({ className, onClose, show, title, children, a11yCloseLabel }) {
  if (!show) return null;
  return (
    <aside className={bemClass('Aside', {}, className)}>
      <div className="Aside__header">
        <div className="Aside__title">{title}</div>
        {onClose && <CloseButton open={show} onClose={onClose} a11yLabel={a11yCloseLabel} />}
      </div>
      <div className="Aside__content">{children}</div>
    </aside>
  );
}

Aside.displayName = 'Aside';

Aside.defaultProps = {
  show: true,
  a11yCloseLabel: 'Close Panel',
};

Aside.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  show: PropTypes.bool,
  title: PropTypes.string,
  children: PropTypes.any,
  a11yCloseLabel: PropTypes.string,
};

export default Aside;
