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
    (acc, modifier) => ({...acc, [modifier]: PropTypes.bool}), {}
  );

  Component.propTypes.className = PropTypes.string;

  return Component;
};

export const bemClass = (block, modifiers = {}, ...others) =>
  classnames(
    block,
    Object.keys(modifiers)
      .filter(modifier => !!modifiers[modifier])
      .map(modifier => `${block}--${modifier}`),
    ...others
  ).trim();

const toDashCase = s =>
  s
    .trim()
    .replace(/[A-Z]/g, ' $&')
    .replace(/( |_|-)+/g, '-')
    .toLowerCase();

export const bemProps = (block, modifiers, ...others) => (props, extraProps) => {
  const propsToExclude = modifiers.concat(extraProps);
  return Object.assign(
    {},
    Object.entries(props).reduce(
      (acc, [prop, value]) =>
        propsToExclude.includes(prop) ? acc : ({ ...acc, [prop]: value }),
      {}
    ),
    {
      className: classnames(block, [
        ...modifiers
          .filter(modifier => !!props[modifier])
          .map(modifier => `${block}--${toDashCase(modifier)}`),
        props.className,
        ...others,
      ]),
    }
  );
};

export default bem;
