import React from 'react';
import omit from 'lodash.omit';

const bem = (Component, block, modifiers = []) => p => {
  const safeProps = omit(p, modifiers);
  const className = modifiers
    .filter(modifier => !!p[modifier])
    .map(modifier => `${block}--${modifier}`)
    .reduce((acc, value) => `${acc} ${value}`, block);

  return <Component {...safeProps} className={`${className} ${p.className || ''}`} />;
};

const Button = bem('button', 'Button', [
  'outline',
  'flat',
  'error',
  'success',
  'inverse',
  'large',
  'small',
  'active',
  'block',
]);

Button.displayName = 'Button';

export default Button;
