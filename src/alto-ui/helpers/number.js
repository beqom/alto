import compose from 'lodash.compose';

const decimalSeparatorByLocale = {
  it: ',',
  'it-IT': ',',
  pt: ',',
  'pt-BR': ',',
  fr: ',.',
  'fr-FR': ',.',
  es: ',',
  'es-ES': ',',
  tr: ',',
  'tr-TR': ',',
  de: ',',
  'de-DE': ',',
};

const DEFAULT_DECIMAL_SEPARATOR = '.';
export const round = (n, precision) => {
  const valueWithFloatingPointPrecision = Math.round(n * 10 ** precision) / 10 ** precision;
  const croppedToPrecisionValue = parseFloat(valueWithFloatingPointPrecision.toFixed(precision));

  return croppedToPrecisionValue;
};

export const parse = (value, locale, precision = 0, { percent } = {}) => {
  const parsedValue = parseFloat(value);

  const decimalSeparator = decimalSeparatorByLocale[locale] || DEFAULT_DECIMAL_SEPARATOR;

  const num =
    `${parsedValue}` === `${value}`
      ? parsedValue
      : parseFloat(
          `${value}`
            .replace(new RegExp(`[^0-9${decimalSeparator}-]`, 'g'), '')
            .replace(new RegExp(`[${decimalSeparator}]`, 'g'), '.')
            .replace(/(.+)-/g, '$1')
        );

  return round(num, percent ? precision + 2 : precision);
};

export const format = (
  value,
  locale,
  precision = 0,
  currency,
  disableThousandSeparator,
  { percent } = {}
) => {
  if (!value && value !== 0) return '';

  const valueParsed = parse(value, locale, precision, { percent });
  if (Number.isNaN(valueParsed)) return '';

  return compose(
    x => (percent ? `${x}%` : x),
    x => (currency && !percent ? `${currency}${x}` : x),
    x =>
      x.toLocaleString(locale, {
        minimumFractionDigits: precision,
        maximumFractionDigits: precision,
        useGrouping: !disableThousandSeparator,
      }),
    x => (percent ? x * 100 : x)
  )(valueParsed);
};
