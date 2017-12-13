import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash.omit';
import classnames from 'classnames';

const bem = (ComponentToRender, block, modifiers = [], extraProps = []) => {
  const Component = props => {
    const safeProps = omit(props, modifiers.concat(extraProps));
    const className = modifiers
      .filter(modifier => !!props[modifier])
      .map(modifier => `${block}--${modifier}`)
      .reduce((acc, value) => `${acc} ${value}`, block);

    return <ComponentToRender {...safeProps} className={`${className} ${props.className || ''}`} />;
  };

  Component.propTypes = modifiers.reduce(
    (acc, modifier) =>
      Object.assign({}, acc, {
        [modifier]: PropTypes.bool,
      }),
    {}
  );

  Component.propTypes.className = PropTypes.string;

  return Component;
};

export const bemClass = (block, modifiers, ...others) =>
  classnames(
    block,
    Object.entries(modifiers).reduce(
      (acc, [modifier, value]) => Object.assign({}, acc, { [`${block}--${modifier}`]: value }),
      {}
    ),
    ...others
  );

export default bem;
