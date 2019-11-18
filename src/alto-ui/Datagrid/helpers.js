import React from 'react';
import { DateTime } from 'luxon';
import { evaluateFormula } from '../helpers/formula';
import { format as formatNumber } from '../helpers/number';
import Avatar from '../Avatar';
import Tooltip from '../Tooltip';
import ErrorIcon from '../Icons/ErrorIcon';

export const IDENTITY = x => x;

export const getValue = (value, column, row) =>
  column.formula ? evaluateFormula(column.formula, row) : value;

export const getType = (value, column) =>
  value instanceof Error ? 'error' : column.type || typeof value;

export const getFormatter = (context, type) => (value, column, row) => {
  const parser = context.parsers[type] || IDENTITY;
  const formatter = column.formatter || context.formatters[type] || IDENTITY;
  const args = [column, row, context];
  return formatter(parser(value, ...args), ...args);
};

export const getFormattedValue = context => (value, column, row) => {
  const val = getValue(value, column, row);
  const type = getType(val, column);
  const format = getFormatter(context, type);
  return format(value, column, row);
};

export const getTitleValue = value => ([undefined, null].includes(value) ? '' : value.toString());

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
