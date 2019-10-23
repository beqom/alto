import sum from '../sum';

describe('/helpers/sum', () => {
  it('is sum', () => {
    expect(sum()).toBe(0);
  });

  it('should return sum values of an array if there is no second argument', () => {
    expect(sum([1, 2, 3])).toBe(6);
  });

  it('returns sum of strings array without second argument', () => {
    expect(sum(['a', 'b'])).toBe(0);
  });

  it('returns sum of strings and numbers array without second argument', () => {
    expect(sum(['a', 'b', 1])).toBe(1);
  });

  it('returns sum of objects array with numbers and string', () => {
    const mock = [{ width: 1 }, { width: '2' }, { width: 3 }];
    expect(sum(mock, 'width')).toBe(6);
  });
});
