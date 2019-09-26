import { evaluateFormula } from '../helpers/formula';

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
