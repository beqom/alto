import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { getRelativePosition, getRelativePositionStyle } from '../helpers/position';

import './RelativeBox.scss';
import { bemClass } from '../helpers/bem';

class RelativeBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      style: {},
      position: {},
    };

    this.ref = React.createRef();
  }

  componentDidMount() {
    this.updateStyle();
  }

  componentDidUpdate(prevProps) {
    const targetChanged = !prevProps.target && !!this.props.target;
    const targetRefChanged =
      prevProps.target && !prevProps.target.current && !!this.props.target.current;
    if (targetChanged || targetRefChanged) {
      this.updateStyle();
    } else if (prevProps.watch) {
      const indexOfPropChanged = Object.entries(prevProps.watch).findIndex(
        ([key, value]) => this.props.watch[key] !== value
      );
      if (indexOfPropChanged > -1) {
        this.updateStyle();
      }
    } else {
      this.updateStyle();
    }
  }

  getStyle() {
    if (this.props.style) return { ...this.state.style, ...this.props.style };
    return this.state.style;
  }

  getClassNameWithModifiers() {
    if (!this.props.baseClassName) return null;
    const { start, middle, end } = this.props;
    const { position } = this.state;
    return bemClass(this.props.baseClassName, { ...position, start, middle, end });
  }

  getProps() {
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
    } = this.props;

    return {
      ...this.props,
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

  getTarget() {
    return this.props.target || (this.props.targetRef || {}).current;
  }

  updateStyle() {
    const { options } = this.getProps();
    const target = this.getTarget();
    const { style, position } = this.state;

    const { top, bottom, right, left } = getRelativePosition(this.ref.current, target, options);
    const positionChanged =
      top !== position.top ||
      bottom !== position.bottom ||
      left !== position.left ||
      right !== position.right;

    const newStyle = getRelativePositionStyle(this.ref.current, target, options);
    const styleChanged = newStyle.top !== style.top || newStyle.left !== style.left;
    if (positionChanged || styleChanged) {
      const customStyle =
        typeof this.props.style === 'function'
          ? this.props.style(newStyle, target, this.ref.current)
          : this.props.style || {};
      this.setState({
        style: { ...newStyle, ...customStyle },
        position: { top, bottom, right, left },
      });
    }
  }

  render() {
    const { props, className } = this.getProps();
    return (
      <div
        ref={this.ref}
        {...props}
        className={classnames('RelativeBox', className, this.getClassNameWithModifiers())}
        style={this.getStyle()}
      />
    );
  }
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
