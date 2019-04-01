import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import TextField from '../TextField';

import { parse, format } from '../../helpers/number';

import './InputNumber.scss';

class InputNumber extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // eslint-disable-next-line react/no-unused-state
      prev: props,
      display: this.format(props.value),
      // eslint-disable-next-line react/no-unused-state
      editing: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    const { value, locale, precision, currency, disableThousandSeparator, max, min } = props;
    if (
      state.prev.value !== value ||
      state.prev.precision !== precision ||
      state.prev.locale !== locale ||
      state.prev.currency !== currency ||
      state.prev.disableThousandSeparator !== disableThousandSeparator ||
      state.prev.min !== min ||
      state.prev.max !== max
    ) {
      return {
        prev: props,
        display: state.editing
          ? state.display
          : format(value, locale, precision, currency, disableThousandSeparator, { min, max }),
      };
    }
    return null;
  }

  handleFocus(e) {
    // eslint-disable-next-line react/no-unused-state
    this.setState({ editing: true });
    if (typeof this.props.onFocus === 'function') {
      this.props.onFocus(e);
    }
  }

  handleBlur(e) {
    // eslint-disable-next-line react/no-unused-state
    this.setState({ editing: false, display: this.format(e.target.value) });
    if (typeof this.props.onBlur === 'function') {
      this.props.onBlur(e);
    }
  }

  handleChange(e) {
    const { value } = e.target;
    this.setState({ display: value });
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(e, this.parse(e.target.value || ''));
    }
  }

  parse(value) {
    const { locale, precision, min, max } = this.props;
    const res = parse(value, locale, precision, { min, max });
    return Number.isNaN(res) ? '' : res;
  }

  format(value) {
    const { locale, precision, currency, disableThousandSeparator, min, max } = this.props;
    return format(value, locale, precision, currency, disableThousandSeparator, { min, max });
  }

  render() {
    const {
      forwardedRef,
      locale,
      precision,
      disableThousandSeparator,
      className,
      ...rest
    } = this.props;
    return (
      <TextField
        ref={forwardedRef}
        {...rest}
        className={classnames('InputNumber', className)}
        type="text"
        value={this.state.display}
        onChange={this.handleChange}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
      />
    );
  }
}

InputNumber.defaultProps = {
  precision: 0,
  locale: navigator.language,
};

InputNumber.propTypes = {
  className: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  precision: PropTypes.number,
  locale: PropTypes.string,
  currency: PropTypes.string,
  forwardedRef: PropTypes.object,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  disableThousandSeparator: PropTypes.bool,
  min: PropTypes.number,
  max: PropTypes.number,
};

export default React.forwardRef((props, ref) => <InputNumber {...props} forwardedRef={ref} />);
