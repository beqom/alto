import { evaluateFormula } from '../../helpers/formula';

const getValue = (value, column, row) =>
  column.formula ? evaluateFormula(column.formula, row) : value;
export default getValue;
