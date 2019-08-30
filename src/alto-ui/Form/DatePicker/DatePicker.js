import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import DayPicker, { LocaleUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { DateTime } from 'luxon';
import classnames from 'classnames';

import TextField from '../TextField';
import VisuallyHidden from '../../VisuallyHidden';
import DatePickerHeader from './DatePickerHeader';
import Popover from '../../Popover';
import CalendarIcon from '../../Icons/Calendar';

import './DatePicker.scss';

const ENTER_KEY_CODE = 13;

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

function getDisplayFormat({ datetime, displayFormat }) {
  if (displayFormat) return displayFormat;
  if (datetime) return 'dd LLL yyyy hh:mm a';
  return 'dd LLL yyyy';
}

const getDateWithProps = props => value => {
  const dateToParse = value || props.value;
  // iso or timestamp ?
  const date =
    ['number', 'string'].includes(typeof dateToParse) && dateToParse
      ? new Date(dateToParse)
      : dateToParse;

  return date ? DateTime.fromJSDate(date) : null;
};

const formatTextfieldDateWithProps = props => value => {
  const date = getDateWithProps(props)(value);

  if (!date) return '';

  return date.toFormat(getDisplayFormat(props));
};

function useDate(dateToParse) {
  // iso or timestamp ?
  const dateParsed =
    ['number', 'string'].includes(typeof dateToParse) && dateToParse
      ? new Date(dateToParse)
      : dateToParse;

  const getDate = () => (dateToParse ? DateTime.fromJSDate(dateParsed) : DateTime.local());
  const [date, setDate] = useState(getDate);
  useEffect(() => setDate(getDate), [(dateParsed || '').toString()]);

  return [date, setDate];
}

function DatePicker(props) {
  const formatTextfieldDate = formatTextfieldDateWithProps(props);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useDate(props.value);
  const [value, setValue] = useState(null);
  const defaultInputRef = useRef();

  const {
    inputRef: givenRef,
    id,
    displayFormat,
    timestamp,
    iso,
    onChange,
    format,
    datetime,
    onKeyDown,
    ...remainingProps
  } = props;

  const inputRef = givenRef || defaultInputRef;

  function handleChange(d) {
    if (timestamp) onChange(d.getTime());
    else if (iso) onChange(d.toISOString());
    else onChange(d);
  }

  function handleFocus(e) {
    if (props.readOnly) return;
    if (props.onFocus) props.onFocus(e);

    setOpen(true);
  }

  function handleBlur(e) {
    if (typeof props.onBlur === 'function') props.onBlur(e);

    if (value === '') {
      if (props.value) handleChange(null);
    } else if (value) {
      const newDate = [getDisplayFormat(props)].reduce(
        (d, f) => (d && d.isValid ? d : DateTime.fromFormat(value, f)),
        null
      );

      if (newDate && newDate.isValid) {
        setDate(newDate);
        handleChange(newDate.toJSDate());
      }
    }

    setValue(null);
  }

  useEffect(() => {
    if (!open && typeof props.onClose === 'function') props.onClose();
  }, [open]);

  return (
    <>
      <TextField
        {...remainingProps}
        onKeyDown={e => {
          if (e.keyCode === ENTER_KEY_CODE) {
            setOpen(false);
          }
          if (typeof onKeyDown === 'function') onKeyDown(e);
        }}
        ref={inputRef}
        className={classnames('DatePicker', props.className)}
        onFocus={handleFocus}
        onChange={e => setValue(e.target.value)}
        onBlur={handleBlur}
        value={value === null ? formatTextfieldDate() : value}
        id={`${id}__input`}
        onClear={() => {
          handleChange('');
          setValue('');
          setOpen(false);
        }}
      >
        {input => (
          <>
            <CalendarIcon
              id={`${id}__calendar`}
              className="DatePicker__calendar-icon"
              active={open}
              onClick={() => {
                if (inputRef && inputRef.current) inputRef.current.focus();
              }}
            />
            {input}
          </>
        )}
      </TextField>
      <Popover
        className="DatePicker__day-picker"
        onClose={() => {
          setOpen(false);
        }}
        open={open}
        start
        target={inputRef.current ? inputRef.current.parentElement : undefined}
        includeTarget
      >
        <DatePickerHeader
          date={date}
          id={id}
          onChange={values => setDate(d => d.set(values))}
          onChangeTime={values => {
            const newDate = date.set(values);
            setDate(newDate);
            handleChange(newDate.toJSDate());
          }}
          datetime={datetime}
        />
        <div className="DatePicker__days">
          <DayPicker
            month={date.toJSDate()}
            canChangeMonth={false}
            captionElement={() => null}
            onDayClick={d => {
              const newDate = datetime
                ? DateTime.fromJSDate(d)
                    .set({ hour: date.hour, minute: date.minute })
                    .toJSDate()
                : d;
              handleChange(newDate);
              if (!datetime) setOpen(false);
            }}
            localeUtils={{ ...LocaleUtils, formatDay: () => '' }}
            selectedDays={date ? date.toJSDate() : null}
            renderDay={renderDay(id)}
          />
        </div>
      </Popover>
    </>
  );
}

DatePicker.displayName = 'DatePicker';

DatePicker.defaultProps = {
  format: 'dd/MM/yyyy HH:mm',
  placeholder: '',
};

DatePicker.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.any,
  format: PropTypes.string,
  placeholder: PropTypes.string,
  displayFormat: PropTypes.string,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  timestamp: PropTypes.bool,
  iso: PropTypes.bool,
  value: PropTypes.oneOfType([
    // iso
    PropTypes.string,
    // timestamp
    PropTypes.number,
    // date
    PropTypes.object,
  ]),
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  inputRef: PropTypes.object,
  onClose: PropTypes.func,
  datetime: PropTypes.bool,
  onKeyDown: PropTypes.func,
};

export default React.forwardRef((props, ref) => <DatePicker inputRef={ref} {...props} />);
