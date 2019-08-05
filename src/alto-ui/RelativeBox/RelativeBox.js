import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { getRelativePosition, getRelativePositionStyle } from '../helpers/position';

import './RelativeBox.scss';
import { bemClass } from '../helpers/bem';

function usePrevious(value) {
  const ref = useRef(value);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function getStyle(props, state) {
  if (props.style) return { ...state.style, ...props.style };
  return state.style;
}

function getClassNameWithModifiers(props, state) {
  if (!props.baseClassName) return null;
  const { start, middle, end } = props;
  const { position } = state;
  return bemClass(props.baseClassName, { ...position, start, middle, end });
}

function getProps(oldProps) {
  const {
    top,
    bottom,
    left,
    right,
    start,
    middle,
    end,
    margin,
    target,
    targetRef,
    style,
    className,
    baseClassName,
    watch,
    ...props
  } = oldProps;

  return {
    ...oldProps,
    props,
    options: {
      top,
      bottom,
      left,
      right,
      start,
      middle,
      end,
      margin,
    },
  };
}

function RelativeBox(props) {
  const { watch } = props;
  const target = props.target || (props.targetRef || {}).current;
  const [state, setState] = useState({ style: {}, position: {} });
  const ref = useRef();

  function updateStyle() {
    const { options } = getProps(props);
    const { style, position } = state;

    const { top, bottom, right, left } = getRelativePosition(ref.current, target, options);
    const positionChanged =
      top !== position.top ||
      bottom !== position.bottom ||
      left !== position.left ||
      right !== position.right;

    const newStyle = getRelativePositionStyle(ref.current, target, options);
    const styleChanged = newStyle.top !== style.top || newStyle.left !== style.left;

    if (positionChanged || styleChanged) {
      const customStyle =
        typeof props.style === 'function'
          ? props.style(newStyle, target, ref.current)
          : props.style || {};
      setState({
        style: { ...newStyle, ...customStyle },
        position: { top, bottom, right, left },
      });
    }
  }

  const previous = usePrevious({ target, watch, props });

  useLayoutEffect(() => {
    const targetChanged = !previous.target && !!target;

    if (targetChanged) {
      updateStyle();
    } else if (watch) {
      const propsChanged = Object.entries(previous.watch).some(
        ([key, value]) => watch[key] !== value
      );
      if (propsChanged) {
        updateStyle();
      }
    } else {
      updateStyle();
    }
  }, [props, ref.current, target]);

  const { props: otherProps, className } = getProps(props);

  return (
    <div
      ref={ref}
      {...otherProps}
      className={classnames('RelativeBox', className, getClassNameWithModifiers(props, state))}
      style={getStyle(props, state)}
    />
  );
}

RelativeBox.displayName = 'RelativeBox';

RelativeBox.defaultProps = {};

RelativeBox.propTypes = {
  // dom node required
  target: PropTypes.object,
  targetRef: PropTypes.shape({
    current: PropTypes.object,
  }),
  className: PropTypes.string,
  baseClassName: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  children: PropTypes.any,
  watch: PropTypes.object,
  top: PropTypes.bool,
  bottom: PropTypes.bool,
  left: PropTypes.bool,
  right: PropTypes.bool,
  start: PropTypes.bool,
  middle: PropTypes.bool,
  end: PropTypes.bool,
  margin: PropTypes.number,
};

export default RelativeBox;
