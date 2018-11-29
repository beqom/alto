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

const months = LocaleUtils.getMonths().map((month, i) => ({
  title: month,
  value: i + 1,
}));

class DatePickerHeader extends React.Component {
  constructor() {
    super();

    this.handleClickPrevMonth = this.handleClickPrevMonth.bind(this);
    this.handleClickNextMonth = this.handleClickNextMonth.bind(this);
    this.handleChangeMonth = this.handleChangeMonth.bind(this);
    this.handleChangeYear = this.handleChangeYear.bind(this);
    this.handleClickToday = this.handleClickToday.bind(this);
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

  handleChangeMonth(month) {
    const { year } = this.props.date;
    this.props.onChange({ year, month });
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
    const datePickerLabels = { month: 'Month', year: 'Year', ...labels };

    return (
      <div className="DatePicker__header">
        <FormRow className="DatePicker__month-form">
          <Select
            id={`${id}__month-select`}
            label={datePickerLabels.month}
            hideLabel
            className="DatePicker__month-select"
            value={date.month}
            name="month"
            onChange={this.handleChangeMonth}
            options={months}
          />

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
        <div className="DatePicker__nav">
          <Button
            id={`${id}__button--previous-month`}
            flat
            small
            onClick={this.handleClickPrevMonth}
          >
            <ChevronLeftIcon />
          </Button>
          <Button
            id={`${id}__button--today`}
            flat
            small
            className="DatePicker__today-button"
            onClick={this.handleClickToday}
          >
            Today
          </Button>
          <Button id={`${id}__button--next-month`} flat small onClick={this.handleClickNextMonth}>
            <ChevronRightIcon />
          </Button>
        </div>
      </div>
    );
  }
}

DatePickerHeader.propTypes = {
  id: PropTypes.string.isRequired,
  date: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  labels: PropTypes.shape({
    month: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
  }),
};

export default DatePickerHeader;
