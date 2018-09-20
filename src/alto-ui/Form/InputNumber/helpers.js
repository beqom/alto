const decimalSeparatorByLocale = {
  'en-US': '.',
  'fr-FR': ',.',
};

export const round = (n, precision) => Math.round(n * 10 ** precision) / 10 ** precision;

export const parse = (value, locale, precision) =>
  round(
    parseFloat(
      `${value}`
        .replace(new RegExp(`[^0-9${decimalSeparatorByLocale[locale] || ','}-]`, 'g'), '')
        .replace(new RegExp(`[${decimalSeparatorByLocale[locale] || ','}]`, 'g'), '.')
        .replace(/(.+)-/g, '$1')
    ),
    precision
  );

export const format = (value, locale, precision, currency) =>
  [
    parse(value, locale, precision).toLocaleString(locale, {
      minimumFractionDigits: precision,
      maximumFractionDigits: precision,
    }),
  ].map(valueFormatted => (currency ? `${currency} ${valueFormatted}` : valueFormatted))[0];
