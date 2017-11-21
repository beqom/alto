import get from 'lodash/fp/get';

export const getTheme = (...path) => get(['theme', ...path]);

export const getColor = (colorArg, shadeArg) => props => {
  const [ color, shade = shadeArg ] = colorArg.split('.');
  const paletteColorName = getTheme('colors', color)(props) || color;

  const paletteColor = shade
    ? getTheme('palette', `${paletteColorName}s`, `$${shade}`)(props)
    : getTheme('palette', paletteColorName)(props);

  return paletteColor || color;
}

export const pxToRem = px => props => px / getTheme('fontSize')(props);

export const fontSize = size => props => `font-size: ${getTheme('fontSize', size)(props) || size};`;

