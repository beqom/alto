export const IDENTITY = x => x;

const getFormatter = (context, type) => (value, column, row) => {
  const parser = context.parsers[type] || IDENTITY;
  const formatter = column.formatter || context.formatters[type] || IDENTITY;
  const args = [column, row, context];
  return formatter(parser(value, ...args), ...args);
};

export default getFormatter;
