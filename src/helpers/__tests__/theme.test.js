import { getTheme, getColor } from '../theme';

const theme = {
  palette: {
    blue: 'dogerblue',
    blues: {
      $10: 'cyan',
      $40: 'steelblue',
    },
  },
  colors: {
    primary: 'blue',
  },
  foo: 'bar',
};

const props = { theme };

describe('getTheme(...path)', () => {
  it('should find a simple key value', () => {
    expect(getTheme('foo')(props)).toBe('bar');
  });

  it('should find a deep key value', () => {
    expect(getTheme('palette', 'blues', '$40')(props)).toBe('steelblue');
  });

  it('should return undefined if the path does not exist', () => {
    expect(getTheme('bar', 'foo', 'baz')(props)).toBe(undefined);
  });
});

describe('getColor(color, [shade])', () => {
  it('should find a color from palette', () => {
    expect(getColor('blue')(props)).toBe('dogerblue');
  });

  it('should find a color from palette with shade', () => {
    expect(getColor('blue', 10)(props)).toBe('cyan');
  });

  it('should find a color from colors', () => {
    expect(getColor('primary')(props)).toBe('dogerblue');
  });

  it('should find a color from colors with shade', () => {
    expect(getColor('primary', 40)(props)).toBe('steelblue');
  });

  it('should be able to split color to find shade', () => {
    expect(getColor('primary.10')(props)).toBe('cyan');
  });
});
