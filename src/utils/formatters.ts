const toLocaleDateTimeString = (date: Date): string => {
  return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString();
}

const toCurrency = (value: number | string): string => {
  return value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });;
}
const formatETH = (value: number | string): string => {
  return Number(value).toPrecision(5);
}
const formatters = {
  toLocaleDateTimeString,
  toCurrency, formatETH
}

export default formatters;
