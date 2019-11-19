import React from 'react';
import { DateTime } from 'luxon';
import { format as formatNumber } from '../helpers/number';
import Avatar from '../Avatar';
import Tooltip from '../Tooltip';
import ErrorIcon from '../Icons/ErrorIcon';

export const DEFAULT_LABELS = {
  errorFormula: 'There is an error in formula',
  a11ySortLabel: 'Click to sort this column by Ascending or Descending',
  checkboxLabel: 'Check to select a row',
};

export const DATAGRID_CHECKBOX_WIDTH = 32;
export const DATAGRID_SCROLLBAR_SIZE = 17;
export const DATAGRID_HEADER_ROW_INDEX = 1;

const emptyBoundingClientRect = { top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0 };

export const DATAGRID_INITIAL_STATE_RESIZER = {
  column: null,
  parent: emptyBoundingClientRect,
  target: emptyBoundingClientRect,
  container: emptyBoundingClientRect,
  resizing: false,
};

export const PARSERS = {
  date: x => (x ? new Date(x) : ''),
  datetime: x => (x ? new Date(x) : ''),
  boolean: x => {
    const bool = `${x}`.toLowerCase();
    if (['true', '1'].includes(bool)) return true;
    if (['false', '0'].includes(bool)) return false;
    return x;
  },
};

export const FORMATTERS = {
  date: (x, col, row, { locale }) =>
    x instanceof Date
      ? DateTime.fromJSDate(x)
          .setLocale(locale)
          .toFormat('dd LLL yyyy')
      : '',
  datetime: (x, col, row, { locale }) =>
    x instanceof Date
      ? DateTime.fromJSDate(x)
          .setLocale(locale)
          .toFormat('dd LLL yyyy hh:mm a')
      : '',
  number: (x, col, row, { locale }) =>
    formatNumber(x, locale, col.precision || 0, null, col.disableThousandSeparator, {
      percent: col.percent,
    }),
  integer: (...args) => FORMATTERS.number(...args),
  float: (...args) => FORMATTERS.number(...args),
  int: (...args) => FORMATTERS.number(...args),
};

export const RENDERERS = {
  image: (x, col, row, { comfortable, compact }) => (
    <Avatar small={compact} large={comfortable} src={x || ''} alt={col.title} />
  ),
  error: x => (
    <Tooltip content={x.message}>
      <ErrorIcon outline />
    </Tooltip>
  ),
};
