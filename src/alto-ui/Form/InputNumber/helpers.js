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

export const format = (value, locale, precision, currency, disableThousandSeparator) => {
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
