import React from 'react';
import PropTypes from 'prop-types';

import { bemClass } from '../helpers/bem';
import Tooltip from '../Tooltip';
import './ProgressBar.scss';

class ProgressBar extends React.Component {
  constructor() {
    super();

    this.state = {
      hover: false,
    };

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }
  handleMouseEnter() {
    this.setState({ hover: true });
  }

  handleMouseLeave() {
    this.setState({ hover: false });
  }

  render() {
    const {
      className,
      small,
      large,
      value,
      max,
      min,
      tooltip,
      tooltipPersistent,
      looping,
    } = this.props;
    const ratio = (Math.max(Math.min(max, value || min), min) - min) / (max - min);
    const width = looping ? '100%' : `${ratio * 100}%`;
    return (
      <div
        className="ProgressBar"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        {tooltip &&
          !looping && (
            <div className="ProgressBar__tooltip" style={{ marginLeft: width }}>
              <Tooltip
                content={tooltip(value, ratio)}
                show={this.state.hover || tooltipPersistent}
                top
                tiny
              />
            </div>
          )}
        <div className={bemClass('ProgressBar__placeholder', { small, large }, className)}>
          <div className={bemClass('ProgressBar__bar', { looping }, className)} style={{ width }} />
        </div>
      </div>
    );
  }
}

ProgressBar.displayName = 'ProgressBar';

ProgressBar.defaultProps = {
  min: 0,
  max: 1,
  tooltip: (value, ratio) => `${Math.round(ratio * 100)} %`,
  tooltipPersistent: false,
  looping: false,
};

ProgressBar.propTypes = {
  className: PropTypes.string,
  small: PropTypes.bool,
  large: PropTypes.bool,
  value: PropTypes.number,
  max: PropTypes.number,
  min: PropTypes.number,
  tooltip: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  tooltipPersistent: PropTypes.bool,
  looping: PropTypes.bool,
};

export default ProgressBar;
