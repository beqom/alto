import get from 'lodash.get';
import { css } from 'styled-components';

export const getTheme = (...path) => props => get(props, ['theme', ...path]);

export const getColor = (colorArg, shadeArg) => props => {
  const [color, shade = shadeArg] = colorArg.split('.');
  const paletteColorName = getTheme('colors', color)(props) || color;

  const paletteColor = shade
    ? getTheme('palette', `${paletteColorName}s`, `$${shade}`)(props)
    : getTheme('palette', paletteColorName)(props);

  return paletteColor || color;
};

export const fontSize = size => props => `font-size: ${getTheme('fontSize', size)(props) || size};`;

export const respondBelow = breakpoint => content => css`
  @media screen and (max-width: ${p => getTheme('breakpoints', breakpoint)(p) - 1}px) {
    ${content}
  }
`;

export const respondAbove = breakpoint => content => css`
  @media screen and (min-width: ${getTheme('breakpoints', breakpoint)}px) {
    ${content}
  }
`;

export const respondBetween = (bkMin, bkMax) => content => css`
  @media screen and (min-width: ${getTheme('breakpoints', bkMin)}px) and (max-width: ${p =>
      getTheme('breakpoints', bkMax)(p) - 1}px) {
    ${content}
  }
`;
