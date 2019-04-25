import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import compose from 'lodash.compose';

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
    const { value, locale, precision, currency, disableThousandSeparator, percent } = props;
    if (
      state.prev.value !== value ||
      state.prev.precision !== precision ||
      state.prev.locale !== locale ||
      state.prev.currency !== currency ||
      state.prev.disableThousandSeparator !== disableThousandSeparator ||
      state.prev.percent !== percent
    ) {
      return {
        prev: props,
        display: state.editing
          ? state.display
          : format(value, locale, precision, currency, disableThousandSeparator, {
              percent,
            }),
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
    this.setState({ editing: false, display: this.format(this.parse(e.target.value)) });
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
    const { locale, precision, percent } = this.props;

    return compose(
      x => (percent && typeof x === 'number' ? x / 100 : x),
      x => (Number.isNaN(x) ? '' : x),
      x => parse(x, locale, precision, { percent })
    )(value);
  }

  format(value) {
    const { locale, precision, currency, disableThousandSeparator, percent } = this.props;
    return format(value, locale, precision, currency, disableThousandSeparator, {
      percent,
    });
  }

  render() {
    const {
      forwardedRef,
      locale,
      precision,
      disableThousandSeparator,
      className,
      percent,
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
  percent: PropTypes.bool,
};

export default React.forwardRef((props, ref) => <InputNumber {...props} forwardedRef={ref} />);
