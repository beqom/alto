import React from 'react';
import PropTypes from 'prop-types';

import { bemClass } from '../helpers/bem';
import CheckCircleIcon from '../Icons/CheckCircle';
import ExclamationTriangleIcon from '../Icons/ExclamationTriangle';
import ExclamationCircleIcon from '../Icons/ExclamationCircle';
import InfoCircleIcon from '../Icons/InfoCircle';
import RelativeBox from '../RelativeBox';

import './Tooltip.scss';

const getIcon = ({ info, success, warning, error }) => {
  if (info) return InfoCircleIcon;
  if (success) return CheckCircleIcon;
  if (warning) return ExclamationTriangleIcon;
  if (error) return ExclamationCircleIcon;
  return null;
};

class Tooltip extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // eslint-disable-next-line react/no-unused-state
      show: props.show,
      visible: props.show,
    };

    this.wrapperRef = React.createRef();

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  static getDerivedStateFromProps({ show }, state) {
    if (show !== state.show) {
      return {
        show,
        visible: show,
      };
    }
    return null;
  }

  handleMouseEnter() {
    this.setState({ visible: true });
  }

  handleMouseLeave() {
    this.setState({ visible: false });
  }

  renderTooltip() {
    const {
      className,
      children,
      content,
      info,
      success,
      error,
      warning,
      small,
      medium,
      large,
      show,
      tiny,
      ...relativeBoxProps
    } = this.props;

    const { visible } = this.state;

    const Icon = getIcon({
      info,
      success,
      error,
      warning,
    });

    return (
      <RelativeBox
        className={bemClass(
          'Tooltip',
          {
            info,
            success,
            error,
            warning,
            small,
            medium,
            large,
            tiny,
            visible,
          },
          className
        )}
        baseClassName="Tooltip"
        bottom
        middle
        target={this.wrapperRef.current}
        watch={{ visible }}
        margin={6.4}
        {...relativeBoxProps}
      >
        {Icon && (
          <Icon
            left
            baseline
            className={bemClass('Tooltip__icon', {
              info,
              success,
              error,
              warning,
            })}
          />
        )}
        <div className="Tooltip__content">{content}</div>
      </RelativeBox>
    );
  }

  render() {
    if (!this.props.children) return this.renderTooltip();
    return (
      <div
        ref={this.wrapperRef}
        className="Tooltip__wrapper"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        {this.props.children}
        {this.renderTooltip()}
      </div>
    );
  }
}

Tooltip.displayName = 'Tooltip';

Tooltip.defaultProps = {
  show: false,
};

Tooltip.propTypes = {
  className: PropTypes.string,
  content: PropTypes.any,
  children: PropTypes.any,
  info: PropTypes.bool,
  success: PropTypes.bool,
  error: PropTypes.bool,
  warning: PropTypes.bool,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  show: PropTypes.bool,
  tiny: PropTypes.bool,
};

export default Tooltip;
