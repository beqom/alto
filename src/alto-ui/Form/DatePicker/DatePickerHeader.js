import React from 'react';
import PropTypes from 'prop-types';
import { LocaleUtils } from 'react-day-picker';
import { DateTime } from 'luxon';

import TextField from '../TextField';
import Select from '../Select';
import FormRow from '../FormRow';
import Button from '../../Button';
import ChevronLeftIcon from '../../Icons/ChevronLeft';
import ChevronRightIcon from '../../Icons/ChevronRight';
import ButtonGroup from '../../ButtonGroup/ButtonGroup';
import Input from '../../Input';

const months = LocaleUtils.getMonths().map((month, i) => ({
  title: month,
  value: i + 1,
}));

class DatePickerHeader extends React.Component {
  constructor() {
    super();

    this.state = {
      time: null,
    };

    this.handleClickPrevMonth = this.handleClickPrevMonth.bind(this);
    this.handleClickNextMonth = this.handleClickNextMonth.bind(this);
    this.handleChangeMonth = this.handleChangeMonth.bind(this);
    this.handleChangeYear = this.handleChangeYear.bind(this);
    this.handleClickToday = this.handleClickToday.bind(this);
    this.handleChangeTime = this.handleChangeTime.bind(this);
  }

  handleClickPrevMonth() {
    const { date } = this.props;
    const newDate =
      date.month === 1 ? { year: date.year - 1, month: 12 } : { month: date.month - 1 };
    this.props.onChange(newDate);
  }

  handleClickNextMonth() {
    const { date } = this.props;
    const newDate =
      date.month === 12 ? { year: date.year + 1, month: 1 } : { month: date.month + 1 };
    this.props.onChange(newDate);
  }

  handleChangeTime() {
    const { time } = this.state;
    const timeParsed = (time || '').split(/[:. ,;_-]+/);
    const hourParsed = parseInt((timeParsed[0] || '').slice(0, 2), 10);
    const minute =
      timeParsed.length > 1
        ? parseInt((timeParsed[1] || '').slice(0, 2), 10)
        : parseInt((timeParsed[0] || '').slice(2, 4), 10);

    const isPM = this.props.date.hour > 11;
    const hourAMPM = hourParsed < 12 && isPM ? hourParsed + 12 : hourParsed;
    const hour = hourAMPM === 12 && !isPM ? 0 : hourAMPM;
    this.props.onChangeTime({ hour, minute });
    this.setState({ time: null });
  }

  handleChangeMonth(month) {
    this.props.onChange({ month });
  }

  handleChangeYear(e) {
    const { month } = this.props.date;
    const newDate = { year: parseInt(e.target.value, 10), month };
    this.props.onChange(newDate);
  }

  handleClickToday() {
    this.props.onChange(DateTime.local().toObject());
  }

  render() {
    const { id, date, labels } = this.props;
    const datePickerLabels = {
      month: 'Month',
      year: 'Year',
      time: 'Time',
      today: 'Today',
      ...labels,
    };

    return (
      <div className="DatePicker__header">
        <FormRow className="DatePicker__header-row">
          <div className="DatePicker__input-primary">
            <Select
              id={`${id}__month-select`}
              label={datePickerLabels.month}
              hideLabel
              value={date.month}
              name="month"
              onChange={this.handleChangeMonth}
              options={months}
            />
          </div>

          <TextField
            id={`${id}__year-input`}
            label={datePickerLabels.year}
            hideLabel
            type="number"
            name="year"
            className="DatePicker__year-input"
            value={date.year}
            onChange={this.handleChangeYear}
          />
        </FormRow>
        {this.props.datetime && (
          <FormRow className="DatePicker__header-row">
            <div className="DatePicker__input-primary">
              <Input
                id={`${id}__time`}
                label={datePickerLabels.time}
                hideLabel
                value={this.state.time === null ? date.toFormat('hh:mm') : this.state.time}
                onBlur={this.handleChangeTime}
                name="time"
                placeholder="04:15"
                onChange={time => this.setState({ time })}
              />
            </div>

            <ButtonGroup
              className="DatePicker__am-pm-choice"
              items={[{ title: 'am', value: -12 }, { title: 'pm', value: 12 }]}
              value={date.hour > 11 ? 12 : -12}
              onChange={delta => this.props.onChangeTime({ hour: date.hour + delta })}
            />
          </FormRow>
        )}
        <div className="DatePicker__nav">
          <ChevronLeftIcon
            id={`${id}__button--previous-month`}
            onClick={this.handleClickPrevMonth}
          />
          <Button
            id={`${id}__button--today`}
            flat
            small
            className="DatePicker__today-button"
            onClick={this.handleClickToday}
          >
            {datePickerLabels.today}
          </Button>
          <ChevronRightIcon id={`${id}__button--next-month`} onClick={this.handleClickNextMonth} />
        </div>
      </div>
    );
  }
}

DatePickerHeader.propTypes = {
  id: PropTypes.string.isRequired,
  date: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onChangeTime: PropTypes.func.isRequired,
  labels: PropTypes.shape({
    month: PropTypes.string,
    year: PropTypes.string,
  }),
  datetime: PropTypes.bool,
};

export default DatePickerHeader;
