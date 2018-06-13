import React from 'react';
import PropTypes from 'prop-types';
import DayPicker, { LocaleUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { DateTime } from 'luxon';
import classnames from 'classnames';

import { bemClass } from '../../helpers/bem';
import TextField from '../TextField';
import Overlay from '../../Overlay';
import VisuallyHidden from '../../VisuallyHidden';
import Card from '../../Card';
import DatePickerHeader from './DatePickerHeader';

import './DatePicker.scss';

const renderDay = datePickerId => date => (
  <button
    id={`${datePickerId}__day--${date.getTime()}`}
    tabIndex="-1"
    className="DayPicker__a11y-day-button"
  >
    <span aria-hidden="true">{date.getDate()}</span>
    <VisuallyHidden>
      {DateTime.fromJSDate(date).toLocaleString(DateTime.DATE_HUGE)}, button
    </VisuallyHidden>
  </button>
);

class DatePicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      month: this.getDate() || DateTime.local(),
    };

    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChangeMonth = this.handleChangeMonth.bind(this);
  }

  getDate() {
    return this.props.value ? DateTime.fromJSDate(this.props.value) : null;
  }

  setDate(date) {
    this.props.onChange(date);
  }

  handleFocus(e) {
    if (this.props.readOnly) return;
    if (this.props.inputProps.focus) {
      this.props.inputProps.focus(e);
    }

    this.setState({ open: true });
  }

  handleBlur(e) {
    if (this.props.inputProps.focus) {
      this.props.inputProps.focus(e);
    }

    this.setState({ open: false });
  }

  handleClose() {
    this.setState({ open: false });
  }

  handleChangeMonth(obj) {
    this.setState(({ month }) => ({ month: month.set(obj) }));
  }

  render() {
    const { id } = this.props;
    const { open } = this.state;
    const date = this.getDate();

    return (
      <div className={classnames('DatePicker', this.props.className)}>
        <Overlay onClose={this.handleClose} open={open}>
          <TextField
            placeholder={this.props.format}
            label={this.props.label}
            {...this.props.inputProps}
            readOnly={this.props.readOnly}
            onFocus={this.handleFocus}
            onChange={() => {}}
            value={date ? date.toFormat(this.props.format) : ''}
            id={`${id}__input`}
          />

          <Card className={bemClass('DatePicker__day-picker', { open })}>
            <DatePickerHeader date={this.state.month} id={id} onChange={this.handleChangeMonth} />
            <DayPicker
              month={this.state.month.toJSDate()}
              canChangeMonth={false}
              captionElement={() => null}
              onDayClick={d => {
                this.setDate(d);
                this.setState({ open: false });
              }}
              localeUtils={{ ...LocaleUtils, formatDay: () => '' }}
              selectedDays={date ? date.toJSDate() : null}
              renderDay={renderDay(id)}
            />
          </Card>
        </Overlay>
      </div>
    );
  }
}

DatePicker.displayName = 'DatePicker';

DatePicker.defaultProps = {
  inputProps: {},
  format: 'yyyy-MM-dd',
};

DatePicker.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.any,
  format: PropTypes.string,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.object,
  inputProps: PropTypes.shape({
    focus: PropTypes.func,
  }),
};

export default DatePicker;
