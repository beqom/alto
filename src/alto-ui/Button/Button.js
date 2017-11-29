import React from 'react';

const omit = keys => obj =>
  Object.entries(obj)
    .filter(([ key ]) => !keys.includes(key))
    .reduce((acc, [key, value]) => Object.assign({}, acc, {
      [key]: value,
    }), {});

const bem = (Component, block, modifiers = []) => p => {
  const safeProps = omit(modifiers)(p);
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
  'large',
  'small',
  'active',
  'block',
]);

Button.displayName = 'Button';
