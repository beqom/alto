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

const DatePickerHeader = ({ id, date, onChange, labels }) => {
  const months = LocaleUtils.getMonths().map((month, i) => ({
    title: month,
    value: i + 1,
  }));

  const handleChange = e => {
    const { year, month } = e.target.form;
    onChange({ year: parseInt(year.value, 10), month: parseInt(month.value, 10) });
  };

  const previousMonth =
    date.month === 1 ? { year: date.year - 1, month: 12 } : { month: date.month - 1 };
  const nextMonth =
    date.month === 12 ? { year: date.year + 1, month: 1 } : { month: date.month + 1 };

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
          onChange={handleChange}
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
          onChange={handleChange}
        />
      </FormRow>
      <div className="DatePicker__nav">
        <Button flat small onClick={() => onChange(previousMonth)}>
          <ChevronLeftIcon />
        </Button>
        <Button
          flat
          small
          className="DatePicker__today-button"
          onClick={() => onChange(DateTime.local().toObject())}
        >
          Today
        </Button>
        <Button flat small onClick={() => onChange(nextMonth)}>
          <ChevronRightIcon />
        </Button>
      </div>
    </div>
  );
};

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
