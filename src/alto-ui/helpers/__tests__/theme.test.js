import { getTheme, getColor, fontSize, respondBelow, respondAbove, respondBetween } from '../theme';

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
  fontSize: {
    small: '10px',
  },
  breakpoints: {
    narrow: 768,
    wide: 990,
  },
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

describe('fontSize(size)', () => {
  it('should return the corresponding fontSize', () => {
    expect(fontSize('small')(props)).toBe('font-size: 10px;');
  });

  it('should return size name if no corresponding fontSize is found', () => {
    expect(fontSize('big')(props)).toBe('font-size: big;');
  });
});

const processCSS = xs => p => xs.reduce((acc, x) => acc + (typeof x === 'function' ? x(p) : x), '');

describe('respondBelow(breakpoint)', () => {
  it('should return the good media query', () => {
    const result = processCSS(respondBelow('narrow')('font-size: 10px;'))(props);
    expect(result).toBe(`
  @media screen and (max-width: 767px) {
    font-size: 10px;
  }
`);
  });
});

describe('respondAbove(breakpoint)', () => {
  it('should return the good media query', () => {
    const result = processCSS(respondAbove('wide')('font-size: 24px;'))(props);
    expect(result).toBe(`
  @media screen and (min-width: 990px) {
    font-size: 24px;
  }
`);
  });
});

describe('respondBetween(breakpointMin, breakpointMax)', () => {
  it('should return the good media query', () => {
    const result = processCSS(respondBetween('narrow', 'wide')('font-size: 16px;'))(props);
    expect(result).toBe(`
  @media screen and (min-width: 768px) and (max-width: 989px) {
    font-size: 16px;
  }
`);
  });
});
