import mathEvaluator from 'math-expression-evaluator';

export const evaluateFormula = (formula, row, errorLabel) => {
  const expression = Object.entries(row).reduce(
    (acc, [key, value]) => acc.replace(new RegExp(`\\[${key}\\]`, 'g'), value || 0),
    formula
  );

  try {
    const res = mathEvaluator.eval(expression);
    if (!Number.isFinite(res) || Number.isNaN(res)) return new Error(errorLabel);
    return res;
  } catch (e) {
    return new Error(errorLabel);
  }
};
