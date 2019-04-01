import { round, parse, format } from '../number';

describe('InputNumber/helpers', () => {
  it('should round correctly depending on value and precision', () => {
    const firstValue = 100.55;
    expect(round(0)(firstValue)).toBe(101);
    expect(round(1)(firstValue)).toBe(100.6);
    expect(round(2)(firstValue)).toBe(100.55);
    expect(round(3)(firstValue)).toBe(100.55);

    const secondValue = 100.42;
    expect(round(0)(secondValue)).toBe(100);
    expect(round(1)(secondValue)).toBe(100.4);
    expect(round(2)(secondValue)).toBe(100.42);
    expect(round(3)(secondValue)).toBe(100.42);
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

  describe('parse', () => {
    const EN = 'en-US';
    const DE = 'de-DE';
    const FR = 'fr-FR';

    it('should return NaN for non string and number', () => {
      expect(parse()).toBe(NaN);
      expect(parse('')).toBe(NaN);
      expect(parse(null)).toBe(NaN);
      expect(parse([])).toBe(NaN);
    });

    it('should parse correctly a number', () => {
      const value = 1600.55;
      expect(parse(value, EN)).toBe(1601);
      expect(parse(value, EN, 1)).toBe(1600.6);

      expect(parse(value, DE, 0)).toBe(1601);
      expect(parse(value, DE, 1)).toBe(1600.6);

      expect(parse(value, FR, 0)).toBe(1601);
      expect(parse(value, FR, 1)).toBe(1600.6);
    });

    it('should parse correctly a stringified number', () => {
      const value = '1600.55';
      expect(parse(value, EN)).toBe(1601);
      expect(parse(value, EN, 1)).toBe(1600.6);

      expect(parse(value, DE, 0)).toBe(1601);
      expect(parse(value, DE, 1)).toBe(1600.6);

      expect(parse(value, FR, 0)).toBe(1601);
      expect(parse(value, FR, 1)).toBe(1600.6);
    });

    it('should parse correctly a EN formatted number', () => {
      const value = '$1,600.55';
      expect(parse(value, EN)).toBe(1601);
      expect(parse(value, EN, 1)).toBe(1600.6);

      expect(parse(value, DE, 0)).toBe(2);
      expect(parse(value, DE, 1)).toBe(1.6);

      expect(parse(value, FR, 0)).toBe(2);
      expect(parse(value, FR, 1)).toBe(1.6);
    });

    it('should parse correctly a DE formatted number', () => {
      const value = '1.600,55';
      expect(parse(value, EN)).toBe(2);
      expect(parse(value, EN, 1)).toBe(1.6);

      expect(parse(value, DE, 0)).toBe(1601);
      expect(parse(value, DE, 1)).toBe(1600.6);

      expect(parse(value, FR, 0)).toBe(2);
      expect(parse(value, FR, 1)).toBe(1.6);
    });

    it('should parse correctly a FR formatted number', () => {
      const value = '1 600,55';
      expect(parse(value, EN)).toBe(160055);
      expect(parse(value, EN, 1)).toBe(160055);

      expect(parse(value, DE, 0)).toBe(1601);
      expect(parse(value, DE, 1)).toBe(1600.6);

      expect(parse(value, FR, 0)).toBe(1601);
      expect(parse(value, FR, 1)).toBe(1600.6);
    });
  });
});
