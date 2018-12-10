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

export const round = (n, precision) => Math.round(n * 10 ** precision) / 10 ** precision;

export const parse = (value, locale, precision = 0) => {
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
  return round(num, precision);
};

export const format = (value, locale, precision = 0, currency, disableThousandSeparator) => {
  if (!value && value !== 0) return '';

  const valueParsed = parse(value, locale, precision);
  if (Number.isNaN(valueParsed)) return '';

  const valueFormatted = valueParsed.toLocaleString(locale, {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
    useGrouping: !disableThousandSeparator,
  });

  return currency ? `${currency} ${valueFormatted}` : valueFormatted;
};
