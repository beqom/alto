export const sliceArr = (xs, i, j) =>
  xs.reduce((acc, x, k) => {
    if (k >= i && k <= j && i < j) return [...acc, x];
    if (k <= i && k >= j && i > j) return [x, ...acc];
    return acc;
  }, []);
