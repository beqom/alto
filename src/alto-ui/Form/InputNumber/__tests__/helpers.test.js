import { round, parse, format } from '../helpers';

describe('InputNumber/helpers', () => {
  it('should round correctly depending on value and precision', () => {
    const firstValue = 100.55;
    expect(round(firstValue, 0)).toBe(101);
    expect(round(firstValue, 1)).toBe(100.6);
    expect(round(firstValue, 2)).toBe(100.55);
    expect(round(firstValue, 3)).toBe(100.55);

    const secondValue = 100.42;
    expect(round(secondValue, 0)).toBe(100);
    expect(round(secondValue, 1)).toBe(100.4);
    expect(round(secondValue, 2)).toBe(100.42);
    expect(round(secondValue, 3)).toBe(100.42);
  });

  it('should parse correctly depending on value, locale and precision', () => {
    const value = '100,55';
    const en = 'en-US';
    expect(parse('', en, 0)).toBe(NaN);
    expect(parse(undefined, en, 0)).toBe(NaN);
    expect(parse(value, en, 0)).toBe(10055);
    expect(parse(value, en, 1)).toBe(10055);
    expect(parse(value, en, 2)).toBe(10055);
    expect(parse(value, en, 3)).toBe(10055);

    const de = 'de-DE';
    expect(parse(value, de, 0)).toBe(101);
    expect(parse(value, de, 1)).toBe(100.6);
    expect(parse(value, de, 2)).toBe(100.55);
    expect(parse(value, de, 3)).toBe(100.55);
  });

  it('should format correctly depending on value, locale and precision', () => {
    const en = 'en-US';
    expect(format('', en, 2)).toBe('');
    expect(format(1000.0, en, 2)).toBe('1,000.00');
    expect(format(123456789, en, 2)).toBe('123,456,789.00');
    expect(format(1234.123, en, 2)).toBe('1,234.12');
    expect(format('$9,8,38,2,34,3.2', en, 2)).toBe('98,382,343.20');
    expect(format('123abc4d56.de78d9!', en, 2)).toBe('123,456.79');
    expect(format('200 + 100 - 4', en, 2)).toBe('2,001,004.00');
    expect(format('-200', en, 2)).toBe('-200.00');
    expect(format('$5,000.25', en, 0)).toBe('5,000');
    expect(format('5000.76', en, 0)).toBe('5,001');
    expect(format('5 400 000', en, 0)).toBe('5,400,000');
  });
});
