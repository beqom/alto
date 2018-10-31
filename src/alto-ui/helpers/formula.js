import BigEval from 'bigeval';
import isNumber from 'lodash.isnumber';

const parseValue = value => {
  if (value === '') return value;
  if (Number.isNaN(parseInt(value, 10))) return `'${value}'`;

  return parseFloat(value);
};

const getExpression = (row, formula, defaulValue = 0) =>
  Object.entries(row).reduce((acc, [key, value]) => {
    const parsedValue = parseValue(value);
    return acc
      .replace(
        new RegExp(`\\[${key}\\]`, 'g'),
        !parsedValue && parsedValue !== 0 ? defaulValue : parsedValue
      )
      .replace(/NULL/i, defaulValue);
  }, formula);

const isValid = res => res === true || res === false || (isNumber(res) && Number.isFinite(res));

export const evaluateFormula = (formula, row, errorLabel) => {
  const Evaluator = new BigEval();
  const res = Evaluator.exec(getExpression(row, formula));
  if (isValid(res)) {
    return res;
  }

  const isDividedByZeroError = isValid(Evaluator.exec(getExpression(row, formula, 1)));
  if (isDividedByZeroError) {
    return '';
  }

  return new Error(errorLabel);
};
