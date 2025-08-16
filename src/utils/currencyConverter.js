// Currency conversion utility
export const currencies = [
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', rate: 1 },
  { code: 'USD', name: 'US Dollar', symbol: '$', rate: 0.012 },
  { code: 'EUR', name: 'Euro', symbol: '€', rate: 0.011 },
  { code: 'GBP', name: 'British Pound', symbol: '£', rate: 0.0095 },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', rate: 1.8 },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', rate: 0.018 },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', rate: 0.016 },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', rate: 0.011 },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', rate: 0.087 },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', rate: 0.016 }
];

export const convertCurrency = (amount, fromCurrency, toCurrency) => {
  const from = currencies.find(c => c.code === fromCurrency);
  const to = currencies.find(c => c.code === toCurrency);
  
  if (!from || !to) return amount;
  
  // Convert to INR first, then to target currency
  const inINR = amount / from.rate;
  return inINR * to.rate;
};

export const formatCurrency = (amount, currencyCode) => {
  const currency = currencies.find(c => c.code === currencyCode);
  if (!currency) return amount.toLocaleString();
  
  return `${currency.symbol}${amount.toLocaleString()}`;
};
